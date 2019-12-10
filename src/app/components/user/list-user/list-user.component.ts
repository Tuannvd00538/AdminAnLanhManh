import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import Swal from 'sweetalert2';
import { UtilService } from 'src/app/service/util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    public util: UtilService,
    private route: ActivatedRoute
  ) { }

  client_url: any = environment.client_url;

  listUser: any = [];

  currentPage: any = 1;

  getListUser(url: string) {
    const that = this;
    axios.get(url, { headers: { Authorization: that.token } }).then(function (response) {
      that.listUser = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  isLoading: boolean = false;

  token: any = this.localStorage.getItem('token');

  // getScheduleById(url) {
  //   const that = this;
  //   axios.get(url).then(function (response) {
  //     response.data.data.categoryIds = response.data.data.categories.map(cate => {
  //       return cate.id;
  //     });
  //     that.listSchedule = response.data.data;
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }
  scheduleId: any = null;
  editMode: boolean = false;
  ngOnInit() {
    this.getListUser(`${environment.api_url}/api/users`);
    //this.scheduleId = this.route.snapshot.queryParamMap.get('scheduleId');
    // if (this.scheduleId != null) {
    //   this.editMode = true;
    //   this.getScheduleById(`${environment.api_url}/api/schedule/${this.scheduleId}`);
    // }
  }

}
