import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signupUsers: any[] = [];
  signupObj:any = {

    username: '',
    email: '',
    password: ''
  };
  loginObj:any = {

    email: '',
    password: ''

  };


  constructor(private router: Router){}
  ngOnInit(): void{
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }
  OnSignup() {
    if(this.signupObj.username != "" && this.signupObj.email != "" && this.signupObj.password != ""){

      this.signupUsers.push(this.signupObj);
      localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
      this.signupObj = {
        username: '',
        email: '',
        password: ''
      };
    }
  }
  OnLogin(){
    const isUserExist = this.signupUsers.find( m => m.email == this.loginObj.email && m.password ==this.loginObj.password);
    if(isUserExist != undefined){

      this.router.navigateByUrl('/signup');
    }
    else{
      alert('Wrong credentials');
    }
  }
}
