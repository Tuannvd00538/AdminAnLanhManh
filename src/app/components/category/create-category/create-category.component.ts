import { Component, OnInit, Inject } from '@angular/core';
import { UtilService } from 'src/app/service/util.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private route: ActivatedRoute
  ) { }

  dataCategory: any = {
    parentId: 0,
    name: null,
    description: null,
    image: null
  }

  isLoading: boolean = false;

  fileChange(event) {
    const that = this;
    const fileList: FileList = event.target.files;
    this.isLoading = true;
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData = new FormData();
      formData.append('image', file, file.name);
      axios.post('https://api.imgur.com/3/image', formData, { headers: { 'Authorization': 'Client-ID d72ab777aaeb0dc' } }).then(function (response) {
        that.dataCategory.image = response.data.data.link;
        that.isLoading = false;
      }).catch(function (error) {
        that.dataCategory.image = null;
        console.log(error);
      });
    }
  }

  listCategory: any = [];

  getListCategory(url: string) {
    const that = this;
    axios.get(url).then(function (response) {
      that.listCategory = response.data;
      console.log(that.listCategory);

    }).catch(function (error) {
      console.log(error);
    });
  }

  token: any = this.localStorage.getItem('token');

  saveCategory(e) {
    const that = this;
    if (this.isLoading) return;
    this.isLoading = true;
    if (this.dataCategory.name != null && this.dataCategory.description != null && this.dataCategory.image != null) {
      if (this.editMode) {
        axios.put(`${environment.api_url}/api/category/update/${this.cateId}`, that.dataCategory, { headers: { Authorization: that.token } }).then(function (response) {
          Swal.fire({
            title: 'Category updated.',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Done'
          }).then((result) => {
            if (result.value) {
              window.location.href = '/category/list';
            }
          })
          that.isLoading = false;
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
          that.isLoading = false;
          console.log(error);
        });
      } else {
        axios.post(`${environment.api_url}/api/category/create`, that.dataCategory, { headers: { Authorization: that.token } }).then(function (response) {
          Swal.fire({
            title: 'Category created.',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Done'
          }).then((result) => {
            if (result.value) {
              window.location.href = '/category/list';
            }
          })
          that.isLoading = false;
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
          that.isLoading = false;
          console.log(error);
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'All field is required',
        text: 'Oops...'
      });
      this.isLoading = false;
    }
  }

  editMode: boolean = false;

  getCategoryById(url) {
    const that = this;
    axios.get(url).then(function (response) {
      that.dataCategory = response.data.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  cateId: any = null;

  ngOnInit() {
    this.getListCategory(`${environment.api_url}/api/category`);
    this.cateId = this.route.snapshot.queryParamMap.get('cateId');
    if (this.cateId != null) {
      this.editMode = true;
      this.getCategoryById(`${environment.api_url}/api/category/${this.cateId}`);
    }
  }

}
