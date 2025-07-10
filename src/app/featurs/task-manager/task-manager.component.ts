import { Component, NgModule ,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
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
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import { TooltipModule } from 'primeng/tooltip';
//import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomerViewComponent } from '../customer-view/customer-view.component';


@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [MenuModule, MenubarModule, FormsModule, TooltipModule,SidebarModule, DialogModule,TabMenuModule, TabsModule, MultiSelectModule, TableModule, NgFor,CommonModule, ButtonModule],
  providers:[MessageService,DialogService],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent {
    @ViewChild("myCustTable") myCustTable:Table | undefined;
    rows = 10;
    first = 0;
    totalRecords=0;
    constructor(private mdmService: MDMService,private dialogService:DialogService,
        private messageService:MessageService
      ){}
  products: any[];

  cols: any[];

  //_selectedColumns: any[];
 // columns: any[] = [];
 // selectedColumns: any[] = [];
 columns = [];
 addressColumns = [];
 carsData = [];;
 selectedColumns = [];
 selectedColumnsForAddress = [];
 allselectedColumns = [];
 queryTableDisplay:boolean =false;
 customers: any[]=[];
 userName = '';
 assignedRolesForUser=[];
 groupedByColumnsForRoles=[];
  ngOnInit() {
   
    let loggedInUserId=localStorage.getItem('userId');
    let userObj={
      // custId: this.custId,
      //userName:userName,
      userid:loggedInUserId,
       
     };
    
    this.getUserRoles(userObj); 
   // getUserRoles
    this.carsData = [
        { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
        { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
        { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
        { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
        { "brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34" },
        { "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj" },
        { "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr" },
        { "brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34" },
        { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5" },
        { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s" }
      ];
      this.columns = [
        { field: 'CUSTOMER_ID', headerVal: 'C.CUSTOMER_ID' },
        { field: 'CUSTOMER_MDM_ID', headerVal: 'C.CUSTOMER_MDM_ID' },
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
  }
  // @Input() get selectedColumns(): any[] {
  //   return this._selectedColumns;
  // }

  // set selectedColumns(val: any[]) {
  //   //restore original order
  //   this._selectedColumns = this.cols.filter((col) => val.includes(col));
  // }
  pageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
 }
  getColumnsField() {
    return this.selectedColumns.map(c => c.field).join(',')
  }
  setColumnsDefaultValue() {
    this.selectedColumns = this.columns;
    this.save();

  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.customers); // or this.dt.filteredValue
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: "xlsx", type: "array" });
      this.saveAsExcelFile(excelBuffer, "Customer Details");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
   //   saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
      saveAs(data, fileName + "_export" + EXCEL_EXTENSION);
    });
  }
  save() {
    localStorage.setItem('selectedColumns', JSON.stringify(this.selectedColumns));
  }
  get visibleColumns() {
    return this.selectedColumns;
  }

  viewCustomer(id:any){
    const viewComponentForCust =this.dialogService.open(CustomerViewComponent,{
  
      data:{
        custId:id
      },
      width:"95vw",
      header:"View Customer",
      closable:true
    });
    viewComponentForCust.onClose.subscribe((result) =>{
  
    })
   }
   viewCustomerTest(customer:any){
    let id=customer['CUSTOMER_ID']
    const viewComponentForCust =this.dialogService.open(CustomerViewComponent,{
  
      data:{
        custId:id,
        customerObj:customer,
        roles: this.assignedRolesForUser
      },
      width:"95vw",
      header:"View Customer",
      closable:true
    });
    viewComponentForCust.onClose.subscribe((result) =>{
  
    })
   }
    generateData() {
      this.queryTableDisplay=true;
      console.log('slected cust fileds are');
      console.log('slected cust fileds are', this.selectedColumns);
      console.log('slected adrees fileds are', this.selectedColumnsForAddress);
      this.allselectedColumns=[...this.selectedColumns, ...this.selectedColumnsForAddress];
      //let custQueryString = ''; 
      let custQueryString1 = this.selectedColumns.join(',');
      let custAddressQueryString = this.selectedColumnsForAddress.join(',');
     let custQueryString=custQueryString1+','+custAddressQueryString;
      console.log('slected quey is', custQueryString);
      console.log('slected quey is', custAddressQueryString);
     
  
      let objectArrayForColumns =this.selectedColumns.map(item =>({name:item,condition:'',value:''}))
      
      // this.selectedColumns.forEach((element,index) =>{
      //   if(index !=this.selectedColumns.length-1){
      //     custQueryString =custQueryString+`'${element}'`+','
      //   }else{
      //     custQueryString =custQueryString+`'${element}'`
      //   }
      // });
      let logicString ='Select '
      if(this.selectedColumnsForAddress.length >0){
        logicString = logicString+custQueryString+','+custAddressQueryString;
      }else{
        logicString = logicString+custQueryString+' '+'FROM BO_CUSTOMER C';
      }
      console.log('logicString quey is logicString', logicString);
    }
  
    //async generateQueryData():Promise<void>{
       generateQueryData(){
      const table = document.getElementById("queryGenerator");
      const headers = Array.from(table.querySelectorAll("thead th")).map(th => th.textContent.trim());
      const rows = table.querySelectorAll("tbody tr");
    
      const data = Array.from(rows).map(row => {
        const cells = Array.from(row.children);
        const obj = {};
    
        cells.forEach((cell, i) => {
          const input = cell.querySelector("input");
          const select = cell.querySelector("select");
    
          if (input) {
            if (input.type === "checkbox") {
              obj[headers[i]] = input.checked;
            } else {
              obj[headers[i]] = input.value.trim();
            }
          } else if (select) {
            obj[headers[i]] = select.value;
          } else {
            obj[headers[i]] = cell.textContent.trim();
          }
        });
    
        return obj;
      });
      console.log('query data from generated table is',data);
  
     let  custQueryString ='';
     data.forEach((element,index) =>{
      if(index !=this.allselectedColumns.length-1){
        if(element['Name']=== 'C.AGE'){
        custQueryString =custQueryString+element['Name']+'  '+element['Operator']+element['Value'] +' and '
        }else{
          let valueQuery= element['Value'];
          custQueryString =custQueryString+element['Name']+'  '+element['Operator']+`'${valueQuery}'`+' and '
  
        }
    
         }
         else{
          if(element['Name']=== 'C.AGE'){
            custQueryString =custQueryString+element['Name']+'  '+element['Operator']+element['Value'] 
            }else{
              let valueQuery= element['Value'];
              custQueryString =custQueryString+element['Name']+'  '+element['Operator']+`'${valueQuery}'`
    
            }
  
      }
    });
      // data.forEach((element,index) =>{
      //   if(index !=this.allselectedColumns.length-1){
      //     if(element['Name']=== 'C.AGE'){
      //     custQueryString =custQueryString+element['Name']+element['Operator']+element['Value'] +' and '
      //     }else{
      //       let valueQuery= element['Value'];
      //       custQueryString =custQueryString+element['Name']+element['Operator']+`'${valueQuery}'`+' and '
  
      //     }
      
      //      }else{
      //       custQueryString =custQueryString+element['Name']+element['Operator']+element['Value'] 
    
      //   }
      // });
      console.log('Whole query String is  from generated table is',custQueryString);  
  
      let finalQueryString='where '+custQueryString
   this.getCustomerDataFromAPI(finalQueryString);
     
   this.queryTableDisplay=false;
    //  return data;
  
    console.log('cust data',this.customers);
      
  
      
    }
  
    // this.mdmService.getUsers().subscribe((responseData:any) => {
    //   //this.users = data;
    //   if(responseData){
    //     this.customers=responseData;
    //   }
    // resolve();
    // });
   async getCustomerDataFromAPI(queryForAPI:string) : Promise<void>{
    //let builtString='where C.AGE=27';
    let builtString=queryForAPI;
    let apiUrl = 'http://localhost:3000/api/customerDetails';
    return new Promise((resolve,rejects) =>{
      this.mdmService.getRequestForAPI(apiUrl,"?buildQuery="+builtString).subscribe({
        next:(response:any) =>{
          
          if(response){
            this.customers=response;
            this.totalRecords= this.customers.length;
          }else{
  
          }
          resolve();
        },
        error:(error:object) =>{
          rejects(error);
        },
        complete:() =>{
          this.customers=[...this.customers];
          console.log('cust data from resp',this.customers);
          this.totalRecords= this.customers.length;
        }
      })
    })
      
    }

  async getUserRoles(userObj: any): Promise<void> {
    let apiUrl = 'http://localhost:3000/api/getUserRolesForDetails';
    return new Promise((resolve, rejects) => {
      this.mdmService.sendPostRequestToAPI(apiUrl, userObj).subscribe({
        next: (response: any) => {

          if (response) {

            console.log('user roles are', response);
            let rolesFromAPI = response;
            let newArray = [];
            for (var i = 0; i < rolesFromAPI.length; i++) {
              let roleName = 'Data Steward';

              newArray.push(rolesFromAPI[i]['ROLE_ID']);
            }
            console.log('newArray', newArray);
            const resultedRoles = newArray.join(', ');
            console.log('resultedRoles', resultedRoles);

            let custQueryString = "WHERE role_id IN (" + resultedRoles + ")";
            this.getAllUserRoles(custQueryString);
          } else {

          }
          resolve();
        },
        error: (error: object) => {
          rejects(error);
        },
        complete: () => {

        }
      })
    })
  }

    async getAllUserRoles(queryForAPI:string) : Promise<void>{
   
      let builtString = queryForAPI ;
      //   custQueryString
      let apiUrl = 'http://localhost:3000/api/getAllUserRolesByName';
           //let apiUrl = 'http://localhost:3000/api/getAllUserRolesByName';
      return new Promise((resolve,rejects) =>{
        this.mdmService.getRequestForAPI(apiUrl,"?buildQuery=" + builtString).subscribe({
          next:(response:any) =>{
            
            if(response){
             this.assignedRolesForUser=response;
           
            }else{
    
            }
            resolve();
          },
          error:(error:object) =>{
            rejects(error);
          },
          complete:() =>{

            let data=  this.assignedRolesForUser;
            const groupedArray = Object.values(
              data.reduce((acc, item) => {
                const key = item.COLUMN_NAME;
                if (!acc[key]) {
                  acc[key] = [];
                }
                acc[key].push(item);
                return acc;
              }, {})
            );
            
            const groupedByColumn = data.reduce((acc, item) => {
              const key = item.COLUMN_NAME;
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(item);
              return acc;
            }, {});
//use these two values to segragate the fields for user roles
this.groupedByColumnsForRoles=groupedByColumn;
            console.log('groupedByColumn for roles',groupedByColumn);
            console.log('grouped array for roles',groupedArray);
            this.processUserRoles(groupedByColumn);
           // this.users=response;
              //this.customerByC
              // ountryResponse=response;
             // this.processGraphDataForSystemName(this.customerCountBySystemName);
    
              
          }
        })
      })
        
      }

      processUserRoles(groupedByColumn:any){
        let  ageArray = groupedByColumn['AGE'] || [];
        let  custIdArray = groupedByColumn['CUSTOMER_ID'] || [];
        let  custMDMIdArray = groupedByColumn['CUSTOMER_MDM_ID'] || [];
        let  firstNameArray = groupedByColumn['FIRST_NAME'] || [];
        let  lastNameArray = groupedByColumn['LAST_NAME'] || [];
        
        let  birthDateArray = groupedByColumn['BIRTH_DATE'] || [];
        let  emailArray = groupedByColumn['EMAIL'] || [];
        let  phoneArray = groupedByColumn['PHONE'] || [];
        let  loylityArray = groupedByColumn['LOYALTY_SCORE'] || [];
        let  genderArray = groupedByColumn['GENDER_CD'] || [];
        let  countryArray = groupedByColumn['COUNTRY'] || [];
        let  stateArray = groupedByColumn['STATE'] || [];
        let  zipCodeArray = groupedByColumn['ZIP_CODE'] || [];
        console.log('ageArray',ageArray);
        const zipCodePermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        zipCodeArray.forEach(item => {
          if (item.READ_PERMISSION === "true") zipCodePermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") zipCodePermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") zipCodePermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") zipCodePermissionCounts.CREATE_PERMISSION++;
        });

        console.log('zipCodePermissionCounts', zipCodePermissionCounts);
        const statePermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        stateArray.forEach(item => {
          if (item.READ_PERMISSION === "true") statePermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") statePermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") statePermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") statePermissionCounts.CREATE_PERMISSION++;
        });

        console.log('statePermissionCounts', statePermissionCounts);
        const countryPermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        countryArray.forEach(item => {
          if (item.READ_PERMISSION === "true") countryPermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") countryPermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") countryPermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") countryPermissionCounts.CREATE_PERMISSION++;
        });

        console.log('countryPermissionCounts', countryPermissionCounts);
        const genderPermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        genderArray.forEach(item => {
          if (item.READ_PERMISSION === "true") genderPermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") genderPermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") genderPermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") genderPermissionCounts.CREATE_PERMISSION++;
        });

        console.log('genderPermissionCounts', genderPermissionCounts);
        const loylityPermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        loylityArray.forEach(item => {
          if (item.READ_PERMISSION === "true") loylityPermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") loylityPermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") loylityPermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") loylityPermissionCounts.CREATE_PERMISSION++;
        });

        console.log('loylityPermissionCounts', loylityPermissionCounts);
        const phonePermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        phoneArray.forEach(item => {
          if (item.READ_PERMISSION === "true") phonePermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") phonePermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") phonePermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") phonePermissionCounts.CREATE_PERMISSION++;
        });

        console.log('phonePermissionCounts', phonePermissionCounts);

        const emailPermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        emailArray.forEach(item => {
          if (item.READ_PERMISSION === "true") emailPermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") emailPermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") emailPermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") emailPermissionCounts.CREATE_PERMISSION++;
        });

        console.log('emailPermissionCounts', emailPermissionCounts);




        const birthDatePermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        birthDateArray.forEach(item => {
          if (item.READ_PERMISSION === "true") birthDatePermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") birthDatePermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") birthDatePermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") birthDatePermissionCounts.CREATE_PERMISSION++;
        });

        console.log('birthDatePermissionCounts', birthDatePermissionCounts);

        const agePermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        ageArray.forEach(item => {
          if (item.READ_PERMISSION === "true") agePermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") agePermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") agePermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") agePermissionCounts.CREATE_PERMISSION++;
        });

        console.log('agePermissionCounts  counts are*** ', agePermissionCounts);

        const custIdPermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        custIdArray.forEach(item => {
          if (item.READ_PERMISSION === "true") custIdPermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") custIdPermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") custIdPermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") custIdPermissionCounts.CREATE_PERMISSION++;
        });

        console.log('custIdPermissionCounts', custIdPermissionCounts);
        const custMDMIdPermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        custMDMIdArray.forEach(item => {
          if (item.READ_PERMISSION === "true") custMDMIdPermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") custMDMIdPermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") custMDMIdPermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") custMDMIdPermissionCounts.CREATE_PERMISSION++;
        });

        console.log('custMDMIdPermissionCounts', custIdPermissionCounts);

        const firstNamePermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        firstNameArray.forEach(item => {
          if (item.READ_PERMISSION === "true") firstNamePermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") firstNamePermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") firstNamePermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") firstNamePermissionCounts.CREATE_PERMISSION++;
        });

        console.log('firstNamePermissionCounts', firstNamePermissionCounts);
        const lastNamePermissionCounts = {
          READ_PERMISSION: 0,
          UPDATE_PERMISSION: 0,
          DELETE_PERMISSION: 0,
          CREATE_PERMISSION: 0
        };

        lastNameArray.forEach(item => {
          if (item.READ_PERMISSION === "true") lastNamePermissionCounts.READ_PERMISSION++;
          if (item.UPDATE_PERMISSION === "true") lastNamePermissionCounts.UPDATE_PERMISSION++;
          if (item.DELETE_PERMISSION === "true") lastNamePermissionCounts.DELETE_PERMISSION++;
          if (item.CREATE_PERMISSION === "true") lastNamePermissionCounts.CREATE_PERMISSION++;
        });

        console.log('lastNamePermissionCounts', lastNamePermissionCounts);

      }
}