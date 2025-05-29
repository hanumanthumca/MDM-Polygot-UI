import { Routes } from '@angular/router';
import { HomeComponent } from './featurs/home/home.component';
import { TaskManagerComponent } from './featurs/task-manager/task-manager.component';
import { QuerisComponent } from './featurs/queris/queris.component';
import { JobTriggerComponent } from './featurs/job-trigger/job-trigger.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'taskManager',component:TaskManagerComponent},
    {path:'query',component:QuerisComponent},
    {path:'scheduleJobs',component:JobTriggerComponent}
  //  {path:'',redirectTo:'home',pathMatch:'full'}
];
