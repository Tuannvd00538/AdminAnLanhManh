import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { ListFoodComponent } from './components/food/list-food/list-food.component';
import { CreateFoodComponent } from './components/food/create-food/create-food.component';
import { ListSetComponent } from './components/set/list-set/list-set.component';
import { CreateSetComponent } from './components/set/create-set/create-set.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListOrderComponent } from './components/order/list-order/list-order.component';
import { CreateScheduleComponent } from './components/schedule/create-schedule/create-schedule.component';
import { ListScheduleComponent } from './components/schedule/list-schedule/list-schedule.component';
import { ScheduleDetailsComponent } from './components/schedule/schedule-details/schedule-details.component';
import { ScheduleComboComponent } from './components/schedule/schedule-combo/schedule-combo.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreateCategoryComponent,
    ListCategoryComponent,
    ListFoodComponent,
    CreateFoodComponent,
    ListSetComponent,
    CreateSetComponent,
    LoginComponent,
    ListOrderComponent,
    CreateScheduleComponent,
    ListScheduleComponent,
    ScheduleDetailsComponent,
    ScheduleComboComponent,
    CreateUserComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
