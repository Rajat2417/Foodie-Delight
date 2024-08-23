import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Restaurant } from '../Interfaces/genericInterfaces';
import restaurant_data from '../restaurant.json'
import { AppserviceService } from '../appservice.service';
import { RestaurantFormComponent } from "../restaurant-form/restaurant-form.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComingSoonComponent } from '../common-components/coming-soon/coming-soon.component';
import { CommonModule, NgClass, NgIf, NgStyle } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [RestaurantFormComponent, MatTooltipModule, ComingSoonComponent, CommonModule, FormsModule],
  providers: [BsModalService],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent implements OnInit {
  @ViewChild('confirmation') confirmation

  public appser = inject(AppserviceService)
  private _snackBar = inject(MatSnackBar);
  modalSer = inject(BsModalService);
  router = inject(Router)
  modal_ref: BsModalRef;

  restautant_details: Restaurant[] = restaurant_data;

  show_form: boolean = false;
  show_coming_soon: boolean = false;
  card_selcted: Restaurant | any
  show_inactive: boolean = false
  veg_food_filter: boolean = false;
  searchTerm: string = '';
  searchTermSubject: Subject<string> = new Subject<string>();

  user_pref: Subscription

  ngOnInit(): void {
    this.user_pref = this.appser.user_preference.subscribe((data: string) => {
      if (this.appser.selected_role.id === 'U1') {
        const arr = [...restaurant_data];
        this.veg_food_filter = false
        if (data === 'Takeaway/Delivery') {
          this.restautant_details = arr.filter((item: Restaurant) => item.restaurant_type === 'Delivery')
        } else if (data === 'Dine-In') {
          this.restautant_details = (arr || []).filter((item: Restaurant) => item.restaurant_type === 'Dine-in')
        } else {
          this.restautant_details = arr
        }
      }
    })
    this.searchTermSubject
    .pipe(debounceTime(500))
    .subscribe(value => { 
      this.restautant_details = this.appser.searchFn(value);
      if(this.restautant_details.length === 0) {
        this._snackBar.open('No Records found', 'Undo', {
          duration: 2000
        });
        this.restautant_details = restaurant_data;
      }
    });
  }

  onSearchTermChange(value: string): void {
    this.searchTermSubject.next(value);
  }

  navigateToDetails(item: Restaurant) {
    if (this.appser.selected_role.id === 'U1') {
      this.router.navigate(['restaurant-details', item.restaurant_id])
    }
  }

  banRestaurant(rest: Restaurant) {
    const index = this.findIndex(rest)
    this.restautant_details[index].active = false;
  }

  deleteRestaurant(rest: Restaurant, dlt = false) {
    if (dlt) {
      const index = this.findIndex(rest);
      this.restautant_details.splice(index, 1);
      this.modal_ref.hide();
      this._snackBar.open('Deleted Successfully', 'Undo', {
        duration: 2000
      });
    } else {
      this.modal_ref = this.modalSer.show(this.confirmation)
    }
    this.card_selcted = rest;
  }

  formAction(identifer: string, rowData?: Restaurant) {
    if (identifer === 'E') {
      this.card_selcted = rowData;
    }
    this.show_form = true;
  }

  findIndex(rest: Restaurant) {
    const index = this.restautant_details.findIndex((item: Restaurant) => {
      return item.restaurant_id === rest.restaurant_id
    })
    return index
  }

  formSubmit(event: any) {
    // debugger
    this.restautant_details.unshift(event.form)
  }


  //Admin Filter
  sortByMethod(event: any) {
    if (event.value === 'Rating Low To High') {
      //@ts-ignore
      this.restautant_details.sort((a, b) => a.restaurant_rating - b.restaurant_rating)
    } else if (event.value === 'Rating High To Low') {
      //@ts-ignore
      this.restautant_details.sort((a, b) => b.restaurant_rating - a.restaurant_rating)
    }

  }

  foodPrefernceFilter() {
    this.veg_food_filter = !this.veg_food_filter;
    if (this.veg_food_filter) {
      this.restautant_details = (restaurant_data || []).filter((item: Restaurant) => item.restaurant_food_offered === 'Veg');
    } else {
      this.restautant_details = restaurant_data
    }
  }

  showBannedRestaurants(eve: any) {
    let arr = [...restaurant_data]
    if (eve.target.checked) {
      arr = arr.filter((a: Restaurant) => !a.active)
      this.show_inactive = true
    } else {
      arr = arr.filter((a: Restaurant) => a.active)
      this.show_inactive = false
    }
    this.restautant_details = arr;
  }


  comingSoonFn() {
    this.show_coming_soon = true;
    setTimeout(() => {
      this.show_coming_soon = false;
    }, 3000);
  }


}
