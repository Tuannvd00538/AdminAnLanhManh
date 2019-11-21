import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any
  ) { }

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

  token: any = this.localStorage.getItem('token');

  deleteCategory(id) {
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
        axios.delete(`${environment.api_url}/api/category/${id}`, { headers: { Authorization: that.token } }).then(function (response) {
          Swal.fire(
            'Deleted',
            'Your category has been deleted',
            'success'
          );
          that.getListCategory(`${environment.api_url}/api/category`);
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
    this.getListCategory(`${environment.api_url}/api/category`);
  }

}
