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
  prefixArray=[];
  gendersArray=[];
  partyArray=[];
  maritalStatusArray=[];
  educationlevels=[];
  yesnoValDropDowns=[];
  
  namePrefixOptions=[];
  
  genderOptions=[];
 
  maritalStatusOptions=[];
  selectedPrefix: string; 
  selectedGender: string;
  selectedEducationLevel: string; 
  selectedMaritalStatus: string; 
  selectedYesNo: string; 
  
  
  yesNoOptions=[];
  educationLevels =[];
  

  isDisplayOnlyTables: boolean = true;

  constructor(public dynamicDialogRef:DynamicDialogRef, 
    public dynamicDialogConfig:DynamicDialogConfig,
    private dialogService:DialogService,
    private mdmService: MDMService
  ){}
  ngOnInit() {

    this.yesNoOptions = [
      { Y_N_CD: 'Y', Y_N_DESC: 'Yes' },
      { Y_N_CD: 'N', Y_N_DESC: 'No' }
    ];
    this.educationLevels = [
      { EDUCATION_LEVEL_CD: 'PRI', EDUCATION_LEVEL_DESC: 'Primary School' },
      { EDUCATION_LEVEL_CD: 'SEC', EDUCATION_LEVEL_DESC: 'Secondary School' },
      { EDUCATION_LEVEL_CD: 'HSC', EDUCATION_LEVEL_DESC: 'High School Graduate' },
      { EDUCATION_LEVEL_CD: 'BCH', EDUCATION_LEVEL_DESC: 'Bachelor’s Degree' },
      { EDUCATION_LEVEL_CD: 'MAS', EDUCATION_LEVEL_DESC: 'Master’s Degree' },
      { EDUCATION_LEVEL_CD: 'PHD', EDUCATION_LEVEL_DESC: 'Doctorate / PhD' }
    ];
    
   // Will hold codes like 'BCH', 'PHD', etc.
    
    this.maritalStatusOptions = [
      { MARITAL_STATUS_CD: 'DIV', MARITAL_STATUS_DESC: 'DIVORCED' },
      { MARITAL_STATUS_CD: 'MAR', MARITAL_STATUS_DESC: 'MARRIED' },
      { MARITAL_STATUS_CD: 'SNG', MARITAL_STATUS_DESC: 'SINGLE' },
      { MARITAL_STATUS_CD: 'WID', MARITAL_STATUS_DESC: 'WIDOWED' },
      { MARITAL_STATUS_CD: 'UNK', MARITAL_STATUS_DESC: 'Unknown' },
      { MARITAL_STATUS_CD: 'U', MARITAL_STATUS_DESC: 'UNKNOWN' }
    ];
    
    // Will hold values like 'MAR', 'SNG', etc.
    
    this. genderOptions = [
      {
        GENDER_CD: 'M',
        GENDER_DESC: 'Male'
      },
      {
        GENDER_CD: 'F',
        GENDER_DESC: 'Female'
      },
      {
        GENDER_CD: 'U',
        GENDER_DESC: 'Unknown'
      }
    ];
    
    this.namePrefixOptions = [
      {
        "NAME_PREFIX_CD": "DR",
        "NAME_PREFIX_DESC": "DOCTOR"
      },
      {
        "NAME_PREFIX_CD": "MR",
        "NAME_PREFIX_DESC": "MR"
      },
      {
        "NAME_PREFIX_CD": "MRS",
        "NAME_PREFIX_DESC": "MRS"
      },
      {
        "NAME_PREFIX_CD": "MS",
        "NAME_PREFIX_DESC": "MISS"
      },
      {
        "NAME_PREFIX_CD": "MST",
        "NAME_PREFIX_DESC": "MASTER"
      },
      {
        "NAME_PREFIX_CD": "MTH",
        "NAME_PREFIX_DESC": "MOTHER"
      },
      {
        "NAME_PREFIX_CD": "FR",
        "NAME_PREFIX_DESC": "FATHER"
      },
      {
        "NAME_PREFIX_CD": "SR",
        "NAME_PREFIX_DESC": "SISTER"
      }
    ];

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
    this.getpersonEMailAddressDetails(personString);
    
    this.getNamePrefix(personString);
    this.getGenders(personString);
    this.getPartyTypes(personString);
    this.getMaritalStatus(personString);
    this.getEducationLevels(personString);
    this.getYesNoVals(personString);
    
    
  }

  handleToggleChange(event: any) {
    console.log('Toggled to:', event.checked);
    if (event.checked === true) {
      this.isDisplayOnlyTables = true;
    } else {
      this.isDisplayOnlyTables = false;
    }

  }
  
  
  
  async getYesNoVals(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/getYesNoVals';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
           this.yesnoValDropDowns= response;
 
            //this.crossRefernceObjForCustomers = response[0];
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
  async getEducationLevels(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/getEducationLevels';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.educationlevels= response;
           // this.overViewObj= response[0];
 
            //this.crossRefernceObjForCustomers = response[0];
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

  async getPartyTypes(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/getPartyTypes';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.partyArray= response;
          //  this.overViewObj= response[0];
 
            //this.crossRefernceObjForCustomers = response[0];
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
  async getMaritalStatus(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/getMaritalStatus';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.maritalStatusArray= response;
            //this.overViewObj= response[0];
 
            //this.crossRefernceObjForCustomers = response[0];
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
  async getGenders(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/getGenders';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.gendersArray= response;
           // this.overViewObj= response[0];
 
            //this.crossRefernceObjForCustomers = response[0];
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
  async getNamePrefix(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/getNamePrefix';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.prefixArray= response;
         //   this.overViewObj= response[0];
 
            //this.crossRefernceObjForCustomers = response[0];
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
  async getOverViewForPerson(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/personOverView';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.overViewObj= response[0];
 console.log('overViewObj',  this.overViewObj);
 console.log('overViewObj from resp' ,  response);
            //this.crossRefernceObjForCustomers = response[0];
          } else {

          }
          resolve();
        },
        error: (error: object) => {
          rejects(error);
        },
        complete: () => {
          this.selectedPrefix= this.overViewObj['NAME_PREFIX_CD'];
          this.selectedGender= this.overViewObj['GENDER_CD'];
         // : string;
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
