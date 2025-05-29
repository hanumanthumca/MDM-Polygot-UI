import { Component, NgModule ,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
//import { Menu } from 'primeng/menu';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from "primeng/multiselect";
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MDMService } from 'src/app/Services/mdm-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from "@angular/common/http";
import { Table } from 'primeng/table';
//import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Select } from 'primeng/select';
// import { DialogService } from 'primeng/dynamicdialog';
import { CustomerViewComponent } from '../customer-view/customer-view.component';
@Component({
  selector: 'app-job-trigger',
  standalone: true,
  imports: [MenuModule, MenubarModule, FormsModule, Select,SidebarModule, DialogModule,TabMenuModule, TabsModule, MultiSelectModule, TableModule, NgFor,CommonModule, ButtonModule],
  templateUrl: './job-trigger.component.html',
  providers:[DialogService],
  styleUrl: './job-trigger.component.scss'
})
export class JobTriggerComponent {

  columns = [];
  source = [];
  tables = [];
  jobTypes = [];
 addressColumns = [];
 selectedColumns = [];
 selectedSource = [];
 selectedTable = [];
 selectedJobType = [];
 selectedColumnsForAddress = [];
  constructor(public dynamicDialogRef:DynamicDialogRef, 
     public dynamicDialogConfig:DynamicDialogConfig,
     private dialogService:DialogService,
     private mdmService: MDMService
   ){}
 ngOnInit() {
  this.columns = [
    { field: 'CUSTOMER_ID', headerVal: 'C.CUSTOMER_ID' },
    { field: 'FIRST_NAME', headerVal: 'C.FIRST_NAME' },
    { field: 'LAST_NAME', headerVal: 'C.LAST_NAME' },
    { field: 'EMAIL', headerVal: 'C.EMAIL' },
    { field: 'PHONE', headerVal: 'C.PHONE' },
    { field: 'AGE', headerVal: 'C.AGE' },
    { field: 'GENDER_CD', headerVal: 'C.GENDER_CD' },
    { field: 'BIRTH_DATE', headerVal: 'C.BIRTH_DATE' },
    { field: 'LOYALTY_SCORE', headerVal: 'C.LOYALTY_SCORE' },

  ];

  this.addressColumns = [
    { field: 'CITY', headerVal: 'CA.CITY' },
    { field: 'STATE', headerVal: 'CA.STATE' },
    { field: 'COUNTRY', headerVal: 'CA.COUNTRY' },
    { field: 'ZIP_CODE', headerVal: 'CA.ZIP_CODE' },

  ];
  this.source = [
    { name: 'NETSUITE ', value: 'NETSUITE ' },
    { name: 'ERP', value: 'ERP' },
   ];
   this.tables = [
    { name: 'CUSTOMER', value: 'CUSTOMER' },
    { name: 'CUSTOMER_ADDRESS', value: 'CUSTOMER_ADDRESS' },
    { name: 'CUSTOMER_ADDRESS_BRIDGE', value: 'CUSTOMER_ADDRESS_BRIDGE' },
    { name: 'CUSTOMER_BUS_REL', value: 'CUSTOMER_BUS_REL' },
   ];
   this.jobTypes = [
    
    { name: 'ALL ', value: 'ALL ' },
    { name: 'DATA_INGESTION', value: 'DATA_INGESTION' },
    { name: 'BO-XREF_LOAD', value: 'BO-XREF_LOAD' },
    { name: 'MDM_VALIDATIONS', value: 'MDM_VALIDATIONS' },
    { name: 'MDM_TRUSTSCORE', value: 'MDM_TRUSTSCORE' },
    { name: 'MDM_MATCH-DEDUPE', value: 'MDM_MATCH-DEDUPE' },
    { name: 'MDM_MERGE', value: 'MDM_MERGE' },
    
   ];
 }

 generateData() {
  let finalQueryString='where '
  //this.getCustomerHistoryDataByCustomerFromAPI(finalQueryString);
//  this.getCrossRefernceForCustomers(finalQueryString);
 this.getJobRunStatus(finalQueryString);
 }

 async getJobRunStatus(queryForAPI: string): Promise<void> {
  let builtString = queryForAPI;
  let apiUrl = 'http://localhost:3000/api/runJobs';
  return new Promise((resolve, rejects) => {
    this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
      next: (response: any) => {

        if (response) {
         // this.crossRefernceObjForCustomers = response[0];
        } else {

        }
        resolve();
      },
      error: (error: object) => {
        rejects(error);
      },
      complete: () => {
        //this.customerByCountryResponse=response;
        //this.processHistoryDataForSystemName(this.customerHistory);
          let finalQueryString='where '
        this.getJobRunStatusLog(finalQueryString);
      }
    })
  })

}

async getJobRunStatusLog(queryForAPI: string): Promise<void> {
  let builtString = queryForAPI;
  let apiUrl = 'http://localhost:3000/api/jobsLog';
  return new Promise((resolve, rejects) => {
    this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
      next: (response: any) => {

        if (response) {
         // this.crossRefernceObjForCustomers = response[0];
        } else {

        }
        resolve();
      },
      error: (error: object) => {
        rejects(error);
      },
      complete: () => {
        //this.customerByCountryResponse=response;
        //this.processHistoryDataForSystemName(this.customerHistory);
      }
    })
  })

}

}
