import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor(
    public util: UtilService
  ) { }

  client_url: any = null;

  token: string = localStorage.getItem('token');

  orderList: any = [];

  orderDetail: any = null;

  getStatus(status: any) {
    switch (status) {
      case 1:
        return;
      case 2:
        return;
      case 3:
        return;
      case 4:
        return;
      case 5:
        return;
      default:
        break;
    }
  }

  ngOnInit() {
    const that = this;
    if (this.token == null || this.token == undefined) {
      window.location.href = '/auth/login';
      return;
    }
    this.client_url = environment.client_url;
    axios.get(`${environment.api_url}/api/order`, { headers: { Authorization: that.token } }).then((response) => {
      that.orderList = response.data.data;
      console.log(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }

}
