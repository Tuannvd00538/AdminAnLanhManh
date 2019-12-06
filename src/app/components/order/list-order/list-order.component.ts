import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor() { }

  token: string = localStorage.getItem('token');

  orderList: any = [];

  orderDetail: any = null;

  ngOnInit() {
    const that = this;
    if (this.token == null || this.token == undefined) {
      window.location.href = '/auth/login';
      return;
    }
    axios.get(`${environment.api_url}/api/order`, { headers: { Authorization: that.token } }).then((response) => {
      that.orderList = response.data.data;
      console.log(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }

}
