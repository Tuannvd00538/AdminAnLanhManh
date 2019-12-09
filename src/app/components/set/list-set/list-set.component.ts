import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import Swal from 'sweetalert2';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-list-set',
  templateUrl: './list-set.component.html',
  styleUrls: ['./list-set.component.css']
})
export class ListSetComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    public util: UtilService
  ) { }

  listSet: any = [];

  client_url: any = environment.client_url;

  currentPage: any = 1;

  getListSet(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listSet = response.data;
      that.currentPage = that.listSet.restPagination.page;
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
    axios.get(`${environment.api_url}/api/combo/list?limit=12&page=${this.currentPage}`).then(function (response) {
      const newArray = [...that.listSet.data, ...response.data.data];
      that.listSet.data = newArray;
      that.listSet.restPagination = response.data.restPagination;
      that.isLoading = false;
    }).catch(function (error) {
      that.isLoading = false;
      console.log(error);
    });
  }

  token: any = this.localStorage.getItem('token');

  deleteSet(id) {
    const that = this;
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Sau khi xóa, bạn không thể khôi phục set đồ ăn!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, tiếp tục xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.value) {
        axios.delete(`${environment.api_url}/api/combo/${id}`, { headers: { Authorization: that.token } }).then(function (response) {
          Swal.fire(
            'Đã xóa',
            'Set đồ ăn đã bị xóa',
            'success'
          );
          that.listSet.data = that.listSet.data.filter(set => {
            return set.id != id
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
  };

  ngOnInit() {
    this.getListSet(`${environment.api_url}/api/combo/list?limit=12&page=${this.currentPage}`);
  }

}
