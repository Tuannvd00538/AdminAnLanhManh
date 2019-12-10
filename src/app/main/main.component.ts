import { Component, OnInit, Inject, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';
import { UtilService } from '../service/util.service';
import axios from 'axios';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  constructor(
    private _renderer2: Renderer2,
    public util: UtilService,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  token: string = localStorage.getItem('token');

  orderList: any = [];

  dataArrChartNumber: any = [];

  date: any = this.util.timeFrom(7);

  getTimeChart() {
    const that = this;
    var rs = [];
    this.date.forEach((e, i) => {
      let arr = [that.dataArrChartNumber[i], e];
      rs.push(arr);
    });
    return JSON.stringify(rs);
  }

  success: number = 0;
  successArr: any = [];
  totalMoneySuccess: number = 0;
  orderSuccess() {
    const that = this;
    var data = [];
    that.dataArrChartNumber.forEach(date => {
      data.push([date, 0]);
    });
    that.date.forEach((date, i) => {
      date = date.split('-');
      date = `${date[2]}-${date[1]}-${date[0]}`;
      that.dataOrder.forEach(ord => {
        var regEx = new RegExp(date, 'g');
        if (ord.createdAt.match(regEx) != null && ord.status == 4) {
          that.success = that.success + 1;
          that.successArr.push(ord);
          that.totalMoneySuccess = that.totalMoneySuccess + ord.totalPrice;
          data[i][1] = data[i][1] + 1;
        }
      });
    });
    return data;
  }

  pending: number = 0;
  pendingArr: any = [];
  orderPending() {
    const that = this;
    var data = [];
    that.dataArrChartNumber.forEach(date => {
      data.push([date, 0]);
    });
    that.date.forEach((date, i) => {
      date = date.split('-');
      date = `${date[2]}-${date[1]}-${date[0]}`;
      that.dataOrder.forEach(ord => {
        var regEx = new RegExp(date, 'g');
        if (ord.createdAt.match(regEx) != null && ord.status < 4) {
          that.pendingArr.push(ord);
          that.pending = that.pending + 1;
          data[i][1] = data[i][1] + 1;
        }
      });
    });
    return data;
  }

  reject: number = 0;
  rejectArr: any = [];
  orderReject() {
    const that = this;
    var data = [];
    that.dataArrChartNumber.forEach(date => {
      data.push([date, 0]);
    });
    that.date.forEach((date, i) => {
      date = date.split('-');
      date = `${date[2]}-${date[1]}-${date[0]}`;
      that.dataOrder.forEach(ord => {
        var regEx = new RegExp(date, 'g');
        if (ord.createdAt.match(regEx) != null && ord.status == 5) {
          that.rejectArr.push(ord);
          that.reject = that.reject + 1;
          data[i][1] = data[i][1] + 1;
        }
      });
    });
    return data;
  }

  dataOrder: any = null;

  dataModal: any = null;

  ngOnInit() {
    let script = this._renderer2.createElement('script');

    const that = this;
    if (this.token == null || this.token == undefined) {
      window.location.href = '/auth/login';
      return;
    }
    axios.get(`${environment.api_url}/api/order`, { headers: { Authorization: that.token } }).then((response) => {
      that.orderList = response.data.data;
    }).catch((err) => {
      console.log(err);
    });

    var date = this.util.timeFrom(7);
    axios.get(`${environment.api_url}/api/order?from=${date[0]} 00:00&to=${date[6]} 23:59&limit=1000`, { headers: { Authorization: that.token } }).then((response) => {
      var currentNumber = 0;
      var number = response.data.data.length / 6;
      that.dataOrder = response.data.data;
      let a = new Promise((resolve, reject) => {
        for (let i = 0; i < 7; i++) {
          switch (i) {
            case 0:
              this.dataArrChartNumber.push(0);
              break;
            case 6:
              this.dataArrChartNumber.push(response.data.data.length);
              break;
            default:
              currentNumber = currentNumber + number;
              if (currentNumber.toString().indexOf('.') == -1) {
                this.dataArrChartNumber.push(currentNumber);
              } else {
                currentNumber = parseInt(currentNumber.toString().split('.')[0]);
                this.dataArrChartNumber.push(currentNumber);
              }
              break;
          }
        }
        resolve();
      });
      Promise.all([a]).then(() => {
        script.text = `$(function () {
          'use strict'
    
          var plot = $.plot('#flotChart', [{
            data: ${JSON.stringify(this.orderSuccess())},
            color: '#69b2f8',
            lines: {
              fill: false,
              lineWidth: 6
            }
          }, {
            data: ${JSON.stringify(this.orderPending())},
            color: '#d1e6fa',
            lines: {
              fill: false,
              lineWidth: 8
            }
          }, {
            data: ${JSON.stringify(this.orderReject())},
            color: '#d1e6fa',
            lines: {
              fill: false,
              lineWidth: 10
            }
          }], {
            series: {
              stack: 0,
              shadowSize: 0,
              lines: {
                show: true,
                lineWidth: 0,
                fill: 1
              }
            },
            grid: {
              borderWidth: 0,
              aboveData: true
            },
            yaxis: {
              show: false,
              min: 0,
              max: 350
            },
            xaxis: {
              show: true,
              ticks: ${this.getTimeChart()},
              color: 'rgba(255,255,255,.2)'
            }
          });
    
    
          $.plot('#flotChart2', [{
            data: [[0, 55], [1, 38], [2, 20], [3, 70], [4, 50], [5, 15], [6, 30], [7, 50], [8, 40], [9, 55], [10, 60], [11, 40], [12, 32], [13, 17], [14, 28], [15, 36], [16, 53], [17, 66], [18, 58], [19, 46]],
            color: '#69b2f8'
          }, {
            data: [[0, 80], [1, 80], [2, 80], [3, 80], [4, 80], [5, 80], [6, 80], [7, 80], [8, 80], [9, 80], [10, 80], [11, 80], [12, 80], [13, 80], [14, 80], [15, 80], [16, 80], [17, 80], [18, 80], [19, 80]],
            color: '#f0f1f5'
          }], {
            series: {
              stack: 0,
              bars: {
                show: true,
                lineWidth: 0,
                barWidth: .5,
                fill: 1
              }
            },
            grid: {
              borderWidth: 0,
              borderColor: '#edeff6'
            },
            yaxis: {
              show: false,
              max: 80
            },
            xaxis: {
              ticks: [[0, 'T1'], [4, 'T2'], [8, 'T3'], [12, 'T4'], [16, 'T5'], [19, 'T6']],
              color: '#fff',
            }
          });
    
          $.plot('#flotChart3', [{
            data: df4,
            color: '#9db2c6'
          }], {
            series: {
              shadowSize: 0,
              lines: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: { colors: [{ opacity: 0 }, { opacity: .5 }] }
              }
            },
            grid: {
              borderWidth: 0,
              labelMargin: 0
            },
            yaxis: {
              show: false,
              min: 0,
              max: 60
            },
            xaxis: { show: false }
          });
    
          $.plot('#flotChart4', [{
            data: df5,
            color: '#9db2c6'
          }], {
            series: {
              shadowSize: 0,
              lines: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: { colors: [{ opacity: 0 }, { opacity: .5 }] }
              }
            },
            grid: {
              borderWidth: 0,
              labelMargin: 0
            },
            yaxis: {
              show: false,
              min: 0,
              max: 80
            },
            xaxis: { show: false }
          });
    
          $.plot('#flotChart5', [{
            data: df6,
            color: '#9db2c6'
          }], {
            series: {
              shadowSize: 0,
              lines: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: { colors: [{ opacity: 0 }, { opacity: .5 }] }
              }
            },
            grid: {
              borderWidth: 0,
              labelMargin: 0
            },
            yaxis: {
              show: false,
              min: 0,
              max: 80
            },
            xaxis: { show: false }
          });
    
          $.plot('#flotChart6', [{
            data: df4,
            color: '#9db2c6'
          }], {
            series: {
              shadowSize: 0,
              lines: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: { colors: [{ opacity: 0 }, { opacity: .5 }] }
              }
            },
            grid: {
              borderWidth: 0,
              labelMargin: 0
            },
            yaxis: {
              show: false,
              min: 0,
              max: 60
            },
            xaxis: { show: false }
          });
        })`;
        this._renderer2.appendChild(this._document.body, script);
      });
    }).catch((err) => {
      console.log(err);
    });

  }
  getStatusOrder(status) {
    switch (status) {
      case 1:
        return `<span class="avatar-initial rounded-circle bg-indigo op-5"><i class="icon ion-md-return-left"></i></span>`;
      case 2:
        return `<span class="avatar-initial rounded-circle bg-indigo op-5"><i class="icon ion-md-return-left"></i></span>`;
      case 3:
        return `<span class="avatar-initial rounded-circle bg-orange op-5"><i class="icon ion-md-bus"></i></span>`;
      case 4:
        return `<span class="avatar-initial rounded-circle bg-teal"><i class="icon ion-md-checkmark"></i></span>`;
      case 5:
        return `<span class="avatar-initial rounded-circle bg-gray-400"><i class="icon ion-md-close"></i></span>`;
      default:
        break;
    }
  }

}
