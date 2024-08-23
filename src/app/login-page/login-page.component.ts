import { Component, inject, ViewChild } from '@angular/core';
import { UserRole } from '../Interfaces/genericInterfaces';
import { AppserviceService } from '../appservice.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  appservice = inject(AppserviceService);
  route = inject(Router);
  role_value: any = new FormControl('')

  user_role: UserRole[] = [
    { id: 'A1', description: 'Admin' },
    { id: 'U1', description: 'User' }
  ];
  //lj

  roleSelected() {
    this.appservice.selected_role = this.role_value.value
    this.appservice.logged_in_user = true;
    this.route.navigateByUrl('dashboard')
  }
}
