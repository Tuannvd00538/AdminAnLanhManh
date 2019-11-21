import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.css']
})
export class CreateSetComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any
  ) { }

  listCategory: any = [];

  dataSet: any = {
    name: null,
    price: null,
    description: null,
    categoryIds: null,
    foodIds: null
  };

  isLoading: boolean = false;

  getListCategory(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listCategory = response.data.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  listFood: any = [];

  getListFood(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listFood = response.data.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  fileChange(event) {
    const that = this;
    const fileList: FileList = event.target.files;
    if (this.isLoading) return;
    this.isLoading = true;
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData = new FormData();
      formData.append('image', file, file.name);
      axios.post('https://api.imgur.com/3/image', formData, { headers: { 'Authorization': 'Client-ID d72ab777aaeb0dc' } }).then(function (response) {
        that.isLoading = false;
        that.dataSet.image = response.data.data.link;
      }).catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
        that.dataSet.image = null;
        that.isLoading = false;
        console.log(error);
      });
    }
  }

  token: any = this.localStorage.getItem('token');

  saveSet(e) {
    const that = this;
    if (that.isLoading) return;
    that.isLoading = true;
    var check = true;
    for (var key in this.dataSet) {
      if (this.dataSet[key] == null) check = false;
    }
    if (check) {
      axios.post(`${environment.api_url}/api/combo/create`, that.dataSet, { headers: { Authorization: that.token } }).then(function (response) {
        Swal.fire({
          title: 'Set created.',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Done'
        }).then((result) => {
          if (result.value) {
            window.location.href = '/set/list';
          }
        });
        that.isLoading = false;
      }).catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
        that.isLoading = false;
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'All field is required',
        text: 'Oops...'
      });
      that.isLoading = false;
    }
  }

  ngOnInit() {
    this.getListCategory(`${environment.api_url}/api/category`);
    this.getListFood(`${environment.api_url}/api/food/list`);
  }

}
