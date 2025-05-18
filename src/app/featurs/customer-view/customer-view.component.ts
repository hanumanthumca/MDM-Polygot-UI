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
  handleClick(value: string) {
    console.log('Clicked radio value:', value);
    this.displayHistoryTable=true;
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
