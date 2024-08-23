import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';
import { Order } from '../Interfaces/genericInterfaces';
import { AppserviceService } from '../appservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  route = inject(Router)
  public appserv = inject(AppserviceService)

  expand_user: boolean = false;
  user_box_style: any = {};
  order_options : Order[] = [
    {id: 1, description: 'All'},
    {id: 2, description: 'Takeaway/Delivery'},
    {id: 3, description: 'Dine-In'},
  ]


  userDetailsBoxEvent(event: MouseEvent) {
    this.user_box_style = {
      postion: 'absolute',
      top: event.y + 20 + 'px',
      left: (event.x - 100) + 'px'
    }
    this.expand_user = !this.expand_user;
  }

  filterRestaurantPreference(target: any) {
    this.appserv.user_preference.next(target.value)
  }

  navigateToHome() {
    this.route.navigateByUrl('login')
  }

  signout() {
    this.expand_user = false;
    this.appserv.logged_in_user = false;
    this.appserv.selected_role = {id: '', description: ''}
    this.navigateToHome();
  }

}
