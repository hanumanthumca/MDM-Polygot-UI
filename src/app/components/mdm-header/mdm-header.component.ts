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

@Component({
  selector: 'app-mdm-header',
  standalone: true,
 imports: [RouterOutlet, FormsModule,DialogModule, InputTextModule,MenuModule,MenubarModule,ButtonModule,RouterModule],
  templateUrl: './mdm-header.component.html',
  styleUrl: './mdm-header.component.scss'
})
export class MdmHeaderComponent {
  visible = false;
  visible2 = false;
  userName='';
  password='';
  myProperty
  showDialog() {
    this.visible = true;
  }
  
  validateLogin() {
   // this.visible = true;
    console.log('login hit');
    if(this.userName==='hanumanth'&& this.password==='hanumanth'){
      console.log('login success');
    }else{
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
