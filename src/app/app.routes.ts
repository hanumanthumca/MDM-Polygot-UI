import { Routes } from '@angular/router';
import { HomeComponent } from './featurs/home/home.component';
import { TaskManagerComponent } from './featurs/task-manager/task-manager.component';
import { UsersComponent } from './featurs/users/users.component';
import { QuerisComponent } from './featurs/queris/queris.component';
import { JobTriggerComponent } from './featurs/job-trigger/job-trigger.component';
import { DashboardsComponent } from './featurs/dashboards/dashboards.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'taskManager',component:TaskManagerComponent},
    {path:'query',component:QuerisComponent},
    {path:'scheduleJobs',component:JobTriggerComponent},
    {path:'dashboards',component:DashboardsComponent},
    {path:'users',component:UsersComponent},
  
  //  {path:'',redirectTo:'home',pathMatch:'full'}
];
