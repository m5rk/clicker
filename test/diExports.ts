import { provide, Type }                              from '@angular/core';
import { ComponentFixture, TestComponentBuilder }     from '@angular/compiler/testing';
import { injectAsync }                                from '@angular/core/testing';
import { Control }                                    from '@angular/common';
import { App, Config, Form, NavController, Platform } from 'ionic-angular';
import { ClickersMock, ConfigMock, NavMock }          from './mocks';
import { Utils }                                      from '../app/services/utils';
import { Clickers }                                   from '../app/services/clickers';
export { TestUtils }                                  from './testUtils';

export let providers: Array<any> = [
  Form,
  provide(Config, {useClass: ConfigMock}),
  provide(Clickers, {useClass: ClickersMock}), // required by ClickerButton
  provide(App, {useClass: ConfigMock}),        // required by ClickerList
  provide(NavController, {useClass: NavMock}), // required by ClickerList
  provide(Platform, {useClass: ConfigMock}),   // -> IonicApp
];

export let injectAsyncWrapper: Function = ((callback) => injectAsync([TestComponentBuilder], callback));

export let asyncCallbackFactory: Function = ((component, testSpec, detectChanges, beforeEachFn) => {
  return ((tcb: TestComponentBuilder) => {
    return tcb.createAsync(component)
      .then((fixture: ComponentFixture<Type>) => {
        testSpec.fixture = fixture;
        testSpec.instance = fixture.componentInstance;
        testSpec.instance.control = new Control('');
        if (detectChanges) fixture.detectChanges();
        if (beforeEachFn) beforeEachFn(testSpec);
      })
      .catch(Utils.promiseCatchHandler);
  });
});
