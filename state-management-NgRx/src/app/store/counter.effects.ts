import {Actions, createEffect, ofType} from "@ngrx/effects";
import {decrement, increment, init, set} from "./counter.actions";
import {Injectable} from "@angular/core";
import {map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {Store} from "@ngrx/store";
import {selectCount, selectDoubleCount} from "./counter.selectors";

@Injectable()
export class CounterEffects {

  constructor(private actions$: Actions, private store: Store<{ counter: number }>) {
  }

  saveCount = createEffect(() => {
    return this.actions$.pipe(
      ofType(increment, decrement),
      withLatestFrom(this.store.select(selectCount)),
      tap(([action, counter]) => {
        console.log(action)
        localStorage.setItem('counter', counter.toString());
      })
    );
  }, {dispatch: false})

  loadCount = createEffect(() => {
    return this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const counterValue = localStorage.getItem('counter');
        console.log('init', counterValue)
        if (counterValue) {
          return of(set({value: +counterValue}));
        }
        return of(set({value: 0}));
      })
    )

  }, {dispatch: true})
}
