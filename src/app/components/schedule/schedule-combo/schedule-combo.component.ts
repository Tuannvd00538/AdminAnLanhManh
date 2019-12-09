import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { UtilService } from 'src/app/service/util.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-schedule-combo',
  templateUrl: './schedule-combo.component.html',
  styleUrls: ['./schedule-combo.component.css']
})
export class ScheduleComboComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private route: ActivatedRoute
  ) { }

  listSchedule: any = [];

  scheduleCombo: any = {
    day: null,
    type: null,
    comboId: null
  };

  isLoading: boolean = false;

  token: any = this.localStorage.getItem('token');

  saveScheduleCombo(e) {
    const that = this;
    var check = true;
    for (var key in this.scheduleCombo) {
      if (this.scheduleCombo[key] == null) check = false;
    }
    if (check) {
      this.isLoading = true;
      if(this.editMode){
        that.scheduleCombo.scheduleId = that.scheduleId;
        axios.post(`${environment.api_url}/api/schedule-combo/create`, that.scheduleCombo, { headers: { Authorization: that.token } }).then(function (response) {
          that.isLoading = false;
          Swal.fire({
            title: 'Lưu lịch trình ăn uống thành công',
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
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Vui lòng kiểm tra lại tất cả các trường còn thiếu',
          text: 'Oops...'
        });
        that.isLoading = false;
      }
    }
  }

  dataSchedule:any ;
  scheduleId: any;
  editMode: boolean = false;
  listCombo:any =[];
  getListCombo(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listCombo = response.data.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  getScheduleById(url) {
    const that = this;
    axios.get(url).then(function (response) {
      that.dataSchedule = response.data.data;
    }).catch(function (error) {
      console.log(error);
    });
  }
  ngOnInit() {
    this.getListCombo(`${environment.api_url}/api/combo`);
    this.scheduleId = this.route.snapshot.queryParamMap.get('scheduleId');
    if (this.scheduleId != null) {
      this.editMode = true;
      this.getScheduleById(`${environment.api_url}/api/schedule/${this.scheduleId}`);
    }
  }
}
