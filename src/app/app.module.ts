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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreateCategoryComponent,
    ListCategoryComponent,
    ListFoodComponent,
    CreateFoodComponent,
    ListSetComponent,
    CreateSetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
