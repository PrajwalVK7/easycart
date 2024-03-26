import { Component } from '@angular/core';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private api:AppService,private router:Router){}

  loginDetails = {
    email:"",
    password:""
  }


  login(){
    const {email,password}=this.loginDetails;
    if(!email||!password){
      alert("Please add complete details")
    }
    else{
      this.api.loginAPI(this.loginDetails).subscribe({
        next:(res:any)=>{
          // console.log(res)
          sessionStorage.setItem("username",res.existingUser.username)
          sessionStorage.setItem("token",res.token)

          this.router.navigateByUrl('')
        },
        error:(res:any)=>{
          alert(res.error)
        }
      })
    }
  }


}
