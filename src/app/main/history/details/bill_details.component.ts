import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-contact',
  templateUrl: './bill_details.component.html',
  styleUrls: ['./bill_details.component.scss']
})
export class BillDetailsComponent implements OnInit {
  list_hoadon:any;
  id_bill:any;
  bill:any;
  bill_details:any[]=[];
  info_user:any;
  user:any;
  tongtien:any;
  constructor(public http:HttpClient,public route: ActivatedRoute) {
    
}
Huy(){
  this.http.post(environment.URL_API+"chitiethoadons/huydon/"+this.id_bill,{
  }).subscribe(
    res=>{
      this.loadChiTietPhieu()
    })
}
loadChiTietPhieu()
{
  this.http.get(environment.URL_API+"hoadons/hoadon/"+this.id_bill,{
  }).subscribe(
    (res:any)=>{
      this.bill=res.data;
    });
    this.http.post(environment.URL_API+"chitiethoadons/chitiethoadon/"+this.id_bill,{
  }).subscribe(
    (res:any)=>{
      if(res.status){
        this.bill_details=res.data;
      }
      
      this.tongtien=0;
      for (let i = 0; i < this.bill_details.length; i++) {
        this.tongtien=this.tongtien+(this.bill_details[i].gia*this.bill_details[i].soluong)
    }
    });
 }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_bill = params['id'];
      this.http.get(environment.URL_API+"HoaDons/hoadon/"+this.id_bill,{
  }).subscribe(
    (res:any)=>{
      if(res.status){
        this.bill=res.data;
        console.log('bill',this.bill)
      }
      
    });
    this.http.post(environment.URL_API+"chitiethoadons/chitiethoadon/"+this.id_bill,{
  }).subscribe(
    (res:any)=>{
      if(res.status){
        this.bill_details=res.data;
        console.log(res);
      }
      
      this.tongtien=0;
      for (let i = 0; i < this.bill_details.length; i++) {
        this.tongtien=this.tongtien+(this.bill_details[i].giaBan*this.bill_details[i].soluong)
    }
    });
  });
  }
}
