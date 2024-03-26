import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allProduct: any = [];
  cartTotal: any = 0;
  constructor(private api: AppService, private route:Router) { }
  ngOnInit(): void {
    this.getAllCartItems()
  }
  getAllCartItems() {
    this.api.getCartApi().subscribe({
      next: (res: any) => {
        console.log("all cart items");
        console.log(res)
        this.allProduct = res;
        this.gettotalPrice()
      },
      error: (res: any) => {
        console.log(res)
      }
    })
  }
  removeItem(id: any) {
    this.api.removeFromcart(id).subscribe({
      next: (res: any) => {
        this.api.getCartCount()
        this.getAllCartItems()
        alert("Prodcut successfully removed")
      },
      error: (res: any) => {
        console.log(res)
      }
    })

  }
  gettotalPrice() {
    if (this.allProduct.length > 0) {
      this.cartTotal = Math.ceil(this.allProduct.map((item: any) => item.grandTotal).reduce((amt1: any, amt2: any) => amt1 + amt2))
      console.log(this.cartTotal);

    } else {
      this.cartTotal = 0
    }
  }

  decrementCartProduct(id: any) {
    this.api.decrementCartItem(id).subscribe({
      next:(res:any)=>{
        this.getAllCartItems();
        this.api.getCartCount()
      },
      error:(res:any)=>{
        console.log(res)
      }
    })

  }
  incrementCartProduct(id: any) {
    this.api.incrementCartItem(id).subscribe({
      next:(res:any)=>{
        this.getAllCartItems();
        this.api.getCartCount()
      },
      error:(res:any)=>{
        console.log(res)
      }
    })

  }
  emptyCartItems(){
    this.api.emptycart().subscribe({
      next:(res:any)=>{
        this.getAllCartItems();
        this.api.getCartCount()
      },
      error:(res:any)=>{
        console.log(res)
      }
    })

  }
  checkout(){
    sessionStorage.setItem("total",JSON.stringify(this.cartTotal))
    this.route.navigateByUrl("checkout")
  }

}
