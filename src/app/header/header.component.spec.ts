import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AppserviceService } from '../appservice.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        AppserviceService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not create dropdown if Admin has logged in', () => {
    component.appserv.selected_role = { id: 'A1', description: 'Admin' };
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#selectheader')).toBeFalsy();
  });

  it('should navigate to login page when user clicks sign-out', () => {
    const expectedUrl = 'login';
    component.signout();
    fixture.detectChanges() 
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(expectedUrl);
  });
});
 