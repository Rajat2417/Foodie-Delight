import { ResolveFn, Router } from '@angular/router';
import { Restaurant } from './Interfaces/genericInterfaces';
import data from './restaurant.json'
import { inject } from '@angular/core';

export const detailsResolver: ResolveFn<any> = (route, state) => {
  const restaurant_data: Restaurant[] = data
  const _routes = inject(Router);
  const _rest = restaurant_data.find((item: Restaurant) => {
    return item.restaurant_id === route.params['id']
  })
  if(!_rest) {
    _routes.navigateByUrl('forbidden')
    return {data: null}
  }
  return { restaurant: _rest };
};
