import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css']
})
export class ListFoodComponent implements OnInit {

  constructor() { }

  listFood: any = [];

  getListFood(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listFood = response.data;
      console.log(that.listFood);
      
    }).catch(function (error) {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getListFood(`${environment.api_url}/api/food/list`);
  }

}
