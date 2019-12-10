import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
  ) { }

  dataUser: any = {
    name: null,
    username: null,
    email: null,
    phone: null,
    password: null
  };

  isLoading: boolean = false;

  //token: any = this.localStorage.getItem('token');
  saveUser(e) {
    const that = this;
    var check = true;
    for (var key in this.dataUser) {
      if (this.dataUser[key] == null) check = false;
    }
    if (check) {
    this.isLoading = true;
    if(that.dataUser.role == 1){
      axios.post(`${environment.api_url}/api/auth/signup`, that.dataUser).then(function (response) {
        that.isLoading = false;
        Swal.fire({
          title: 'Lưu tài khoản user thành công',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Xong'
        }).then((result) => {
          if (result.value) {
            window.location.href = '/user/list';
          }
        });
        that.isLoading = false;
      }).catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Có lỗi xảy ra!'
        });
        that.isLoading = false;
        console.log(error);
      });
      } else if(that.dataUser.role == 2){
        axios.post(`${environment.api_url}/api/auth/admin/signup`, that.dataUser).then(function (response) {
          that.isLoading = false;
          Swal.fire({
            title: 'Lưu tài khoản admin thành công',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Xong'
          }).then((result) => {
            if (result.value) {
              window.location.href = '/user/list';
            }
          });
          that.isLoading = false;
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Có lỗi xảy ra!'
          });
          that.isLoading = false;
          console.log(error);
        });
        }
      }
         else {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng kiểm tra lại tất cả các trường còn thiếu',
        text: 'Oops...'
      });
      that.isLoading = false;
    }
  }
  editMode: boolean = false;
  textError: any = null;

 
  ngOnInit() {
  }
}
