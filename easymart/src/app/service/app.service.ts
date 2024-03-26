import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  serverURL = "http://localhost:5000"
  constructor(private http: HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount();

    }
   }

  addTokenHeader(){

    // create an object of HttpHeaders
    let headers = new HttpHeaders();

    const token = sessionStorage.getItem('token');
    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }

  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)

  getWishlistCount(){
    this.getProductsFromWishlistAPI().subscribe((res:any)=>{
    return  this.wishlistCount.next(res.length)
    })
  }
  getCartCount(){
    this.getCartApi().subscribe((res:any)=>{
     this.cartCount.next(res.length)
    })
  }

  getAllProductApi() {
    return this.http.get(`${this.serverURL}/all-products`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.serverURL}/user/register`,user)
  }
  loginAPI(user:any){
    return this.http.post(`${this.serverURL}/user/login`,user)
  }

  getProductByAPI(id:number){
    return this.http.get(`${this.serverURL}/view-product/${id}`)
  }

  addToWishlistAPI(product:any){
  return  this.http.post(`${this.serverURL}/user/add-wishlist`,product,this.addTokenHeader())
  }

  getProductsFromWishlistAPI(){
    return this.http.get(`${this.serverURL}/user/wishlist`,this.addTokenHeader())
  }


  removeFromWishlistAPI(id:any){
    return this.http.delete(`${this.serverURL}/user/wishlist/remove/${id}`,this.addTokenHeader())
  }
  addToCartApi(product:any){
    return this.http.post(`${this.serverURL}/add-cart`,product,this.addTokenHeader())
  }

  getCartApi(){
    return this.http.get(`${this.serverURL}/cart/all-product`,this.addTokenHeader())
  }

  removeFromcart(id:any){
    return this.http.delete(`${this.serverURL}/cart/remove/${id}`,this.addTokenHeader())
  }
  incrementCartItem(id:any){
    return this.http.get(`${this.serverURL}/cart/increment/${id}`,this.addTokenHeader())
  }
  decrementCartItem(id:any){
    return this.http.get(`${this.serverURL}/cart/decrement/${id}`, this.addTokenHeader())
  }
  emptycart(){
    return this.http.delete(`${this.serverURL}/empty-cart`, this.addTokenHeader())
  }


  

}
