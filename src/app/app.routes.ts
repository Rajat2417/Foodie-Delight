import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { guardGuard } from './guard.guard';
import { ForbiddenComponent } from './common-components/forbidden/forbidden.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { detailsResolver } from './details.resolver';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'dashboard', component: MainDashboardComponent, canActivate: [guardGuard] },
    { path: 'restaurant-details/:id', resolve: { detail: detailsResolver }, component: RestaurantDetailsComponent, canActivate: [guardGuard] },
    { path: 'forbidden', component: ForbiddenComponent },
    { path: '*', component: LoginPageComponent }
];
