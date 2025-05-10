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
  userName='';
  password='';
  myProperty

  constructor(private router: Router) {}
  showDialog() {
    this.visible = true;
  }
  
  validateLogin() {
   // this.visible = true;
  
    console.log('login hit');
    if(this.userName==='hanumanth'&& this.password==='hanumanth'){
      this.isLoginVisble=false;
      console.log('login success');
      this.failedLogin=false;
      this.router.navigate(['/home']);
    }else{
      this.isLoginVisble=true;
      this.failedLogin=true;
      console.log('login fail');
      
    }
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
