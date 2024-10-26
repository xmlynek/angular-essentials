import {Component, computed, inject, input, signal, viewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';

import {TasksService} from '../tasks.service';
import {CanDeactivateFn, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);
  private router = inject(Router)
  private form = viewChild.required<NgForm>("form");
  public isFormSubmitted = computed(() => this.form().submitted);

  async onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    // this.form().resetForm();
    await this.router.navigate(['/users', this.userId(), 'tasks'], {replaceUrl: true});
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component: NewTaskComponent): boolean => {
  if (component.isFormSubmitted()) {
    return true;
  }
  if (component.enteredDate() || component.enteredTitle() || component.enteredSummary()) {
    return window.confirm("You entered some data, Really wanna leave?");
  }
  return true;
}
