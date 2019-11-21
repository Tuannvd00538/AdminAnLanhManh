import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-set',
  templateUrl: './list-set.component.html',
  styleUrls: ['./list-set.component.css']
})
export class ListSetComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any
  ) { }

  listSet: any = [];

  currentPage: any = 1;

  getListSet(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listSet = response.data;
      // that.currentPage = that.listSet.restPagination.page;
    }).catch(function (error) {
      console.log(error);
    });
  }

  showMoreData() {
    const that = this;
    this.currentPage = this.currentPage + 1;
    axios.get(`${environment.api_url}/api/food/list?page=${this.currentPage}`).then(function (response) {
      const newArray = [...that.listSet.data, ...response.data.data];
      that.listSet.data = newArray;
    }).catch(function (error) {
      console.log(error);
    });
  }

  token: any = this.localStorage.getItem('token');

  deleteSet(id) {
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
        axios.delete(`${environment.api_url}/api/combo/${id}`, { headers: { Authorization: that.token } }).then(function (response) {
          Swal.fire(
            'Deleted',
            'Your combo has been deleted',
            'success'
          );
          that.getListSet(`${environment.api_url}/api/combo/list`);
        }).catch(function (error) {
          Swal.fire(
            'Error',
            'Something went wrong',
            'error'
          );
        });
      }
    })
  };

  ngOnInit() {
    this.getListSet(`${environment.api_url}/api/combo?page=${this.currentPage}`);
  }

}
