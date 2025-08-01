import { Routes } from '@angular/router';
import { HomeComponent } from './featurs/home/home.component';
import { TaskManagerComponent } from './featurs/task-manager/task-manager.component';
import { UsersComponent } from './featurs/users/users.component';
import { RolesComponent } from './featurs/roles/roles.component';
import { TreebasicdemoComponent } from './featurs/treebasicdemo/treebasicdemo.component';
import { QuerisComponent } from './featurs/queris/queris.component';
import { JobTriggerComponent } from './featurs/job-trigger/job-trigger.component';
import { DashboardsComponent } from './featurs/dashboards/dashboards.component';
import { PersonComponent } from './featurs/person/person.component';
import { TaskComponent } from './featurs/task/task.component';
export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'taskManager',component:TaskManagerComponent},
    {path:'personSearch',component:PersonComponent},
    {path:'tasks',component:TaskComponent},
    {path:'query',component:QuerisComponent},
    {path:'scheduleJobs',component:JobTriggerComponent},
    {path:'dashboards',component:DashboardsComponent},
    {path:'users',component:UsersComponent},
    {path:'roles',component:RolesComponent},
    {path:'rolesTree',component:TreebasicdemoComponent},

  
  //  {path:'',redirectTo:'home',pathMatch:'full'}
];
