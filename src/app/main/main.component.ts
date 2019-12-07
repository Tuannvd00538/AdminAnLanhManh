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

  getTimeChart(numb) {
    var date = this.util.timeFrom(numb);
    var data = [0, 8, 20, 32, 44, 56, 68, 80, 92, 104, 116, 128, 140];
    var rs = [];
    date.forEach((e, i) => {
      let arr = [data[i], e];
      rs.push(arr);
    });
    console.log(rs);
    return JSON.stringify(rs);
  }

  df3: any = [
    [0,5],
    [1,10],
    [2,15],
    [3,20],
    [4,25],
    [5,30],
    [6,35],
    [7,40],
    [8,45],
    [9,50],
    [10,19],
    [11,16],
    [12,13],
    [13,18],
    [14,17],
    [15,18],
    [16,18],
    [17,19],
    [18,18],
    [19,17],
    [20,20],
    [21,18],
    [22,17],
    [23,17],
    [24,15],
    [25,15],
    [26,14],
    [27,15],
    [28,18],
    [29,19],
    [30,23],
    [31,27],
    [32,30],
    [33,28],
    [34,29],
    [35,29],
    [36,27],
    [37,24],
    [38,22],
    [39,26],
    [40,28],
    [41,27],
    [42,30],
    [43,26],
    [44,22],
    [45,19],
    [46,16],
    [47,17],
    [48,20],
    [49,16],
    [50,12],
    [51,10],
    [52,7],
    [53,11],
    [54,15],
    [55,20],
    [56,22],
    [57,19],
    [58,18],
    [59,20],
    [60,17],
    [61,19],
    [62,18],
    [63,14],
    [64,9],
    [65,10],
    [66,6],
    [67,10],
    [68,12],
    [69,13],
    [70,18],
    [71,22],
    [72,22],
    [73,26],
    [74,22],
    [75,18],
    [76,19],
    [77,19],
    [78,18],
    [79,23],
    [80,20],
    [81,25],
    [82,28],
    [83,29],
    [84,27],
    [85,25],
    [86,25],
    [87,24],
    [88,20],
    [89,18],
    [90,18],
    [91,18],
    [92,22],
    [93,21],
    [94,26],
    [95,29],
    [96,26],
    [97,28],
    [98,30],
    [99,28],
    [100,30],
    [101,27],
    [102,30],
    [103,26],
    [104,25],
    [105,28],
    [106,27],
    [107,30],
    [108,31],
    [109,36],
    [110,32],
    [111,27],
    [112,29],
    [113,32],
    [114,28],
    [115,28],
    [116,29],
    [117,29],
    [118,27],
    [119,30],
    [120,28],
    [121,23],
    [122,18],
    [123,14],
    [124,11],
    [125,12],
    [126,11],
    [127,14],
    [128,11],
    [129,15],
    [130,13],
    [131,17],
    [132,18],
    [133,23],
    [134,21],
    [135,25],
    [136,22],
    [137,17],
    [138,14],
    [139,18],
    [140,20],
    [141,22],
    [142,25],
    [143,27],
    [144,27],
    [145,28],
    [146,26],
    [147,28],
    [148,29],
    [149,26]
  ];

  ngOnInit() {
    let script = this._renderer2.createElement('script');
    script.text = `$(function () {
      'use strict'

      var plot = $.plot('#flotChart', [{
        data: ${JSON.stringify(this.df3)},
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
          ticks: ${this.getTimeChart(13)},
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
    });
    
  }

  getStatusOrder(status) {
    switch (status) {
      case 1:
        return `<span class="avatar-initial rounded-circle bg-teal"><i class="icon ion-md-checkmark"></i></span>`;
      case 2:
        return `<span class="avatar-initial rounded-circle bg-teal"><i class="icon ion-md-checkmark"></i></span>`;
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
