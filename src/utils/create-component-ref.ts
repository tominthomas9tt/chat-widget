import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Type } from '@angular/core';

export function createComponentRef<T>(
  appRef: ApplicationRef,
  component: Type<T>,
  selector: string
): ComponentRef<T> {
  const injector: EnvironmentInjector = appRef.injector;
  const compRef = createComponent(component, { environmentInjector: injector });
  const el = document.querySelector(selector);
  if (el) el.replaceWith(compRef.location.nativeElement);
  appRef.attachView(compRef.hostView);
  return compRef;
}
