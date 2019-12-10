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

  ngOnInit() {
    this.getListUser(`${environment.api_url}/api/users`);
  }

}
