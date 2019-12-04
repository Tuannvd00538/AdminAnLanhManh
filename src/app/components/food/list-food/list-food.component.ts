import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import Swal from 'sweetalert2';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css']
})
export class ListFoodComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    public util: UtilService
  ) { }

  client_url: any = environment.client_url;

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

  isLoading: boolean = false;

  showMoreData() {
    const that = this;
    if (this.isLoading) return;
    this.isLoading = true;
    this.currentPage = this.currentPage + 1;
    axios.get(`${environment.api_url}/api/food/list?page=${this.currentPage}`).then(function (response) {
      const newArray = [...that.listFood.data, ...response.data.data];
      that.listFood.data = newArray;
      that.listFood.restPagination = response.data.restPagination;
      that.isLoading = false;
    }).catch(function (error) {
      that.isLoading = false;
      console.log(error);
    });
  }

  token: any = this.localStorage.getItem('token');

  deleteFood(id) {
    const that = this;
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Sau khi xóa, bạn sẽ không thể khôi phục lại được!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, tiếp tục xóa!',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.value) {
        axios.delete(`${environment.api_url}/api/food/${id}`, { headers: { Authorization: that.token } }).then(function (response) {
          Swal.fire(
            'Đã xóa',
            'Món ăn bạn chọn đã bị xóa',
            'success'
          );
          that.listFood.data = that.listFood.data.filter(food => {
            return food.id != id;
          });
        }).catch(function (error) {
          Swal.fire(
            'Oops...',
            'Có lỗi xảy ra',
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
