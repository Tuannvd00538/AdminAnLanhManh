import { Component, OnInit, Inject } from '@angular/core';
import { UtilService } from 'src/app/service/util.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import axios from 'axios';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private service: UtilService
  ) { }

  dataCategory: any = {
    parentId: 4,
    name: null,
    description: null,
    image: null
  }

  fileChange(event) {
    const that = this;
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData = new FormData();
      formData.append('image', file, file.name);
      axios.post('https://api.imgur.com/3/image', formData, { headers: { 'Authorization': 'Client-ID d72ab777aaeb0dc' } }).then(function (response) {
        that.dataCategory.image = response.data.data.link;
      }).catch(function (error) {
        that.dataCategory.image = null;
        console.log(error);
      });
    }
  }

  token: any = this.localStorage.getItem('token');

  saveCategory(e) {
    console.log(this.dataCategory);
  }

  ngOnInit() {
  }

}
