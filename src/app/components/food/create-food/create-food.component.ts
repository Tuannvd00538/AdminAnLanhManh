import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { UtilService } from 'src/app/service/util.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.css']
})
export class CreateFoodComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private route: ActivatedRoute
  ) { }

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
    categoryIds: null
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

  fileChange(event) {
    const that = this;
    const fileList: FileList = event.target.files;
    this.isLoading = true;
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData = new FormData();
      formData.append('image', file, file.name);
      axios.post('https://api.imgur.com/3/image', formData, { headers: { 'Authorization': 'Client-ID d72ab777aaeb0dc' } }).then(function (response) {
        that.isLoading = false;
        that.dataFood.image = response.data.data.link;
      }).catch(function (error) {
        that.dataFood.image = null;
        that.isLoading = false;
        console.log(error);
      });
    }
  }

  token: any = this.localStorage.getItem('token');

  saveFood(e) {
    const that = this;
    var check = true;
    for (var key in this.dataFood) {
      if (this.dataFood[key] == null) check = false;
    }
    if (check) {
      this.isLoading = true;
      if (this.editMode) {
        axios.put(`${environment.api_url}/api/food/update/${this.foodId}`, that.dataFood, { headers: { Authorization: that.token } }).then(function (response) {
          Swal.fire({
            title: 'Lưu món ăn thành công',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Xong'
          }).then((result) => {
            if (result.value) {
              window.location.href = '/food/list';
            }
          })
          that.isLoading = false;
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Có lỗi xảy ra!'
          });
          that.isLoading = false;
          console.log(error);
        });
      } else {
        axios.post(`${environment.api_url}/api/food/create`, that.dataFood, { headers: { Authorization: that.token } }).then(function (response) {
          that.isLoading = false;
          Swal.fire({
            title: 'Lưu món ăn thành công',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Xong'
          }).then((result) => {
            if (result.value) {
              window.location.href = '/food/list';
            }
          });
          that.isLoading = false;
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Có lỗi xảy ra!'
          });
          that.isLoading = false;
          console.log(error);
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng kiểm tra lại tất cả các trường còn thiếu',
        text: 'Oops...'
      });
      that.isLoading = false;
    }
  }

  foodId: any = null;
  editMode: boolean = false;

  getFoodById(url) {
    const that = this;
    axios.get(url).then(function (response) {
      response.data.data.categoryIds = response.data.data.categories.map(cate => {
        return cate.id;
      });
      that.dataFood = response.data.data;
      console.log(that.dataFood);
      
    }).catch(function (error) {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getListCategory(`${environment.api_url}/api/category`);
    this.foodId = this.route.snapshot.queryParamMap.get('foodId');
    if (this.foodId != null) {
      this.editMode = true;
      this.getFoodById(`${environment.api_url}/api/food/${this.foodId}`);
    }
  }

}
