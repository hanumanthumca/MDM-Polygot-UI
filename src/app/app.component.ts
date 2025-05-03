import { Component ,NgModule} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { MdmHeaderComponent } from './components/mdm-header/mdm-header.component';
import { MdmFooterComponent } from './components/mdm-footer/mdm-footer.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { HomeComponent } from './featurs/home/home.component';
import { TaskManagerComponent } from './featurs/task-manager/task-manager.component';
import { QuerisComponent } from './featurs/queris/queris.component';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from "primeng/multiselect"; 
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
//import {NgModule} from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, CommonModule, InputTextModule,MenuModule,MenubarModule,ButtonModule,MdmHeaderComponent,LeftMenuComponent,HomeComponent,QuerisComponent,TaskManagerComponent,SidebarModule,MdmFooterComponent,MultiSelectModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'MDM';

  visible = false;
  visible2 = false;

  showDialog() {
    this.visible = true;
  }

  showDialog2() {
    this.visible2 = true;
  }
}

// import { Component } from '@angular/core';
// import { RouterOutlet, RouterLink } from '@angular/router';
// import { InputTextModule } from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';

// @Component({
//   standalone: true,
//   selector: 'app-root',
//   template:'./app.component.html',
//   imports: [RouterOutlet, RouterLink, InputTextModule, ButtonModule],
// })
// export class AppComponent {
//   myValue = 'test';
// }

