import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateFoodComponent } from './components/food/create-food/create-food.component';
import { ListFoodComponent } from './components/food/list-food/list-food.component';
import { CreateSetComponent } from './components/set/create-set/create-set.component';
import { ListSetComponent } from './components/set/list-set/list-set.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { ListOrderComponent } from './components/order/list-order/list-order.component';
import { CreateScheduleComponent } from './components/schedule/create-schedule/create-schedule.component';
import { ListScheduleComponent } from './components/schedule/list-schedule/list-schedule.component';
import { ScheduleDetailsComponent } from './components/schedule/schedule-details/schedule-details.component';
import { ScheduleComboComponent } from './components/schedule/schedule-combo/schedule-combo.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuardService] },
  { path: 'food/create', component: CreateFoodComponent, canActivate: [AuthGuardService] },
  { path: 'food/list', component: ListFoodComponent, canActivate: [AuthGuardService] },
  { path: 'set/create', component: CreateSetComponent, canActivate: [AuthGuardService] },
  { path: 'set/list', component: ListSetComponent, canActivate: [AuthGuardService] },
  { path: 'category/create', component: CreateCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'category/list', component: ListCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'order/list', component: ListOrderComponent, canActivate: [AuthGuardService] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'schedule/create', component: CreateScheduleComponent, canActivate: [AuthGuardService] },
  { path: 'schedule/list', component: ListScheduleComponent, canActivate: [AuthGuardService] },
  { path: 'schedule/details', component: ScheduleDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'schedule/schedule-combo/create', component: ScheduleComboComponent, canActivate: [AuthGuardService] },
  { path: 'user/create', component: CreateUserComponent, canActivate: [AuthGuardService] },
  { path: 'user/list', component: ListUserComponent, canActivate: [AuthGuardService] },
  { path: '**', component: MainComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
