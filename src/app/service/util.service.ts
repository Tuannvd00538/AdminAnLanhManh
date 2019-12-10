import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  uploadImage(fileList: any[] | FileList) {
    const file = fileList[0];

    const formData = new FormData();
    formData.append('image', file, file.name);

    var x = null;

    axios.post('https://api.imgur.com/3/image', formData, { headers: { 'Authorization': 'Client-ID d72ab777aaeb0dc' } }).then(function (response) {
      x = response.data.data.link;
    }).catch(function (error) {
      console.log(error);
      x = null;
    });
    return x;
  }

  formatPrice(price: any) {
    var pri: any = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    });
    return pri.format(price);
  }

  generateURL(title: any, id: any): any {
    if (title) {
      let str = title;
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/!|@|%|\^|\*|\color{#fff}{|}∣|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
      str = str.replace(/-+-/g, "-");
      str = str.replace(/^\-+|\-+$/g, "");
      str = str.replace(/ /g, "-");
      return `${str}-${id}.html`;
    }
  };

  getTotalPrice(arr: { reduce: (arg0: (a: any, b: any) => number, arg1: number) => void; }) {
    if (arr == null) return;
    return arr.reduce((a, b) => parseInt(a) + (parseInt(b.totalPrice)), 0)
  }

  timeFrom(X: number) {
    var curr = new Date();
    var dates = [];
    for (var i = 0; i < X; i++) {
      curr.setDate(curr.getDate() - 1);
      var data = `${curr.getFullYear()}-${curr.getMonth() + 1}-${('0' + (curr.getDate() + 1)).slice(-2)}`;
      dates.unshift(data);
    };
    return dates;
  }
}
