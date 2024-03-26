import { Component } from '@angular/core';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private api:AppService, private router:Router){}

  registerDetails:any={
    username:"",
    email:"",
    password:""
  }

  registerUser(){
    // console.log(this.registerDetails)
    const {username,email,password} = this.registerDetails;
    if(!username||!email||!password){
      alert("Please complete the details")
    }
    else{
        this.api.registerAPI(this.registerDetails).subscribe({
          next:(res:any)=>{
            alert(res);
            this.router.navigateByUrl('user/login')
            
          },
          error:(err:any)=>{
            console.log(err)
          }
        })
    }
  }

}
