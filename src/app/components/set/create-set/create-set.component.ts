import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.css']
})
export class CreateSetComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private toastr: ToastrService
  ) { }

  listCategory: any = [];

  dataSet: any = {
    name: null,
    description: null,
    image: null,
    price: null,
    carbonhydrates: null,
    protein: null,
    lipid: null,
    xenluloza: null,
    canxi: null,
    iron: null,
    zinc: null,
    vitaminA: null,
    vitaminB: null,
    vitaminC: null,
    vitaminD: null,
    vitaminE: null,
    calorie: null,
    categoryIds: null,
    foodIds: null
  };

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
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData = new FormData();
      formData.append('image', file, file.name);
      axios.post('https://api.imgur.com/3/image', formData, { headers: { 'Authorization': 'Client-ID d72ab777aaeb0dc' } }).then(function (response) {
        that.dataSet.image = response.data.data.link;
      }).catch(function (error) {
        that.dataSet.image = null;
        console.log(error);
      });
    }
  }

  token: any = this.localStorage.getItem('token');

  saveSet(e) {
    const that = this;
    console.log(this.dataSet);
    var check = true;
    for (var key in this.dataSet) {
      if (this.dataSet[key] == null) check = false;
    }
    if (check) {
      axios.post(`${environment.api_url}/api/combo/create`, that.dataSet, { headers: { Authorization: that.token } }).then(function (response) {
        that.toastr.success("Set created", "Notification");
        window.location.href = '/set/list';
      }).catch(function (error) {
        console.log(error);
        that.toastr.error("Oops, someting went wrong", "Notification");
      });
    }
  }

  ngOnInit() {
    this.getListCategory(`${environment.api_url}/api/category`);
    this.getListFood(`${environment.api_url}/api/food/list`);
  }

}
