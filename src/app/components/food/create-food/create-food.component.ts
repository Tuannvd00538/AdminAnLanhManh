import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.css']
})
export class CreateFoodComponent implements OnInit {

  constructor() { }

  listCategory: any = [];

  dataFood: any = {
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
    cateId: null
  };

  getListCategory(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listCategory = response.data.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  fileChange(event: { target: { files: FileList; }; }): void {
    const that = this;
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];

      const formData = new FormData();
      formData.append('image', file, file.name);

      axios.post('https://api.imgur.com/3/image', formData, { headers: { 'Authorization': 'Client-ID d72ab777aaeb0dc' } }).then(function (response) {
        that.dataFood.image = response.data.data.link;
      }).catch(function (error) {
        that.dataFood.image = null;
        console.log(error);
      });

    }
  }

  saveFood() {
    const that = this;
    console.log(this.dataFood);
    axios.post(`${environment.api_url}/api/food/create`, that.dataFood).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getListCategory(`${environment.api_url}/api/category`);
  }

}
