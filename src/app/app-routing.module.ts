import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateFoodComponent } from './components/food/create-food/create-food.component';
import { ListFoodComponent } from './components/food/list-food/list-food.component';
import { CreateSetComponent } from './components/set/create-set/create-set.component';
import { ListSetComponent } from './components/set/list-set/list-set.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'food/create', component: CreateFoodComponent },
  { path: 'food/list', component: ListFoodComponent },
  { path: 'set/create', component: CreateSetComponent },
  { path: 'set/list', component: ListSetComponent },
  { path: 'category/create', component: CreateCategoryComponent },
  { path: 'category/list', component: ListCategoryComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
