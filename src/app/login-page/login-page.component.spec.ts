import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppserviceService } from '../appservice.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: any;
  let mockRouter = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter }, AppserviceService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the selected role and navigate to dashboard', () => {
    const role = { id: 'A1', description: 'Admin' };
    component.role_value.setValue(role);
    // debugger
    component.roleSelected();
    expect(component.appservice.selected_role).toEqual(role);
    expect(component.appservice.logged_in_user).toBeTrue();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('dashboard');
  });


  it('should populate the dropdown with user roles', () => {
    fixture.detectChanges();
    const selectElement: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#select-role')
    const expectedOptionsCount = component.user_role.length;
    expect(selectElement.options.length - 1).toBe(expectedOptionsCount);
  });


});
