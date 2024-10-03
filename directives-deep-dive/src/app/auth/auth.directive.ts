import {Directive, effect, inject, input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "./auth.service";
import {Permission} from "./auth.model";

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {

  requiredPermission = input<Permission>('guest', {alias: 'appAuth'})
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef)
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.requiredPermission()) {
        console.log('SHOW EL')
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        console.log('HIDE EL')
        this.viewContainerRef.clear();
      }
    })
  }

}
