import { Component, ViewChild } from '@angular/core';

import {MenuItem, MessageService} from 'primeng/api';
//import { Menu } from 'primeng/menu';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from "primeng/multiselect"; 
import { InputTextModule } from 'primeng/inputtext';
import { Table } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { MDMService } from 'src/app/Services/mdm-service';

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [MenuModule,MenubarModule,SidebarModule,ChartModule,TabMenuModule,TabsModule,TableModule,MultiSelectModule],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent {

}
