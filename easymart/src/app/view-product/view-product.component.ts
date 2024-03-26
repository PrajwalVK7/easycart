import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product:any=[]
  constructor(private api:AppService,private route:ActivatedRoute){}
ngOnInit(): void {
  this.route.params.subscribe((res:any)=>{
    const id=res.id;
    // console.log(id)
    this.getProduct(id)

  })

  
}
getProduct(id:any){
  this.api.getProductByAPI(id).subscribe({
    next:(res:any)=>{
      this.product=res;
      // console.log(this.product)
    },
    error:(err:any)=>{
      console.log(err)
    }
  })
}

}
