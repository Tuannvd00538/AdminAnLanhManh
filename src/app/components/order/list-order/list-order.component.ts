import { Component, OnInit, Renderer2, Inject, ViewChild, ElementRef } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { UtilService } from 'src/app/service/util.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor(
    private _renderer2: Renderer2,
    public util: UtilService,
    @Inject(DOCUMENT) private _document: Document,
    private route: ActivatedRoute
  ) { }

  client_url: any = null;

  token: string = localStorage.getItem('token');

  orderList: any = [];

  orderDetail: any = null;

  getStatus(status: any) {
    switch (status) {
      case 1:
        return `<p class="text-warning">Đã đặt hàng</p>`;
      case 2:
        return `<p class="text-warning">Đã xác nhận đơn hàng</p>`;
      case 3:
        return `<p class="text-warning">Đang giao hàng</p>`;
      case 4:
        return `<p class="text-success">Giao hàng thành công</p>`;
      case 5:
        return `<p class="text-danger">Giao hàng thất bại</p>`;
      default:
        break;
    }
  }

  @ViewChild('other', { static: true }) other: ElementRef;

  chooseOrder(item) {
    this.orderDetail = item;
    this.other.nativeElement.click();
  }

  confirmOrder(order) {
    const that = this;
    axios.put(`${environment.api_url}/api/order/${order.id}?status=3`, null, { headers: { Authorization: that.token } }).then((response) => {
      that.orderDetail.status = 3;
    }).catch((err) => {
      console.log(err);
    })
  }

  shipSuccess(order) {
    const that = this;
    axios.put(`${environment.api_url}/api/order/${order.id}?status=4`, null, { headers: { Authorization: that.token } }).then((response) => {
      that.orderDetail.status = 4;
    }).catch((err) => {
      console.log(err);
    })
  }

  rejectOrder(order) {
    const that = this;
    axios.put(`${environment.api_url}/api/order/${order.id}?status=5`, null, { headers: { Authorization: that.token } }).then((response) => {
      that.orderDetail.status = 5;
    }).catch((err) => {
      console.log(err);
    })
  }

  searchOrder(code, param_option) {
    const that = this;
    axios.get(`${environment.api_url}/api/order?search=${code}`, { headers: { Authorization: that.token } }).then((response) => {
      that.orderList = response.data.data;
      if (param_option) that.orderDetail = that.orderList[0];
    }).catch((err) => {
      that.isLoading = false;
      console.log(err);
    });
  }

  salesReport: any = null;

  nextPage: any = null;

  isLoading: boolean = false;

  dataDate: any = null;

  dataStatusReport: any = {
    success: 0,
    reject: 0,
    other: 0
  }

  getReport(from, to) {
    const that = this;
    that.dataDate = null;
    that.dataStatusReport = {
      success: 0,
      reject: 0,
      other: 0
    };
    that.salesReport = null
    if (from == null || from == '') {
      return;
    } else {
      from = from.split('/');
    };
    if (to == null || to == '') {
      return;
    } else {
      to = to.split('/');
    };
    var validFrom = `${from[2]}-${from[0]}-${from[1]} 00:00`;
    var validTo = `${to[2]}-${to[0]}-${to[1]} 23:59`;
    if (this.isLoading) return;
    that.isLoading = true;
    axios.get(`${environment.api_url}/api/order?from=${validFrom}&to=${validTo}&limit=1000`, { headers: { Authorization: that.token } }).then((response) => {
      that.salesReport = response.data.data;
      that.isLoading = false;
      that.dataDate = {
        from: `${from[2]}-${from[0]}-${from[1]}`,
        to: `${to[2]}-${to[0]}-${to[1]}`
      }
      that.salesReport.forEach((item: { status: number; }) => {
        switch (item.status) {
          case 2:
            that.dataStatusReport.success = that.dataStatusReport.success + 1;
            break;
          case 5:
            that.dataStatusReport.reject = that.dataStatusReport.reject + 1;
            break;
          default:
            that.dataStatusReport.other = that.dataStatusReport.other + 1;
            break;
        }
      });
      if (response.data.restPagination.totalPages > 1) {
        console.log("Next Page");
      };
    }).catch((err) => {
      that.isLoading = false;
      console.log(err);
    })
  }

  viewCode: any = null;
  viewId: any = null;

  ngOnInit() {
    const that = this;
    if (this.token == null || this.token == undefined) {
      window.location.href = '/auth/login';
      return;
    }
    this.client_url = environment.client_url;

    this.viewCode = this.route.snapshot.queryParamMap.get('code');
    this.viewId = this.route.snapshot.queryParamMap.get('id');

    if (this.viewCode != null && this.viewId != null) {
      that.searchOrder(this.viewCode, true);
    } else {
      axios.get(`${environment.api_url}/api/order?limit=1000`, { headers: { Authorization: that.token } }).then((response) => {
        that.orderList = response.data.data;
      }).catch((err) => {
        console.log(err);
      });
    }
    let script = this._renderer2.createElement('script');
    script.text = `
      $(function(){
        $('#from').datepicker({
          showButtonPanel: true
        });
        $('#to').datepicker({
          showButtonPanel: true
        });
      });
    `;
    this._renderer2.appendChild(this._document.body, script);
  }

}
