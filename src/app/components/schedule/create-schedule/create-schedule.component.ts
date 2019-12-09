import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { UtilService } from 'src/app/service/util.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private route: ActivatedRoute
  ) { }

  listSchedule: any = [];

  dataSchedule: any = {
    name: null,
    description: null,
    image: null,
    price: null
  };

  isLoading: boolean = false;

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
        that.dataSchedule.image = response.data.data.link;
      }).catch(function (error) {
        that.dataSchedule.image = null;
        that.isLoading = false;
        console.log(error);
      });
    }
  }

  token: any = this.localStorage.getItem('token');

  saveSchedule(e) {
    const that = this;
    var check = true;
    for (var key in this.dataSchedule) {
      if (this.dataSchedule[key] == null) check = false;
    }
    if (check) {
      this.isLoading = true;
      if (this.editMode) {
        axios.put(`${environment.api_url}/api/schedule/update/${this.scheduleId}`, that.dataSchedule, { headers: { Authorization: that.token } }).then(function (response) {
          Swal.fire({
            title: 'Lưu lịch trình thành công',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Xong'
          }).then((result) => {
            if (result.value) {
              window.location.href = '/schedule/list';
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
        axios.post(`${environment.api_url}/api/schedule/create`, that.dataSchedule, { headers: { Authorization: that.token } }).then(function (response) {
          that.isLoading = false;
          Swal.fire({
            title: 'Lưu lịch trình thành công',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Xong'
          }).then((result) => {
            if (result.value) {
              window.location.href = '/schedule/list';
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

  scheduleId: any = null;
  editMode: boolean = false;
  listCategory:any =[];
  getListCategory(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listCategory = response.data.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  getScheduleById(url) {
    const that = this;
    axios.get(url).then(function (response) {
      response.data.data.categoryIds = response.data.data.categories.map(cate => {
        return cate.id;
      });
      that.dataSchedule = response.data.data;
    }).catch(function (error) {
      console.log(error);
    });
  }
  ngOnInit() {
    this.getListCategory(`${environment.api_url}/api/category/`);
    this.scheduleId = this.route.snapshot.queryParamMap.get('scheduleId');
    if (this.scheduleId != null) {
      this.editMode = true;
      this.getScheduleById(`${environment.api_url}/api/schedule/${this.scheduleId}`);
    }
  }
}
