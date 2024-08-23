import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant, Restaurant_Action } from '../Interfaces/genericInterfaces';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';
import { ComingSoonComponent } from "../common-components/coming-soon/coming-soon.component";

@Component({
  selector: 'app-restaurant-details',
  standalone: true,
  imports: [MatTooltipModule, NgClass, ComingSoonComponent],
  providers: [],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss'
})
export class RestaurantDetailsComponent implements OnInit {

  activated_route = inject(ActivatedRoute);
  restaurant_details: Restaurant;
  restaurant_actions: Restaurant_Action[] = [
    { id: 1, active: true, desc: 'Order Online' },
    { id: 2, active: false, desc: 'Reservation' },
    { id: 3, active: false, desc: 'Reviews' },
    { id: 4, active: false, desc: 'More Like This' },
  ]


  ngOnInit(): void {
    this.activated_route.data.subscribe((data: any) => {
      this.restaurant_details = data.detail.restaurant
      console.log(this.restaurant_details)
    })

  }

  tabChanged(item: Restaurant_Action, index: any) {
    this.restaurant_actions.forEach(item => item.active = false)
    this.restaurant_actions[index].active = true;
  }
}
