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
}
