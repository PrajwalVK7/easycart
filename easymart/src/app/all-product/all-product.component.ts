import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  allProduct: any = [];

  constructor(private api: AppService) { }
  ngOnInit(): void {
    this.api.getAllProductApi().subscribe({
      next:(res:any)=>{
        this.allProduct=res;
        console.log("All products")
        console.log(this.allProduct)
      }
      ,
      error:(res:any)=>{
        console.log(res)
      }
    })
  }
  addToWishlist(product:any){

    if(localStorage.getItem("token")){
     this.api.addToWishlistAPI(product).subscribe({
      next:(res:any)=>{
        alert("Product Added succesfully to wishlist");
        this.api.getWishlistCount()
      },
      error:(err:any)=>{
        console.log(err)
        alert(err.error)
      }
     })
    }
    else{
      alert("please login")
    }
  }
  addToCart(product:any) {
    if (sessionStorage.getItem("token")) {
      Object.assign(product,{quantity:1})
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          this.api.getCartCount()
          alert("Product added successfully")
        },
        error:(res:any)=>{
          console.log(res)
        }
      })    
    }
    else {
      alert("Please login")
    }
  }

}
