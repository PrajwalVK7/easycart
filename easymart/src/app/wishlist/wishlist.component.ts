import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  allProducts:any = []
   constructor(private api:AppService){}
 
   ngOnInit(): void {
     this,this.getAllItemsFromWishlist()
     
   }
   getAllItemsFromWishlist(){
     this.api. getProductsFromWishlistAPI().subscribe({
       next:(res:any)=>{
         console.log("==all wishlist items==");
         console.log(res)
         this.allProducts = res;
       },
       error:(res:any)=>{
         console.log(res)
       }
     })
   }
   removeItem(id:any){
     this.api.removeFromWishlistAPI(id).subscribe({
       next:(res:any)=>{
         this.api.getWishlistCount()
         alert("Item removed from wishlist successfully")
         this.getAllItemsFromWishlist();
       },
       error:(res:any)=>{
         console.log(res)
       }
     })
   }
 
   addItemTocart(product:any){
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