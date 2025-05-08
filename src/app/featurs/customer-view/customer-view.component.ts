import { Component, OnInit  } from '@angular/core';
import { DialogService, DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService,ConfirmationService } from 'primeng/api';
import { PanelModule } from "primeng/panel";
import { ButtonModule } from 'primeng/button';
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
@Component({
  selector: 'app-customer-view',
  standalone: true,

  imports: [FormsModule,PanelModule,MenuModule,MenubarModule,SidebarModule,TabMenuModule,TabsModule,TableModule,MultiSelectModule,ButtonModule],

  templateUrl: './customer-view.component.html',
  providers:[DialogService],
  styleUrl: './customer-view.component.scss',
  
})
export class CustomerViewComponent  {
custId='';
customerResult={};
custFirstName='';
custLastName='';
custEmail='';
custAge='';
custGender='';
custPhone='';
loyolScore='';
// custFirstName='';
// custFirstName='';
// custFirstName='';
  constructor(public dynamicDialogRef:DynamicDialogRef, 
    public dynamicDialogConfig:DynamicDialogConfig,
    private dialogService:DialogService,
    private mdmService: MDMService
  ){}
  ngOnInit() {
    this.custId=this.dynamicDialogConfig.data['custId']; 
    this.customerResult=this.dynamicDialogConfig.data['customerObj'];
    console.log('this config data is',this.dynamicDialogConfig.data['custId']);
    this.custFirstName=this.customerResult['FIRST_NAME'];
    this.custLastName=this.customerResult['LAST_NAME'];;
    this.custEmail=this.customerResult['EMAIL'];
    this.custPhone=this.customerResult['PHONE'];

    this.custAge=this.customerResult['AGE'];;
    this.custGender=this.customerResult['GENDER_CD'];
    this.loyolScore=this.customerResult['LOYALTY_SCORE'];

    console.log('this config data is',this.dynamicDialogConfig.data['custId']);
  }
  updateRecord(){
    let query='ddd';
    this.updateFromAPI(query);
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

  return new Promise((resolve,rejects) =>{
    this.mdmService.sendPostRequestToAPI(apiUrl,custObject).subscribe({
      next:(response:any) =>{
        
        if(response){
          // this.customers=response;
          // this.totalRecords= this.customers.length;
        }else{

        }
        resolve();
      },
      error:(error:object) =>{
        rejects(error);
      },
      complete:() =>{
        // this.customers=[...this.customers];
        // console.log('cust data from resp',this.customers);
        // this.totalRecords= this.customers.length;
      }
    })
  })
    
  }
}
