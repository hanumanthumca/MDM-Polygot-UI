import { Component, OnInit  } from '@angular/core';
import { DialogService, DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService,ConfirmationService } from 'primeng/api';
import { PanelModule } from "primeng/panel";
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
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
import { MDMService } from 'src/app/Services/mdm-service';
import { FormsModule } from '@angular/forms';
import { RadioButton } from 'primeng/radiobutton';
import { Select } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-customer-view',
  standalone: true,

  imports: [FormsModule,PanelModule,MenuModule,CommonModule,Select,RadioButtonModule,RadioButton,MenubarModule,SidebarModule,TabMenuModule,TabsModule,TableModule,MultiSelectModule,ButtonModule],

  templateUrl: './customer-view.component.html',
  providers:[DialogService],
  styleUrl: './customer-view.component.scss',
  
})
export class CustomerViewComponent  {
  formGroup!: FormGroup;

custId='';
customerResult={};
custFirstName='';
custLastName='';
custEmail='';
custAge='';
custGender='';
custCountry='';
custPhone='';
loyolScore='';
showSuccess = true;
fadeOut = false;
countries=[];
ingredient='Cheese';
selectedOption: string = '';
displayHistoryTable=false;
noHistoryData=false;
startDate='';
endDate='';
customerHistorySelectedResult={};
erpSourceObjectForTableData={};
netSuiteObjectForTableData={};
crossRefernceObjForCustomers=[];
crossRefernceXReferenceObjForCustomers=[];
crossRefernceTrustObjForCustomers=[];
customerHistory: any[]=[];
  erpSourceTrustObjectsFirstName = {};
  netSuiteSourceTrustObjectsFirstName = {};
  erpSourceTrustObjectsLastName = {};
  netSuiteSourceTrustObjectsLastName = {};
  erpSourceTrustObjectsGender = {};
  netSuiteSourceTrustObjectsGender = {};
  erpSourceTrustObjectsBirthDate = {};
  netSuiteSourceTrustObjectsBirthDate = {};
  erpSourceTrustObjectsAge = {};
  netSuiteSourceTrustObjectsAge = {};
  erpSourceTrustObjectsPhone = {};
  netSuiteSourceTrustObjectsPhone = {};
  erpSourceTrustObjectsEMail = {};
  netSuiteSourceTrustObjectsEMail = {};
  erpSourceTrustObjectsloyolScore = {};
  netSuiteSourceTrustObjectsloyolScore = {};
  radioOptions = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
    { label: 'Option C', value: 'C' }
  ];
options = [];

