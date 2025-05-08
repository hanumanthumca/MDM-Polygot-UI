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
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MDMService } from 'src/app/Services/mdm-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from "@angular/common/http";
import { Table } from 'primeng/table';
//import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomerViewComponent } from '../customer-view/customer-view.component';

@Component({
  selector: 'app-queris',
  standalone: true,
  imports: [MenuModule, MenubarModule, FormsModule, Select,SidebarModule, DialogModule,TabMenuModule, TabsModule, MultiSelectModule, TableModule, NgFor,CommonModule, ButtonModule],
  templateUrl: './queris.component.html',
  providers:[MessageService,DialogService],
  styleUrl: './queris.component.scss',
   
})
export class QuerisComponent {
  @ViewChild("myCustTable") myCustTable:Table | undefined;
    rows = 10;
    first = 0;
    totalRecords=0;
  constructor(private mdmService: MDMService,private dialogService:DialogService,
    private messageService:MessageService
  ) {}
  columns = [];
  addressColumns = [];
  tables = [];
  selectedTable='';
  carsData = [];;
  selectedColumns = [];
  selectedColumnsForAddress = [];
  submitColumnsForQuery = [];
  queryTableDisplay:boolean =false;
  customers: any[]=[];
  userName = '';
  custDropDOwnDisplay:boolean =false;
  custAddressDropDOwnDisplay:boolean =false;
  custRelationShipTableDisplay:boolean =false;
  ngOnInit() {
    this.tables = [
      { name: 'CUSTOMER', value: 'CUSTOMER' },
      { name: 'CUSTOMER_ADDRESS', value: 'CUSTOMER_ADDRESS' },
      { name: 'CUSTOMER_RELATIONSHIP', value: 'CUSTOMER_RELATIONSHIP' },

  ];
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

    //this.selectedColumns = this.columns.filter((c,index) => index < 2);


  }
  pageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
 }
 handleTableChange(event){
  console.log('selected table is',this.selectedTable);
  this.customers=[];
  let selectedOne=this.selectedTable;
  if(selectedOne==='CUSTOMER'){
    this.custDropDOwnDisplay=true;
    this.custAddressDropDOwnDisplay=false;
   
  }else if(selectedOne==='CUSTOMER_ADDRESS'){
    this.custDropDOwnDisplay=false;
    this.custAddressDropDOwnDisplay=true;
  }else{

  }

 }

 viewCustomer(id:any){
  const viewComponentForCust =this.dialogService.open(CustomerViewComponent,{

    data:{
      custId:id
    },
    width:"89vw",
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
    },
    width:"89vw",
    header:"Customer Information",
    modal:true,
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
    //let custQueryString = ''; 
    let custQueryString = this.selectedColumns.join(',');
    let custAddressQueryString = this.selectedColumnsForAddress.join(',');
    console.log('slected quey is', custQueryString);
    console.log('slected quey is', custAddressQueryString);
   

  

      if(this.selectedTable==='CUSTOMER'){
        this.submitColumnsForQuery=this.selectedColumns;
      }else{
        this.submitColumnsForQuery=this.selectedColumnsForAddress;
      }

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
   
  //  if(index !=this.selectedColumns.length-1){
    data.forEach((element,index) =>{
      if(index !=this.submitColumnsForQuery.length-1){
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
  // generateQueryData(){

  //   const table = document.getElementById("queryGenerator");
  //   const headers = Array.from(table.querySelectorAll("thead th")).map(th => th.textContent.trim());
  //   const rows = table.querySelectorAll("tbody tr");
  
  //   const data = Array.from(rows).map(row => {
  //     const cells = Array.from(row.children);
  //     const obj = {};
  
     
  //     cells.forEach((cell, i) => {
  //       const input = cell.querySelector("input");
  //       if (input) {
  //         if (input.type === "checkbox") {
  //           obj[headers[i]] = input.checked;
  //         } else {
  //           obj[headers[i]] = input.value.trim();
  //         }
  //       } else {
  //         obj[headers[i]] = cell.textContent.trim();
  //       }
  //     });

  //     cells.forEach((cell, i) => {
  //       const select = cell.querySelector("select");
  //       if (select) {
  //         obj[headers[i]] = select.value;  // Get selected value
  //       } else {
  //         obj[headers[i]] = cell.textContent.trim();
  //       }
  //     });
  
  //     return obj;
  //   });
  //   console.log('query data from generated table is',data);

  //   return data;
  // }
  // generateQueryData(){

  //   const table = document.getElementById("queryGenerator");
  // const headers = Array.from(table.querySelectorAll("thead th")).map(th => th.textContent.trim());
  // const rows = table.querySelectorAll("tbody tr");

  // const data = Array.from(rows).map(row => {
  //   const cells = Array.from(row.querySelectorAll("td"));
  //   const obj = {};
  //   cells.forEach((cell, i) => {
  //     obj[headers[i]] = cell.textContent.trim();
  //   });
  //   return obj;
  // });

  // console.log('query data from generated table is',data);

  // return data;
  // }


  // getColumnsField() {
  //   return this.selectedColumns.map(c => c.field).join(',')
  // }
  // setColumnsDefaultValue() {
  //   this.selectedColumns = this.columns;
  //   this.save();

  // }

  // save() {
  //   localStorage.setItem('selectedColumns', JSON.stringify(this.selectedColumns));
  // }
}
