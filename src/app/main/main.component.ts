import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';
import { UtilService } from '../service/util.service';
import axios from 'axios';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private _renderer2: Renderer2,
    public util: UtilService,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  token: string = localStorage.getItem('token');

  orderList: any = [];

  ngOnInit() {
    let script = this._renderer2.createElement('script');
    script.text = `$(function () {
      'use strict'

      var plot = $.plot('#flotChart', [{
        data: df3,
        color: '#69b2f8'
      }, {
        data: df1,
        color: '#d1e6fa'
      }, {
        data: df2,
        color: '#d1e6fa',
        lines: {
          fill: false,
          lineWidth: 1.5
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
          ticks: [[0, ''], [8, 'T1'], [20, 'T2'], [32, 'T3'], [44, 'T4'], [56, 'T5'], [68, 'T6'], [80, 'T7'], [92, 'T8'], [104, 'T9'], [116, 'T10'], [128, 'T11'], [140, 'T12']],
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

  getStatusOrder(status) {
    switch (status) {
      case 1:
        return `<span class="avatar-initial rounded-circle bg-teal"><i class="icon ion-md-checkmark"></i></span>`;
      case 2:
        return `<span class="avatar-initial rounded-circle bg-teal"><i class="icon ion-md-checkmark"></i></span>`;
      case 3:
        return `<span class="vatar-initial rounded-circle bg-orange op-5"><i class="icon ion-md-bus"></i></span>`;
      case 4:
        return `<span class="avatar-initial rounded-circle bg-teal"><i class="icon ion-md-checkmark"></i></span>`;
      case 5:
        return `<span class="avatar-initial rounded-circle bg-gray-400"><i class="icon ion-md-close"></i></span>`;
      default:
        break;
    }
  }

}
