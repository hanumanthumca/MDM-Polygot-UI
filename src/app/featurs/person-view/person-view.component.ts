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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-person-view',
  standalone: true,
  imports: [FormsModule,PanelModule,MenuModule,CheckboxModule,DialogModule,InputSwitchModule,CommonModule,ProgressSpinnerModule,Select,RadioButtonModule,RadioButton,MenubarModule,SidebarModule,TabMenuModule,TabsModule,TableModule,MultiSelectModule,ButtonModule],
  providers:[DialogService],
  templateUrl: './person-view.component.html',
  styleUrl: './person-view.component.scss'
})
export class PersonViewComponent {
  person={};
  overViewObj={};
  personalDetailsObj={};
  personmdmId='';
  additionalDetailsArray=[];
  phoneDetailsArray=[];
  emailDetailsArray=[];
  identifierDetailsArray=[];
  addressDetailsArray=[];
  constructor(public dynamicDialogRef:DynamicDialogRef, 
    public dynamicDialogConfig:DynamicDialogConfig,
    private dialogService:DialogService,
    private mdmService: MDMService
  ){}
  ngOnInit() {
    this.person=this.dynamicDialogConfig.data['customerObj']; 
    this.personmdmId=this.dynamicDialogConfig.data['personmdmId']; 
    let personmdmId= this.personmdmId;
    let personQueryString= "WHERE PARTY_TYPE ='Person' AND PARTY_MDM_ID IN (" +personmdmId+ ")";
    let personString= "WHERE  PARTY_MDM_ID IN (" +personmdmId+ ")";
    let personString1= "WHERE  p.PARTY_MDM_ID IN (" +personmdmId+ ")";
    this.getOverViewForPerson(personQueryString);
    this.getpersonDetails(personString);
    this. getpersonAdditionalDetails(personString);
    this.getpersonPhoneDetails(personString)
    this.getpersonIdentifierDetails(personString);
    this. getpersonAddressDetails(personString1);
    this.getpersonEMailAddressDetails(personString)
    
    
    
  }

 
  async getOverViewForPerson(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/personOverView';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.overViewObj= response[0];
 
            //this.crossRefernceObjForCustomers = response[0];
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

  async getpersonDetails(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/personalDetails';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this. personalDetailsObj = response[0];
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


  async getpersonAdditionalDetails(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/personAdditionalDetails';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            //this.crossRefernceObjForCustomers = response[0];
            this.additionalDetailsArray=response;
          } else {

          }
          resolve();
        },
        error: (error: object) => {
          rejects(error);
        },
        complete: () => {
          console.log('additional details are',this.additionalDetailsArray);
          //this.customerByCountryResponse=response;
          //this.processHistoryDataForSystemName(this.customerHistory);
        }
      })
    })

  }

  async getpersonPhoneDetails(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/personPhoneDetails';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {

            this.phoneDetailsArray = response;
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

  

  
  
 
  async getpersonEMailAddressDetails(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/personEmailDetails';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.emailDetailsArray = response;
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

  async getpersonAddressDetails(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/personAddressDetails';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.addressDetailsArray = response;
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
  async getpersonIdentifierDetails(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/personIdentifierDetails';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.identifierDetailsArray = response;
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
