import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss'],
})
export class InfoUserComponent implements OnInit {
  user: any = {}; // Lưu thông tin người dùng
  userFormGroup: FormGroup; // Form điều khiển

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Khởi tạo form trước để không gặp lỗi truy cập form chưa được định nghĩa
    this.userFormGroup = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      SDT: ['', Validators.required],
      DiaChi: ['', Validators.required],
    });

    // Gọi API lấy thông tin người dùng
    const iduser = localStorage.getItem('idUser');
    this.http.get(environment.URL_API + `Auth/AuthHistory/${iduser}`).subscribe(
      (res) => {
        this.user = res; // Gán dữ liệu vào user
        this.getFullName();
        this.initializeForm(); 
        console.log('user',this.user)
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  // Tạo fullName từ họ và tên
  getFullName(): void {
    this.user.fullName = this.user.firstName + ' ' + this.user.lastName;
  }

  // Khởi tạo FormGroup với dữ liệu từ user
  initializeForm(): void {
    // Cập nhật giá trị của form sau khi nhận dữ liệu từ API
    this.userFormGroup.patchValue({
      FirstName: this.user.firstName,
      LastName: this.user.lastName,
      SDT: this.user.sdt,
      DiaChi: this.user.diaChi,
    });
  }

  // Hàm lưu thông tin người dùng
  Save(): void {
    const iduser = localStorage.getItem('idUser');
    // Chuẩn bị dữ liệu gửi đi
    const updateData = {
        idUser: iduser,
        firstName: this.userFormGroup.value.FirstName,
        lastName: this.userFormGroup.value.LastName,
        sdt: this.userFormGroup.value.SDT,
        diaChi: this.userFormGroup.value.DiaChi,
    };
    console.log('')
    // Gửi dữ liệu cập nhật qua API
    this.http.post(environment.URL_API + 'Auth/AuthHistory', updateData).subscribe({
      next: (resp) => {
        Swal.fire('Cập nhật thành công', '', 'success').then(() => {
          this.user = { ...this.user, ...updateData }; 
          console.log("user",this.user)
          this.getFullName();// Cập nhật dữ liệu hiển thị
        });
      },
      error: (err) => {
        Swal.fire('Lỗi cập nhật', err.message, 'error');
      },
    });
  }
}
