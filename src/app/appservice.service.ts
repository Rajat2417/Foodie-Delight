import { Injectable } from '@angular/core';
import { Restaurant, Restaurant_Form, UserRole } from './Interfaces/genericInterfaces';
import { BehaviorSubject } from 'rxjs';
import restaurant_data from './restaurant.json'

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  constructor() { }

  logged_in_user: boolean = false;
  selected_role: UserRole = { id: '', description: '' }
  user_preference = new BehaviorSubject('All')

  filter_sort_by: Restaurant_Form[] = [
    {item_desc: 'Rating Low To High'},
    {item_desc: 'Rating High To Low'},
  ] 

  sortByMethod(event: any) {
    
  }

  searchFn(item: string): Restaurant[] {
    return (restaurant_data || []).filter((rest: Restaurant) => rest.restaurant_name.toLowerCase().includes(item.toLowerCase()))
  }

}
