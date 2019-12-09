import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import Swal from 'sweetalert2';
import { UtilService } from 'src/app/service/util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.css']
})
export class ListScheduleComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    public util: UtilService,
    private route: ActivatedRoute
  ) { }

  client_url: any = environment.client_url;

  listSchedule: any = [];

  currentPage: any = 1;

  getListSchedule(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listSchedule = response.data;
      console.log(response.data);
      //that.currentPage = that.listSchedule.restPagination.page;
    }).catch(function (error) {
      console.log(error);
    });
  }

  isLoading: boolean = false;

  token: any = this.localStorage.getItem('token');

  deleteSchedule(id) {
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
        axios.delete(`${environment.api_url}/api/schedule/${id}`, { headers: { Authorization: that.token } }).then(function (response) {
          Swal.fire(
            'Đã xóa',
            'Lich trình bạn chọn đã bị xóa',
            'success'
          );
          that.listSchedule.data = that.listSchedule.data.filter(schedule => {
            return schedule.id != id;
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
  getScheduleById(url) {
    const that = this;
    axios.get(url).then(function (response) {
      response.data.data.categoryIds = response.data.data.categories.map(cate => {
        return cate.id;
      });
      that.listSchedule = response.data.data;
    }).catch(function (error) {
      console.log(error);
    });
  }
  scheduleId: any = null;
  editMode: boolean = false;
  ngOnInit() {
    this.getListSchedule(`${environment.api_url}/api/schedule/`);
    this.scheduleId = this.route.snapshot.queryParamMap.get('scheduleId');
    if (this.scheduleId != null) {
      this.editMode = true;
      this.getScheduleById(`${environment.api_url}/api/schedule/${this.scheduleId}`);
    }
  }
}
