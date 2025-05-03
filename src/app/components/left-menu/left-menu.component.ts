import { Component } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
//import { Menu } from 'primeng/menu';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [MenuModule,SidebarModule],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {
  items: MenuItem[];
  ngOnInit() {
  this.items = [{
    label: 'Options',
    items: [{
        label: 'Task',
        icon: 'pi pi-refresh',
        routerLink:'taskManager',
        command: () => {
          //  this.update();
        }
    },
    {
        label: 'Home',
        icon: 'pi pi-times',
        routerLink:'home',
        command: () => {
            //this.delete();
        }
    }
    ]},
    {
        label: 'Navigate',
        items: [{
            label: 'Angular Website',
            icon: 'pi pi-external-link',
            url: 'http://angular.io'
        },
        {
            label: 'Router',
            icon: 'pi pi-upload'
        }
    ]}
];
  }
}