radioCategories: any[] =[];
// custFirstName='';
// custFirstName='';
// custFirstName='';
  constructor(public dynamicDialogRef:DynamicDialogRef, 
    public dynamicDialogConfig:DynamicDialogConfig,
    private dialogService:DialogService,
    private mdmService: MDMService
  ){}
  ngOnInit() {

    let finalQueryString='where '
    //this.getCustomerHistoryDataByCustomerFromAPI(finalQueryString);
    this.getCrossRefernceForCustomers(finalQueryString)
    this.getCrossRefernceXReferenceForCustomers(finalQueryString)
    this.getCrossRefernceTrustForCustomers(finalQueryString);
    this.formGroup = new FormGroup({
      selectedCategory: new FormControl()
  });
    this.countries = [
      { name: 'USA', value: 'USA' },
      { name: 'Canada', value: 'Canada' },
      { name: 'UK', value: 'UK' },

  ];
  this.radioCategories = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' }
];


    setTimeout(() => {
      this.fadeOut = true;
    }, 5000);
    this.custId=this.dynamicDialogConfig.data['custId']; 
    this.customerResult=this.dynamicDialogConfig.data['customerObj'];
    console.log('this config data is',this.dynamicDialogConfig.data['custId']);
    this.custFirstName=this.customerResult['FIRST_NAME'];
    this.custLastName=this.customerResult['LAST_NAME'];
    this.custEmail=this.customerResult['EMAIL'];
    this.custPhone=this.customerResult['PHONE'];

    this.custAge=this.customerResult['AGE'];;
    this.custGender=this.customerResult['GENDER_CD'];
    this.custCountry=this.customerResult['COUNTRY'];
   // this.custCountry='UK';
    
    this.loyolScore=this.customerResult['LOYALTY_SCORE'];

    console.log('this config data is',this.dynamicDialogConfig.data['custId']);
  }
  updateRecord(){
    let query='ddd';
    this.updateFromAPI(query);
  }
  
  async getCrossRefernceTrustForCustomers(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/crossRefernceTrustForCustomers';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
           this.crossRefernceTrustObjForCustomers = response;
          } else {

          }
          resolve();
        },
        error: (error: object) => {
          rejects(error);
        },
        complete: () => {
          //this.customerByCountryResponse=response;
          this.processTrustDataForCustomers(this.crossRefernceTrustObjForCustomers);
        }
      })
    })

  }

  async getCrossRefernceXReferenceForCustomers(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/crossRefernceXReferenceForCustomers';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
           this.crossRefernceXReferenceObjForCustomers = response;
          } else {

          }
          resolve();
        },
        error: (error: object) => {
          rejects(error);
        },
        complete: () => {
          //this.customerByCountryResponse=response;
          this.processXReferenceForCustomers(this.crossRefernceXReferenceObjForCustomers);
        }
      })
    })

  }

  processTrustDataForCustomers(respose: any) {
    let resposeDataForTrust = respose;
    
    let erpTrustArray = [];
    let netSuiteTrustArray = [];
    for (let i = 0; i < resposeDataForTrust.length; i++) {
      if (resposeDataForTrust[i]['SOURCE_SYSTEM'] === 'ERP') {
        erpTrustArray.push(resposeDataForTrust[i]);
      }
      if (resposeDataForTrust[i]['SOURCE_SYSTEM'] === 'NETSUITE') {
        netSuiteTrustArray.push(resposeDataForTrust[i]);
      }

    }

    this.erpSourceTrustObjectsFirstName = erpTrustArray.find(item => item['COLUMN_NAME'] === 'FIRST_NAME');
    this.netSuiteSourceTrustObjectsFirstName = netSuiteTrustArray.find(item => item['COLUMN_NAME'] === 'FIRST_NAME');


    this.erpSourceTrustObjectsLastName = erpTrustArray.find(item => item['COLUMN_NAME'] === 'LAST_NAME');
    this.netSuiteSourceTrustObjectsLastName = netSuiteTrustArray.find(item => item['COLUMN_NAME'] === 'LAST_NAME');

    this.erpSourceTrustObjectsGender = erpTrustArray.find(item => item['COLUMN_NAME'] === 'GENDER_CD');
    this.netSuiteSourceTrustObjectsGender = netSuiteTrustArray.find(item => item['COLUMN_NAME'] === 'GENDER_CD');


    this.erpSourceTrustObjectsBirthDate = erpTrustArray.find(item => item['COLUMN_NAME'] === 'BIRTH_DATE');
    this.netSuiteSourceTrustObjectsBirthDate = netSuiteTrustArray.find(item => item['COLUMN_NAME'] === 'BIRTH_DATE');


    this.erpSourceTrustObjectsPhone = erpTrustArray.find(item => item['COLUMN_NAME'] === 'PHONE');
    this.netSuiteSourceTrustObjectsPhone = netSuiteTrustArray.find(item => item['COLUMN_NAME'] === 'PHONE');

    this.erpSourceTrustObjectsEMail = erpTrustArray.find(item => item['COLUMN_NAME'] === 'EMAIL');
    this.netSuiteSourceTrustObjectsEMail = netSuiteTrustArray.find(item => item['COLUMN_NAME'] === 'EMAIL');

    this.erpSourceTrustObjectsloyolScore = erpTrustArray.find(item => item['COLUMN_NAME'] === 'LOYALTY_SCOREAIL');
    this.netSuiteSourceTrustObjectsloyolScore = netSuiteTrustArray.find(item => item['COLUMN_NAME'] === 'LOYALTY_SCORE');

    this.erpSourceTrustObjectsAge = erpTrustArray.find(item => item['COLUMN_NAME'] === 'AGE');
    this.netSuiteSourceTrustObjectsAge = netSuiteTrustArray.find(item => item['COLUMN_NAME'] === 'AGE');


  }
  processXReferenceForCustomers(respose: any) {
    let resposeData=respose;

    const uniqueSourceNames=[... new Set(resposeData.map(item =>item['SRC_SYSTEM_NAME']))];
    let  erpSourceObject = resposeData.find(item => item['SRC_SYSTEM_NAME'] === 'ERP');
    let  netSuiteSourceObject = resposeData.find(item => item['SRC_SYSTEM_NAME'] === 'NETSUITE');

    this.erpSourceObjectForTableData=erpSourceObject;
    this.netSuiteObjectForTableData=netSuiteSourceObject;

    console.log('hello log', this.erpSourceObjectForTableData);
    // let historyDats = resposeData.map(item => item['HIST_CREATE_DATE']);
    // console.log('history dates are',historyDats);
    // this.options=[];
    // let historyDates=[];
    // historyDats.forEach(function(date) {
    //   console.log(date);
    //   let dateObj={
    //     label: date,
    //     value: date, 
        
    // }
    // historyDates.push(dateObj);
    // });
    // this.options=historyDates;

    // // options = [
    // //   { label: '2025-05-14 23:15:14', value: '2025-05-14 23:15:14' },
    // //   { label: '2025-05-10 05:30:10', value: '2025-05-10 05:30:10' },
    // //   { label: '2025-05-04 12:12:10', value: '2025-05-04 12:12:10' },
    // //   { label: '2025-05-01 20:30:20', value: '2025-05-01 20:30:20' },
    
    // // ];
  }
  async getCrossRefernceForCustomers(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/crossRefernceForCustomers';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.crossRefernceObjForCustomers = response[0];
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
  async getCustomerHistoryDataByCustomerFromAPI(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/historyDataForCustomers';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.customerHistory = response;
          } else {

          }
          resolve();
        },
        error: (error: object) => {
          rejects(error);
        },
        complete: () => {
          //this.customerByCountryResponse=response;
          this.processHistoryDataForSystemName(this.customerHistory);
        }
      })
    })

  }
  
  processHistoryDataForSystemName(respose: any) {
    let resposeData=respose;
    let historyDats = resposeData.map(item => item['HIST_CREATE_DATE']);
    console.log('history dates are',historyDats);
    this.options=[];
    let historyDates=[];
    historyDats.forEach(function(date) {
      console.log(date);
      let dateObj={
        label: date,
        value: date, 
        
    }
    historyDates.push(dateObj);
    });
    this.options=historyDates;
    if (this.options.length > 0) {
      this.noHistoryData=true;
    } else {
      this.noHistoryData=false;
    }
   
  }

  getHistoryDetails() {
    let  custHistoryQueryString ='';
    let startTime='00:00:01';
    let endTime='23:59:59';
    let startDate=this.startDate;
    let endDate=this.endDate;

    // let startDate='2025-05-15';
    // let endDate='2025-05-20';
     let timestampStart = `${startDate} ${startTime}`
      let timestampEnd = `${endDate} ${endTime}`
   // custHistoryQueryString= ' WHERE HIST_CREATE_DATE BETWEEN TO_TIMESTAMP_NTZ ('+timestampStart+') AND TO_TIMESTAMP_NTZ ('+timestampEnd+ ') AND CUSTOMER_MDM_ID =769 ORDER BY HIST_CREATE_DATE desc;'
    custHistoryQueryString= `WHERE HIST_CREATE_DATE BETWEEN '${startDate}' AND '${endDate}' and  CUSTOMER_MDM_ID =769 ORDER BY HIST_CREATE_DATE desc `;
     
    
    this.getCustomerHistoryDataByCustomerFromAPI(custHistoryQueryString);
  
  }
  handleClick(value: string) {
    console.log('Clicked radio value:', value);
    this.displayHistoryTable=true;
    let historyDataObject:any[]=[];
     historyDataObject=this.customerHistory;
    //@ts-ignore
   // historyDataObject.sort((a, b) => new Date(a['HIST_CREATE_DATE']) - new Date(b['HIST_CREATE_DATE']));
   //@ts-ignore  
    historyDataObject.sort((a, b) => new Date(b['HIST_CREATE_DATE']) - new Date(a['HIST_CREATE_DATE']));

 //   events.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    for (let i = 0; i < historyDataObject.length; i++) {

      if (i + 1 < historyDataObject.length) {
        historyDataObject[i]['FIRST_NAME_Old'] = historyDataObject[i + 1]['FIRST_NAME'];
        historyDataObject[i]['LAST_NAME_Old'] = historyDataObject[i + 1]['LAST_NAME'];
        historyDataObject[i]['GENDER_CD_Old'] = historyDataObject[i + 1]['GENDER_CD'];
        historyDataObject[i]['BIRTH_DATE_Old'] = historyDataObject[i + 1]['BIRTH_DATE'];
        historyDataObject[i]['AGE_Old'] = historyDataObject[i + 1]['AGE'];
        historyDataObject[i]['EMAIL_Old'] = historyDataObject[i + 1]['EMAIL'];
        historyDataObject[i]['LOYALTY_SCORE_Old'] = historyDataObject[i + 1]['LOYALTY_SCORE'];
        historyDataObject[i]['PHONE_Old'] = historyDataObject[i + 1]['PHONE'];
      } else {
        historyDataObject[i]['FIRST_NAME_Old'] = historyDataObject[i]['FIRST_NAME'];
        historyDataObject[i]['LAST_NAME_Old'] = historyDataObject[i]['LAST_NAME'];
        historyDataObject[i]['GENDER_CD_Old'] = historyDataObject[i]['GENDER_CD'];
        historyDataObject[i]['BIRTH_DATE_Old'] = historyDataObject[i]['BIRTH_DATE'];
        historyDataObject[i]['AGE_Old'] = historyDataObject[i]['AGE'];
        historyDataObject[i]['EMAIL_Old'] = historyDataObject[i]['EMAIL'];
        historyDataObject[i]['LOYALTY_SCORE_Old'] = historyDataObject[i]['LOYALTY_SCORE'];
        historyDataObject[i]['PHONE_Old'] = historyDataObject[i]['PHONE'];
      }
    }

    console.log('latest data is', historyDataObject);
    let resultObj = historyDataObject.find(p => p['HIST_CREATE_DATE'] === value);
    this.customerHistorySelectedResult = resultObj;
    if (this.customerHistorySelectedResult['LAST_NAME_Old'] === this.customerHistorySelectedResult['LAST_NAME']) {
      this.customerHistorySelectedResult['last_name_match'] = true;
    }
    if (this.customerHistorySelectedResult['LAST_NAME_Old'] !== this.customerHistorySelectedResult['LAST_NAME']) {
      this.customerHistorySelectedResult['last_name_match'] = false;
    }

    if (this.customerHistorySelectedResult['FIRST_NAME_Old'] === this.customerHistorySelectedResult['FIRST_NAME']) {
      this.customerHistorySelectedResult['first_name_match'] = true;
    }
    if (this.customerHistorySelectedResult['FIRST_NAME_Old'] !== this.customerHistorySelectedResult['FIRST_NAME']) {
      this.customerHistorySelectedResult['first_name_match'] = false;
    }

    if (this.customerHistorySelectedResult['GENDER_CD_Old'] === this.customerHistorySelectedResult['GENDER_CD']) {
      this.customerHistorySelectedResult['gender_match'] = true;
    }
    if (this.customerHistorySelectedResult['GENDER_CD_Old'] !== this.customerHistorySelectedResult['GENDER_CD']) {
      this.customerHistorySelectedResult['gender_match'] = false;
    }

    if (this.customerHistorySelectedResult['BIRTH_DATE_Old'] === this.customerHistorySelectedResult['BIRTH_DATE']) {
      this.customerHistorySelectedResult['birthdate_match'] = true;
    }
    if (this.customerHistorySelectedResult['BIRTH_DATE_Old'] !== this.customerHistorySelectedResult['BIRTH_DATE']) {
      this.customerHistorySelectedResult['birthdate_match'] = false;
    }

    if (this.customerHistorySelectedResult['PHONE_Old'] === this.customerHistorySelectedResult['PHONE']) {
      this.customerHistorySelectedResult['phone_match'] = true;
    }
    if (this.customerHistorySelectedResult['PHONE_Old'] !== this.customerHistorySelectedResult['PHONE']) {
      this.customerHistorySelectedResult['phone_match'] = false;
    }

    if (this.customerHistorySelectedResult['EMAIL_Old'] === this.customerHistorySelectedResult['EMAIL']) {
      this.customerHistorySelectedResult['email_match'] = true;
    }
    if (this.customerHistorySelectedResult['EMAIL_Old'] !== this.customerHistorySelectedResult['EMAIL']) {
      this.customerHistorySelectedResult['email_match'] = false;
    }

    if (this.customerHistorySelectedResult['AGE_Old'] === this.customerHistorySelectedResult['AGE']) {
      this.customerHistorySelectedResult['age_match'] = true;
    }
    if (this.customerHistorySelectedResult['AGE_Old'] !== this.customerHistorySelectedResult['AGE']) {
      this.customerHistorySelectedResult['age_match'] = false;
    }

    if (this.customerHistorySelectedResult['LOYALTY_SCORE_Old'] === this.customerHistorySelectedResult['LOYALTY_SCORE']) {
      this.customerHistorySelectedResult['loyolity_match'] = true;
    }
    if (this.customerHistorySelectedResult['LOYALTY_SCORE_Old'] !== this.customerHistorySelectedResult['LOYALTY_SCORE']) {
      this.customerHistorySelectedResult['loyolity_match'] = false;
    }


  console.log('customerHistorySelectedResult :', this.customerHistorySelectedResult);
    // Add any custom logic here
  }
 async updateFromAPI(queryForAPI:string) : Promise<void>{
  //let builtString='where C.AGE=27';
  let builtString=queryForAPI;
  let apiUrl = 'http://localhost:3000/api/updateDetails';

  let custObject={
    custId: this.custId,
    custFirstName: this.custFirstName,
    custLastName:this.custLastName,
    custEmail:this.custEmail,
    custPhone:this.custPhone,
    custAge: this.custAge,
    custGender:this.custGender,
    loyolScore:this.loyolScore
  };
  this.showSuccess=true;
  return new Promise((resolve,rejects) =>{
    this.mdmService.sendPostRequestToAPI(apiUrl,custObject).subscribe({
      next:(response:any) =>{
        
        if(response){
          // this.customers=response;
          // this.totalRecords= this.customers.length;
         // this.showSuccess=true;
        }else{

        }
        resolve();
      },
      error:(error:object) =>{
        rejects(error);
      },
      complete:() =>{
       // this.showSuccess=true;
        // this.customers=[...this.customers];
        // console.log('cust data from resp',this.customers);
        // this.totalRecords= this.customers.length;
      }
    })
  })
    
  }
}
