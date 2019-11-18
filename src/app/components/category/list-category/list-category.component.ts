import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  constructor() { }

  listCategory: any = [];

  getListCategory(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listCategory = response.data;
      console.log(that.listCategory);
      
    }).catch(function (error) {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getListCategory(`${environment.api_url}/api/category`);
  }

}
