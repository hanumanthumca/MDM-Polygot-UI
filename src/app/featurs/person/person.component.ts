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
import { InputSwitchModule } from 'primeng/inputswitch';
//import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomerViewComponent } from '../customer-view/customer-view.component';
import { PersonViewComponent } from '../person-view/person-view.component';
@Component({
  selector: 'app-person',
  standalone: true,
  imports: [MenuModule, MenubarModule, FormsModule, InputSwitchModule,TooltipModule,SidebarModule, DialogModule,TabMenuModule, TabsModule, MultiSelectModule, TableModule, NgFor,CommonModule, ButtonModule],
  providers:[MessageService,DialogService],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent {
  @ViewChild("myCustTable") myCustTable:Table | undefined;
  selectedColumns = [];
  columns = [];
  addressColumns = [];
  customers: any[]=[];
  groupedTables=[];
  selectedColumnsForAllTables=[];
  rows = 10;
    first = 0;
    totalRecords=0;
  selectedColumnsForAddress = [];
  allselectedColumns = [];
  queryTableDisplay:boolean =false;
  constructor(private mdmService: MDMService,private dialogService:DialogService,
    private messageService:MessageService
  ){}

  ngOnInit() {

    this.groupedTables = [
      {
          label: 'BO_PARTY',
          value: 'BO_PARTY',
          items: [
            { label: 'PARTY_MDM_ID', value: 'p.PARTY_MDM_ID' },
            { label: 'PARTY_ID', value: 'p.PARTY_ID' },
            { label: 'FIRST_NAME', value: 'p.FIRST_NAME' },
            { label: 'MIDDLE_NAME', value: 'p.MIDDLE_NAME' },
            { label: 'LAST_NAME', value: 'p.LAST_NAME' },
            { label: 'FULL_NAME', value: 'p.FULL_NAME' },
            { label: 'BIRTHDATE', value: 'p.BIRTHDATE' },
            { label: 'GENDER_CD', value: 'p.GENDER_CD' }
          ]
      },
      {
          label: 'BO_ADDRESS',
          value: 'BO_ADDRESS',
        items: [

          { label: 'ADDRESS_LINE_1', value: 'a.ADDRESS_LINE_1' },
          { label: 'CITY_NAME', value: 'a.CITY_NAME' },
          { label: 'STATE_CD', value: 'a.STATE_CD' },
          { label: 'COUNTRY_CD', value: 'a.COUNTRY_CD' },
          { label: 'POSTAL_CD', value: 'a.POSTAL_CD' },
        ]
      },
      {
          label: 'BO_PARTY_PHONE',
          value: 'BO_PARTY_PHONE',
          items: [
            { label: 'PHONE_NUM', value: 'ph.PHONE_NUM(Phone Number)' },
            { label: 'PHONE_TYPE_CD', value: 'ph.PHONE_TYPE_CD(Phone Type)' },
           
          ]
      },
      {
        label: 'BO_PARTY_EMAIL',
        value: 'BO_PARTY_EMAIL',
        items: [
          { label: 'EMAIL_ADDR', value: 'pe.EMAIL_ADDR' },
       
         
        ]
    }
  ];
  //   this.tables = [
  //     { name: 'CUSTOMER', value: 'CUSTOMER' },
  //     { name: 'CUSTOMER_ADDRESS', value: 'CUSTOMER_ADDRESS' },
  //     { name: 'CUSTOMER_RELATIONSHIP', value: 'CUSTOMER_RELATIONSHIP' },

  // ];
    this.columns = [
      { field: 'PARTY_MDM_ID', headerVal: 'p.PARTY_MDM_ID' },
      { field: 'PARTY_ID', headerVal: 'p.PARTY_ID' },
      { field: 'FIRST_NAME', headerVal: 'p.FIRST_NAME' },
      { field: 'MIDDLE_NAME', headerVal: 'p.MIDDLE_NAME' },
      { field: 'LAST_NAME', headerVal: 'p.LAST_NAME' },
      { field: 'FULL_NAME', headerVal: 'p.FULL_NAME' },
      { field: 'BIRTHDATE', headerVal: 'p.BIRTHDATE' },
      { field: 'GENDER_CD', headerVal: 'p.GENDER_CD' },
   

    ];

    this.addressColumns = [
      
      { field: 'ADDRESS_LINE_1', headerVal: 'a.ADDRESS_LINE_1' },
      { field: 'CITY_NAME', headerVal: 'a.CITY_NAME' },
      { field: 'STATE_CD', headerVal: 'a.STATE_CD' },
      { field: 'COUNTRY_CD', headerVal: 'a.COUNTRY_CD' },
      { field: 'POSTAL_CD', headerVal: 'a.POSTAL_CD' },

    ];
  }
  pageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
 }

 exportExcel() {
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.customers); // or this.dt.filteredValue
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: "xlsx", type: "array" });
    this.saveAsExcelFile(excelBuffer, "Person Details");
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

 viewPerson(customer:any){
  let id=customer['PARTY_MDM_ID']
  const viewComponentForCust =this.dialogService.open(PersonViewComponent,{

    data:{
    //  custId:id,
      customerObj:customer,
      personmdmId:id
      //roles: this.assignedRolesForUser,
   //  formattedRoles: this.foramttedObjForRoles
    },
    width:"95vw",
    header:"View Person Details",
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
  //this.allselectedColumns=[...this.selectedColumns, ...this.selectedColumnsForAddress];
  this.allselectedColumns=[...this.selectedColumnsForAllTables];
  //let custQueryString = ''; 
  let custQueryString1 = this.selectedColumns.join(',');
  let custAddressQueryString = this.selectedColumnsForAddress.join(',');
 //let custQueryString=custQueryString1+','+custAddressQueryString;
  
  console.log('slected quey is', custAddressQueryString);
 
  let custQueryString = this.selectedColumnsForAllTables.join(',');
  console.log('slected quey is', custQueryString);
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
 // this.submitColumnsForQuery=this.selectedColumnsForAllTables;
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
  let string='person'
  let stringText1=`${string}`;
  let stringText=` where p.PARTY_TYPE= 'Person' AND `;
  let andText=' AND ';
//let finalString=stringText+stringText1+andText
let finalString=stringText;
      let finalQueryString=finalString+custQueryString
   this.getPerosnsDataFromAPI(finalQueryString);
   //
   this.queryTableDisplay=false;
    //  return data;
  
    console.log('cust data',this.customers);
      
  
      
    }

    async getPerosnsDataFromAPI(queryForAPI:string) : Promise<void>{
      //let builtString='where C.AGE=27';
      let builtString=queryForAPI;
      let apiUrl = 'http://localhost:3000/api/personDetails';
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
}
