import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import Swal from 'sweetalert2';
import { UtilService } from 'src/app/service/util.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    public util: UtilService,
    private route: ActivatedRoute
  ) { }

  client_url: any = environment.client_url;

  listSchedule: any = [];

  getListScheduleCombo(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listSchedule = response.data;
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
  dataSchedule: any = [];
  token: any = this.localStorage.getItem('token');
  scheduleId: any = null;
  ngOnInit() {
    this.scheduleId = this.route.snapshot.queryParamMap.get('scheduleId');
    this.getListScheduleCombo(`${environment.api_url}/api/schedule-combo/schedule/${this.scheduleId}`);
    this.getScheduleById(`${environment.api_url}/api/schedule/${this.scheduleId}`);
      
  }
}
