import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {interval, map, Observable} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  protected clickCount = signal<number>(0)
  protected clickCount$ = toObservable<number>(this.clickCount);
  private destroyRef = inject(DestroyRef)

  private interval$ = interval(1000);
  protected intervalSignal = toSignal(this.interval$, {initialValue: 0});

  private customInterval$ = new Observable((subscriber) => {
    let counter = 0;
    const intervalId = setInterval(() => {
      if (counter === 3) {
        clearInterval(intervalId);
        subscriber.complete();
        return;
      }
      console.log('Emitting a new value!')
      subscriber.next(counter++);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  })


  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`)
    // })
  }

  ngOnInit(): void {
    // const subscription = interval(1000).pipe(map(val => val * 2)).subscribe({
    //   next: (val) => {
    //     console.log('Current Second: ', val);
    //   },
    // })
    //
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // })

    const subscription = this.clickCount$.subscribe((val) => {
      console.log(`Clicked button ${val} times.`)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    const customSubscription = this.customInterval$.subscribe({
      next: (val) => {
        console.log(`Custom interval: ${val}`);
      },
      complete: () => {
        console.log('Custom interval completed!');
      }
    });

    this.destroyRef.onDestroy(() => {
      customSubscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update(prev => prev + 1);
  }


}
