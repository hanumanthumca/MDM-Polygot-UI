import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule, Routes } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MDMService } from 'src/app/Services/mdm-service';
@Component({
  selector: 'app-mdm-header',
  standalone: true,
 imports: [CommonModule,RouterOutlet, FormsModule,DialogModule, InputTextModule,MenuModule,MenubarModule,ButtonModule,RouterModule],
  templateUrl: './mdm-header.component.html',
  styleUrl: './mdm-header.component.scss'
})
export class MdmHeaderComponent {
  visible = false;
  visible2 = false;
  failedLogin = false;
  isLoginVisble=true;
  createUserTableDisplay=false;
  userName='';
  password='';
  loggedInUserName=''
  myProperty

  constructor(private router: Router,private mdmService: MDMService) {}
  showDialog() {
    this.visible = true;
  }
  createNewUser(){
    this.createUserTableDisplay=true;
  }
  validateLogOut(){
    //this.isLoginVisble=true;
    this.loggedInUserName='';
    localStorage.setItem('isLoggedIN',JSON.stringify(false));
    let loginValue=JSON.parse(localStorage.getItem('isLoggedIN'));
      if(loginValue){
       this.isLoginVisble=false;
      }else{
        this.isLoginVisble=true;
      }
 
    this.router.navigate(['/']);
  }

  validateLogin() {
   // this.visible = true;
   //getUserLoginForDetails
  localStorage.setItem('isLoggedIN',JSON.stringify(false));

    console.log('login hit');

    let permissionObjForDel={
      // custId: this.custId,
      //userName:userName,
      userName:this.userName,
      password:this.password
       
     };
    
    this.getLogin(permissionObjForDel); 

   
  }

  async getLogin(userObj:any) : Promise<void>{
    let apiUrl = 'http://localhost:3000/api/getUserLoginForDetails';


    return new Promise((resolve, rejects) => {
      this.mdmService.sendPostRequestToAPI(apiUrl, userObj).subscribe({
        next: (response: any) => {

          if (response) {
            let responseuserObj = response[0];
            console.log('response ', response[0]);
            console.log('response api', responseuserObj);
            //if(this.userName==='hanumanth'&& this.password==='hanumanth'){
            if (responseuserObj) {
              this.loggedInUserName = responseuserObj['FIRSTNAME'];
              localStorage.setItem('isLoggedIN', JSON.stringify(true));
              let loginValue = JSON.parse(localStorage.getItem('isLoggedIN'));
              if (loginValue) {
                this.isLoginVisble = false;
              } else {
                this.isLoginVisble = true;
              }


              console.log('login success');
              this.failedLogin = false;
              this.router.navigate(['/home']);
            } else {
              localStorage.setItem('isLoggedIN', JSON.stringify(false));
              let loginValue = JSON.parse(localStorage.getItem('isLoggedIN'));
              this.loggedInUserName = '';
              if (loginValue) {
                this.isLoginVisble = false;
              } else {
                this.isLoginVisble = true;
              }

              this.failedLogin = true;
              console.log('login fail');

            }

          
          //  }
           
          }else{
  
          }
          resolve();
        },
        error:(error:object) =>{
          rejects(error);
        },
        complete:() =>{
        
        }
      })
    })
  }
  showDialog2() {
    this.visible2 = true;
  }

  navigateToHome() {
    this.visible2 = true;
  }

  navigateToTaskManger() {
    this.visible2 = true;
  }

  navigateToQueries() {
    this.visible2 = true;
  }
 
}
