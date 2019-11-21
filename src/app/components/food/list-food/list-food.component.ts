import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css']
})
export class ListFoodComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any
  ) { }

  listFood: any = [];

  currentPage: any = 1;

  getListFood(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listFood = response.data;
      that.currentPage = that.listFood.restPagination.page;
    }).catch(function (error) {
      console.log(error);
    });
  }

  showMoreData() {
    const that = this;
    this.currentPage = this.currentPage + 1;
    axios.get(`${environment.api_url}/api/food/list?page=${this.currentPage}`).then(function (response) {
      const newArray = [...that.listFood.data, ...response.data.data];
      that.listFood.data = newArray;
    }).catch(function (error) {
      console.log(error);
    });
  }

  token: any = this.localStorage.getItem('token');

  deleteFood(id) {
    const that = this;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        axios.delete(`${environment.api_url}/api/food/${id}`, { headers: { Authorization: that.token } }).then(function (response) {
          Swal.fire(
            'Deleted',
            'Your food has been deleted',
            'success'
          );
          that.getListFood(`${environment.api_url}/api/food/list`);
        }).catch(function (error) {
          Swal.fire(
            'Error',
            'Something went wrong',
            'error'
          );
        });
      }
    })
  }

  ngOnInit() {
    this.getListFood(`${environment.api_url}/api/food/list?page=${this.currentPage}`);
  }

}
