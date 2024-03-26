import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
constructor(private router:Router, private api:AppService ){}
  username: any = ""
  wishlistCount:number=0;
  cartCount:number=0;

  ngOnInit(): void {
    if (sessionStorage.getItem("username")) {
      this.username = sessionStorage.getItem("username")
      this.api.wishlistCount.subscribe((res:any)=>{
        this.wishlistCount=res
      })

      this.api.cartCount.subscribe((res:any)=>{
        this.cartCount=res;
      })
    }
    else{
      this.username=""
    }
  }
  logout(){
    sessionStorage.removeItem("username");
    sessionStorage.removeItem('token')
    this.username=""
    this.router.navigateByUrl('')
  }


}
