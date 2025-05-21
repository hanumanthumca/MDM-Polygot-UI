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
startDate='';
endDate='';
customerHistorySelectedResult={};
customerHistory: any[]=[];
radioOptions = [
  { label: 'Option A', value: 'A' },
  { label: 'Option B', value: 'B' },
  { label: 'Option C', value: 'C' }
];
options = [
  { label: '2025-05-14 23:15:14', value: '2025-05-14 23:15:14' },
  { label: '2025-05-10 05:30:10', value: '2025-05-10 05:30:10' },
  { label: '2025-05-04 12:12:10', value: '2025-05-04 12:12:10' },
  { label: '2025-05-01 20:30:20', value: '2025-05-01 20:30:20' },

];

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
    this.getCustomerHistoryDataByCustomerFromAPI(finalQueryString);
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

    // options = [
    //   { label: '2025-05-14 23:15:14', value: '2025-05-14 23:15:14' },
    //   { label: '2025-05-10 05:30:10', value: '2025-05-10 05:30:10' },
    //   { label: '2025-05-04 12:12:10', value: '2025-05-04 12:12:10' },
    //   { label: '2025-05-01 20:30:20', value: '2025-05-01 20:30:20' },
    
    // ];
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
      } else {
        historyDataObject[i]['FIRST_NAME_Old'] = historyDataObject[i]['FIRST_NAME'];
        historyDataObject[i]['LAST_NAME_Old'] = historyDataObject[i]['LAST_NAME'];
        historyDataObject[i]['GENDER_CD_Old'] = historyDataObject[i]['GENDER_CD'];
        historyDataObject[i]['BIRTH_DATE_Old'] = historyDataObject[i]['BIRTH_DATE'];
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
