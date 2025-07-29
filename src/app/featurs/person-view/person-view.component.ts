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
  customerHistory: any[]=[];
  namePrefixOptions=[];
  
  genderOptions=[];
  customerHistorySelectedResult={};
  maritalStatusOptions=[];
  selectedPrefix: string; 
  selectedGender: string;
  selectedEducationLevel: string; 
  selectedMaritalStatus: string; 
  selectedYesNo: string; 
  selectedIsEmployee: string; 
  selectedIsVP: string; 
  selectedCriminalRecord: string; 
  personHistory: any[]=[];
  yesNoOptions=[];
  educationLevels =[];
  options = [];
  startDate='';
  endDate='';
  noHistoryData=false;
  isDisplayOnlyTables: boolean = true;
  displayHistoryTable=false;
  crossRefernceXReferenceObjForPerons=[];
  erpSourceObjectForTableData={};
  netSuiteObjectForTableData={};
  crossRefernceTrustObjForPersons=[];
  netsuiteArrayForCrossReference=[];
erpArrayForCrossReference=[];
uniqueMDMsForNetSuiteForCrossRef=[];
uniqueMDMsERPsForCrossRef=[];
firstNameTrstArrayForCross=[];
lastNameTrstArrayForCross=[];
middleNameTrstArrayForCross=[];
fullNameTrstArrayForCross=[];
orgNameTrstArrayForCross=[];
genderTrstArrayForCross=[];
namePrefixTrstArrayForCross=[];
dunsNumberPrefixTrstArrayForCross=[];
taxIdTrstArrayForCross=[];
firstNameTrstArrayForCrossForNetScape=[];
lastNameTrstArrayForCrossForNetScape=[];
middleNameTrstArrayForCrossForNetScape=[];
fullNameTrstArrayForCrossForNetScape=[];
orgNameTrstArrayForCrossForNetScape=[];
genderTrstArrayForCrossForNetScape=[];
namePrefixTrstArrayForCrossForNetScape=[];
dunsNumberPrefixTrstArrayForCrossForNetScape=[];
taxIdTrstArrayForCrossForNetScape=[];
maxTrustForFNameForCross=0;
 maxTrustMDMForFname=0;
 maxTrustFortaxIDForCross=0;   
  maxTrustMDMFortaxID=0;
  maxTrustForLNameForCross=0;
  maxTrustMDMForLName=0;
  maxTrustForMiddleNameForCross=0;
 maxTrustMDMForMiddlename=0;
 maxTrustForFullNameForCross=0;
 maxTrustMDMForullname=0;
 maxTrustForOrgNameForCross=0;
 maxTrustMDMForOrgname=0;
 
 maxTrustForGenderForCross=0;
 maxTrustMDMForGender=0;
 
  maxTrustForNPrefixForCross=0;
 maxTrustMDMForNPrefix=0;
 
  maxTrustForDunsNumberForCross=0;
 maxTrustMDMForDunsNumber=0;

  constructor(public dynamicDialogRef: DynamicDialogRef,
    public dynamicDialogConfig: DynamicDialogConfig,
    private dialogService: DialogService,
    private mdmService: MDMService
  ) { }
  ngOnInit() {
    this. educationLevels = [
      { EDUCATION_LEVEL_CD: 'PRI', EDUCATION_LEVEL_DESC: 'Primary School' },
      { EDUCATION_LEVEL_CD: 'SEC', EDUCATION_LEVEL_DESC: 'Secondary School' },
      { EDUCATION_LEVEL_CD: 'HSC', EDUCATION_LEVEL_DESC: 'High School Graduate' },
      { EDUCATION_LEVEL_CD: 'BCH', EDUCATION_LEVEL_DESC: 'Bachelor’s Degree' },
      { EDUCATION_LEVEL_CD: 'MAS', EDUCATION_LEVEL_DESC: 'Master’s Degree' },
      { EDUCATION_LEVEL_CD: 'PHD', EDUCATION_LEVEL_DESC: 'Doctorate / PhD' }
    ];
this.maritalStatusOptions = [
  { MARITAL_STATUS_CD: 'DIV', MARITAL_STATUS_DESC: 'DIVORCED' },
  { MARITAL_STATUS_CD: 'MAR', MARITAL_STATUS_DESC: 'MARRIED' },
  { MARITAL_STATUS_CD: 'SNG', MARITAL_STATUS_DESC: 'SINGLE' },
  { MARITAL_STATUS_CD: 'WID', MARITAL_STATUS_DESC: 'WIDOWED' },
  { MARITAL_STATUS_CD: 'UNK', MARITAL_STATUS_DESC: 'Unknown' },
  { MARITAL_STATUS_CD: 'U', MARITAL_STATUS_DESC: 'UNKNOWN' }
];
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
    
    this.getCrossRefernceXReferenceForPersons(personQueryString);
  }

  handleToggleChange(event: any) {
    console.log('Toggled to:', event.checked);
    if (event.checked === true) {
      this.isDisplayOnlyTables = true;
    } else {
      this.isDisplayOnlyTables = false;
    }

  }
  
  
  getHistoryDetails() {
    let  custHistoryQueryString ='';
    let startTime='00:00:01';
    let endTime='23:59:59';
    let startDate=this.startDate;
    let endDate=this.endDate;
    let mdmIdForQuery=this.personmdmId;;
    //let personmdmId= 
   // let mdmIdForQuery=this.custMdmId;
    // let startDate='2025-05-15';
    // let endDate='2025-05-20';
     let timestampStart = `${startDate} ${startTime}`
      let timestampEnd = `${endDate} ${endTime}`
   // custHistoryQueryString= ' WHERE HIST_CREATE_DATE BETWEEN TO_TIMESTAMP_NTZ ('+timestampStart+') AND TO_TIMESTAMP_NTZ ('+timestampEnd+ ') AND CUSTOMER_MDM_ID =769 ORDER BY HIST_CREATE_DATE desc;'
    custHistoryQueryString= `WHERE HIST_CREATE_DATE BETWEEN '${startDate}' AND '${endDate}' and  PARTY_MDM_ID ='${mdmIdForQuery} 'ORDER BY HIST_CREATE_DATE desc `;
   // custHistoryQueryString= `WHERE HIST_CREATE_DATE BETWEEN '${startDate}' AND '${endDate}' and  CUSTOMER_MDM_ID =769 ORDER BY HIST_CREATE_DATE desc `;
      
    
    this.getPersonHistoryDataByCustomerFromAPI(custHistoryQueryString);
  
  }
  async getPersonHistoryDataByCustomerFromAPI(queryForAPI: string): Promise<void> {
 //   this.loadSpinner=true;
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/historyDataForPersons';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.personHistory = response;
          } else {

          }
          resolve();
        },
        error: (error: object) => {
          rejects(error);
        //  this.loadSpinner=false;
        },
        complete: () => {
          //this.customerByCountryResponse=response;
          this.processHistoryDataForSystemName(this.personHistory);
         // this.loadSpinner=false;
        }
      })
    })

  }

  handleClick(value: string) {
    console.log('Clicked radio value:', value);
    this.displayHistoryTable=true;
    let historyDataObject:any[]=[];
     historyDataObject=this.personHistory;
    //@ts-ignore
   // historyDataObject.sort((a, b) => new Date(a['HIST_CREATE_DATE']) - new Date(b['HIST_CREATE_DATE']));
   //@ts-ignore  
    historyDataObject.sort((a, b) => new Date(b['HIST_CREATE_DATE']) - new Date(a['HIST_CREATE_DATE']));

 //   events.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    for (let i = 0; i < historyDataObject.length; i++) {
      
      
      if (i + 1 < historyDataObject.length) {
        historyDataObject[i]['FIRST_NAME_Old'] = historyDataObject[i + 1]['FIRST_NAME'];
        historyDataObject[i]['LAST_NAME_Old'] = historyDataObject[i + 1]['LAST_NAME'];
        historyDataObject[i]['FULL_NAME_Old'] = historyDataObject[i + 1]['FULL_NAME'];
        historyDataObject[i]['MIDDLE_NAME_Old'] = historyDataObject[i + 1]['MIDDLE_NAME'];
        historyDataObject[i]['NAME_PREFIX_CD_Old'] = historyDataObject[i + 1]['NAME_PREFIX_CD'];
        historyDataObject[i]['GENDER_CD_Old'] = historyDataObject[i + 1]['GENDER_CD'];
        historyDataObject[i]['TAX_ID_Old'] = historyDataObject[i + 1]['TAX_ID'];
        historyDataObject[i]['DUNS_NUMBER_Old'] = historyDataObject[i + 1]['DUNS_NUMBER'];
        historyDataObject[i]['PARTY_ID_Old'] = historyDataObject[i + 1]['PARTY_ID'];
        historyDataObject[i]['PARTY_MDM_ID_Old'] = historyDataObject[i + 1]['PARTY_MDM_ID'];
        
        historyDataObject[i]['BIRTHDATE_Old'] = historyDataObject[i + 1]['BIRTHDATE'];
        historyDataObject[i]['AGE_Old'] = historyDataObject[i + 1]['AGE'];
        historyDataObject[i]['EMAIL_Old'] = historyDataObject[i + 1]['EMAIL'];
        historyDataObject[i]['LOYALTY_SCORE_Old'] = historyDataObject[i + 1]['LOYALTY_SCORE'];
        historyDataObject[i]['PHONE_Old'] = historyDataObject[i + 1]['PHONE'];
        //source columns
        historyDataObject[i]['UPDATED_BY_Old'] = historyDataObject[i + 1]['UPDATED_BY'];
        historyDataObject[i]['LAST_UPDATE_DATE_Old'] = historyDataObject[i + 1]['LAST_UPDATE_DATE'];
        historyDataObject[i]['HIST_CREATE_DATE_Old'] = historyDataObject[i + 1]['HIST_CREATE_DATE'];
        historyDataObject[i]['CONSOLIDATION_IND_Old'] = historyDataObject[i + 1]['CONSOLIDATION_IND'];
        historyDataObject[i]['CUSTOMER_MDM_ID_Old'] = historyDataObject[i + 1]['CUSTOMER_MDM_ID'];
        historyDataObject[i]['CREATED_AT_Old'] = historyDataObject[i + 1]['CREATED_AT'];
        historyDataObject[i]['CREATED_BY_Old'] = historyDataObject[i + 1]['CREATED_BY'];

      } else {
        historyDataObject[i]['FIRST_NAME_Old'] = historyDataObject[i]['FIRST_NAME'];
        historyDataObject[i]['LAST_NAME_Old'] = historyDataObject[i]['LAST_NAME'];
        historyDataObject[i]['FULL_NAME_Old'] = historyDataObject[i]['FULL_NAME'];
        historyDataObject[i]['MIDDLE_NAME_Old'] = historyDataObject[i]['MIDDLE_NAME'];
        historyDataObject[i]['NAME_PREFIX_CD_Old'] = historyDataObject[i]['NAME_PREFIX_CD'];
        historyDataObject[i]['GENDER_CD_Old'] = historyDataObject[i]['GENDER_CD'];
        historyDataObject[i]['TAX_ID_Old'] = historyDataObject[i]['TAX_ID'];
        historyDataObject[i]['DUNS_NUMBER_Old'] = historyDataObject[i]['DUNS_NUMBER'];
        historyDataObject[i]['PARTY_ID_Old'] = historyDataObject[i]['PARTY_ID'];
        historyDataObject[i]['PARTY_MDM_ID_Old'] = historyDataObject[i]['PARTY_MDM_ID'];
        historyDataObject[i]['BIRTHDATE_Old'] = historyDataObject[i]['BIRTHDATE'];
        historyDataObject[i]['AGE_Old'] = historyDataObject[i]['AGE'];
        historyDataObject[i]['EMAIL_Old'] = historyDataObject[i]['EMAIL'];
        historyDataObject[i]['LOYALTY_SCORE_Old'] = historyDataObject[i]['LOYALTY_SCORE'];
        historyDataObject[i]['PHONE_Old'] = historyDataObject[i]['PHONE'];
         //source columns
         historyDataObject[i]['UPDATED_BY_Old'] = historyDataObject[i]['UPDATED_BY'];
         historyDataObject[i]['LAST_UPDATE_DATE_Old'] = historyDataObject[i]['LAST_UPDATE_DATE'];
         historyDataObject[i]['HIST_CREATE_DATE_Old'] = historyDataObject[i]['HIST_CREATE_DATE'];
         historyDataObject[i]['CONSOLIDATION_IND_Old'] = historyDataObject[i]['CONSOLIDATION_IND'];
         historyDataObject[i]['CUSTOMER_MDM_ID_Old'] = historyDataObject[i]['CUSTOMER_MDM_ID'];
         historyDataObject[i]['CREATED_AT_Old'] = historyDataObject[i]['CREATED_AT'];
         historyDataObject[i]['CREATED_BY_Old'] = historyDataObject[i]['CREATED_BY'];
      }
    }

    console.log('latest data is', historyDataObject);
    let resultObj = historyDataObject.find(p => p['HIST_CREATE_DATE'] === value);
    this.customerHistorySelectedResult = resultObj;

    if (this.customerHistorySelectedResult['DUNS_NUMBER_Old'] === this.customerHistorySelectedResult['DUNS_NUMBER']) {
      this.customerHistorySelectedResult['duns_match'] = true;
    }
    if (this.customerHistorySelectedResult['DUNS_NUMBER_Old'] !== this.customerHistorySelectedResult['DUNS_NUMBER']) {
      this.customerHistorySelectedResult['duns_match'] = false;
    }

    if (this.customerHistorySelectedResult['PARTY_ID_Old'] === this.customerHistorySelectedResult['PARTY_ID']) {
      this.customerHistorySelectedResult['partyid_match'] = true;
    }
    if (this.customerHistorySelectedResult['PARTY_ID_Old'] !== this.customerHistorySelectedResult['PARTY_ID']) {
      this.customerHistorySelectedResult['partyid_match'] = false;
    }

    if (this.customerHistorySelectedResult['PARTY_MDM_ID_Old'] === this.customerHistorySelectedResult['PARTY_MDM_ID']) {
      this.customerHistorySelectedResult['partymdmid_match'] = true;
    }
    if (this.customerHistorySelectedResult['PARTY_MDM_ID_Old'] !== this.customerHistorySelectedResult['PARTY_MDM_ID']) {
      this.customerHistorySelectedResult['partymdmid_match'] = false;
    }


    if (this.customerHistorySelectedResult['TAX_ID_Old'] === this.customerHistorySelectedResult['TAX_ID']) {
      this.customerHistorySelectedResult['tax_id_match'] = true;
    }
    if (this.customerHistorySelectedResult['TAX_ID_Old'] !== this.customerHistorySelectedResult['TAX_ID']) {
      this.customerHistorySelectedResult['tax_id_match'] = false;
    }


    if (this.customerHistorySelectedResult['LAST_NAME_Old'] === this.customerHistorySelectedResult['LAST_NAME']) {
      this.customerHistorySelectedResult['last_name_match'] = true;
    }
    if (this.customerHistorySelectedResult['LAST_NAME_Old'] !== this.customerHistorySelectedResult['LAST_NAME']) {
      this.customerHistorySelectedResult['last_name_match'] = false;
    }
    if (this.customerHistorySelectedResult['MIDDLE_NAME_Old'] === this.customerHistorySelectedResult['MIDDLE_NAME']) {
      this.customerHistorySelectedResult['middle_name_match'] = true;
    }
    if (this.customerHistorySelectedResult['MIDDLE_NAME_Old'] !== this.customerHistorySelectedResult['MIDDLE_NAME']) {
      this.customerHistorySelectedResult['middle_name_match'] = false;
    }
    if (this.customerHistorySelectedResult['FULL_NAME_Old'] === this.customerHistorySelectedResult['FULL_NAME']) {
      this.customerHistorySelectedResult['full_name_match'] = true;
    }
    if (this.customerHistorySelectedResult['FULL_NAME_Old'] !== this.customerHistorySelectedResult['FULL_NAME']) {
      this.customerHistorySelectedResult['full_name_match'] = false;
    }

    if (this.customerHistorySelectedResult['NAME_PREFIX_CD_Old'] === this.customerHistorySelectedResult['NAME_PREFIX_CD']) {
      this.customerHistorySelectedResult['name_prefix_match'] = true;
    }
    if (this.customerHistorySelectedResult['NAME_PREFIX_CD_Old'] !== this.customerHistorySelectedResult['NAME_PREFIX_CD']) {
      this.customerHistorySelectedResult['name_prefix_match'] = false;
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

    if (this.customerHistorySelectedResult['BIRTHDATE_Old'] === this.customerHistorySelectedResult['BIRTHDATE']) {
      this.customerHistorySelectedResult['birthdate_match'] = true;
    }
    if (this.customerHistorySelectedResult['BIRTHDATE_Old'] !== this.customerHistorySelectedResult['BIRTHDATE']) {
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



    if (this.customerHistorySelectedResult['UPDATED_BY_Old'] === this.customerHistorySelectedResult['UPDATED_BY']) {
      this.customerHistorySelectedResult['updatedby_match'] = true;
    }
    if (this.customerHistorySelectedResult['UPDATED_BY_Old'] !== this.customerHistorySelectedResult['UPDATED_BY']) {
      this.customerHistorySelectedResult['updatedby_match'] = false;
    }

    if (this.customerHistorySelectedResult['LAST_UPDATE_DATE_Old'] === this.customerHistorySelectedResult['LAST_UPDATE_DATE']) {
      this.customerHistorySelectedResult['lastupdateddate_match'] = true;
    }
    if (this.customerHistorySelectedResult['LAST_UPDATE_DATE_Old'] !== this.customerHistorySelectedResult['LAST_UPDATE_DATE']) {
      this.customerHistorySelectedResult['lastupdateddate_match'] = false;
    }


    if (this.customerHistorySelectedResult['HIST_CREATE_DATE_Old'] === this.customerHistorySelectedResult['HIST_CREATE_DATE']) {
      this.customerHistorySelectedResult['hisrcreateddate_match'] = true;
    }
    if (this.customerHistorySelectedResult['HIST_CREATE_DATE_Old'] !== this.customerHistorySelectedResult['HIST_CREATE_DATE']) {
      this.customerHistorySelectedResult['hisrcreateddate_match'] = false;
    }

    if (this.customerHistorySelectedResult['CONSOLIDATION_IND_Old'] === this.customerHistorySelectedResult['CONSOLIDATION_IND']) {
      this.customerHistorySelectedResult['consolidatedId_match'] = true;
    }
    if (this.customerHistorySelectedResult['CONSOLIDATION_IND_Old'] !== this.customerHistorySelectedResult['CONSOLIDATION_IND']) {
      this.customerHistorySelectedResult['consolidatedId_match'] = false;
    }

    if (this.customerHistorySelectedResult['CUSTOMER_MDM_ID_Old'] === this.customerHistorySelectedResult['CUSTOMER_MDM_ID']) {
      this.customerHistorySelectedResult['custmdm_match'] = true;
    }
    if (this.customerHistorySelectedResult['CUSTOMER_MDM_ID_Old'] !== this.customerHistorySelectedResult['CUSTOMER_MDM_ID']) {
      this.customerHistorySelectedResult['custmdm_match'] = false;
    }

    if (this.customerHistorySelectedResult['CREATED_AT_Old'] === this.customerHistorySelectedResult['CREATED_AT']) {
      this.customerHistorySelectedResult['createdat_match'] = true;
    }
    if (this.customerHistorySelectedResult['CREATED_AT_Old'] !== this.customerHistorySelectedResult['CREATED_AT']) {
      this.customerHistorySelectedResult['createdat_match'] = false;
    }

    if (this.customerHistorySelectedResult['CREATED_BY_Old'] === this.customerHistorySelectedResult['CREATED_BY']) {
      this.customerHistorySelectedResult['createdby_match'] = true;
    }
    if (this.customerHistorySelectedResult['CREATED_BY_Old'] !== this.customerHistorySelectedResult['CREATED_BY']) {
      this.customerHistorySelectedResult['createdby_match'] = false;
    }

  console.log('customerHistorySelectedResult :', this.customerHistorySelectedResult);
    // Add any custom logic here
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
          this.selectedEducationLevel= this.personalDetailsObj['EDUCATION_LEVEL_CD']?? null;
          this.selectedMaritalStatus= this.personalDetailsObj['MARITAL_STATUS_CD']?? null;
          
          this.selectedIsEmployee= this.personalDetailsObj['IS_EMPLOYEE_IND']?? null;
          this.selectedIsVP= this.personalDetailsObj['IS_VIP_IND']?? null;
          this.selectedCriminalRecord= this.personalDetailsObj['CRIMINAL_RECORD']?? null;
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
 
  async getCrossRefernceXReferenceForPersons(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/crossRefernceXReferenceForPersons';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
           this.crossRefernceXReferenceObjForPerons = response;
          } else {

          }
          resolve();
        },
        error: (error: object) => {
          rejects(error);
        },
        complete: () => {
          //this.customerByCountryResponse=response;
          this.processXReferenceForPersons(this.crossRefernceXReferenceObjForPerons);
         let mdmId = this.personmdmId;
          let originalMDMId = mdmId;
          let customerIdsArray=[];
          if (this.crossRefernceXReferenceObjForPerons.length > 1) {

            let wholeResponse = this.crossRefernceXReferenceObjForPerons;
            let originalId = '';
            let originalIds = [];
        
            for (let i = 0; i < wholeResponse.length; i++) {
              //   sourceId=sourceId+','+wholeResponse[i]['SRC_CUSTOMER_MDM_ID'];
              originalIds.push(wholeResponse[i]['ORIGINAL_MDM_ID']);
              let obj={};
              obj={
                'mdmid':wholeResponse[i]['ORIGINAL_MDM_ID'],
                'custid':wholeResponse[i]['CUSTOMER_ID'],
              }
              // obj.mdmid=wholeResponse[i]['ORIGINAL_MDM_ID'];
              // obj.custid=wholeResponse[i]['CUSTOMER_ID'];

              customerIdsArray.push(obj);
            }
            let integerString = originalIds.join(',');
            originalMDMId = originalIds.join(',');
          } else {
            originalMDMId = this.crossRefernceXReferenceObjForPerons[0]['ORIGINAL_MDM_ID'];
            let obj={};
            
            obj={
              'mdmid':this.crossRefernceXReferenceObjForPerons[0]['ORIGINAL_MDM_ID'],
              'custid':this.crossRefernceXReferenceObjForPerons[0]['PARTY_MDM_ID']
            }
            customerIdsArray.push( obj);
           // customerIdsArray.push( this.crossRefernceXReferenceObjForCustomers[0]['CUSTOMER_ID']);
          }

         // let originalMDMId = this.crossRefernceXReferenceObjForCustomers[0]['ORIGINAL_MDM_ID'];
     //    this.customerIdsArrayForCrossReference=customerIdsArray;
         
          let custQueryString = "WHERE PARTY_MDM_ID IN (" + mdmId + "," + originalMDMId + ")";
          console.log('new PI CALL', custQueryString);
          console.log('originalMDMId', originalMDMId);
          let finalQueryString = custQueryString;
          this.getCrossRefernceTrustForPersons(finalQueryString);
        }
      })
    })

    
  }
  processXReferenceForPersons(respose: any) {
    let resposeData=respose;

    const uniqueSourceNames=[... new Set(resposeData.map(item =>item['SRC_SYSTEM_NAME']))];
    let  erpSourceObject = resposeData.find(item => item['SRC_SYSTEM_NAME'] === 'ERP');
    let  netSuiteSourceObject = resposeData.find(item => item['SRC_SYSTEM_NAME'] === 'NETSUITE');
  
    this.erpSourceObjectForTableData=erpSourceObject;
    this.netSuiteObjectForTableData=netSuiteSourceObject;

    console.log('hello log', this.erpSourceObjectForTableData);
    // let historyDats = resposeData.map(item => item['HIST_CREATE_DATE']);
    
    // // ];
  }

  async getCrossRefernceTrustForPersons(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/crossRefernceTrustForPersons';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
           this.crossRefernceTrustObjForPersons = response;
          } else {

          }
          resolve();
        },
        error: (error: object) => {
          rejects(error);
        },
        complete: () => {
          //this.customerByCountryResponse=response;
          //write logic for building trust obj
          this.processTrustDataForPersons(this.crossRefernceTrustObjForPersons);
        }
      })
    })

  }
  processTrustDataForPersons(respose: any) {
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
    console.log('ERP suite trust value size',erpTrustArray.length);
    console.log('net suite trust value size',netSuiteTrustArray.length);
    this.netsuiteArrayForCrossReference=netSuiteTrustArray;
    this.erpArrayForCrossReference=erpTrustArray;
    this.uniqueMDMsERPsForCrossRef=[... new Set(this.erpArrayForCrossReference.map(item =>item['PARTY_MDM_ID']))];
    this.uniqueMDMsForNetSuiteForCrossRef=[... new Set(this.netsuiteArrayForCrossReference.map(item =>item['PARTY_MDM_ID']))];
    let erpArrayProcessedDataForCross=[];
    let uniqueMdmsArrayForCross=this.uniqueMDMsERPsForCrossRef;
    let uniqueMdmsNetSuiteArrayForCross=this.uniqueMDMsForNetSuiteForCrossRef;
    let erpForMatchRef=this.erpArrayForCrossReference;
    let netSuiteForMatchRef=this.netsuiteArrayForCrossReference;
    if (this.uniqueMDMsERPsForCrossRef.length > 0) {
      for (let i = 0; i < uniqueMdmsArrayForCross.length; i++) {
        console.log('elemnt is', uniqueMdmsArrayForCross[i]);
    
        let objId = uniqueMdmsArrayForCross[i];
        let objSourceData = erpForMatchRef.filter(item => item['PARTY_MDM_ID'] === uniqueMdmsArrayForCross[i]);
    
        let formattedObject = {};
        formattedObject['mdmIds'] = objId;
        formattedObject['mdmData'] = objSourceData;
        erpArrayProcessedDataForCross.push(formattedObject);
    
      }
    }
    console.log('formatted array erpArrayProcessedDataForCross ',erpArrayProcessedDataForCross);
    //erp source logic
    if (erpArrayProcessedDataForCross.length > 0) {
      const names = erpArrayProcessedDataForCross.map(person => person['mdmData']);
      this.taxIdTrstArrayForCross = names
        .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "TAX_ID"))
        .map(erpData => {
          return {
            mdmid: erpData['PARTY_MDM_ID'],
            trust: parseInt(erpData['TRUST_SCORE'], 10)

          };
        });

        console.log('whole object',this.crossRefernceXReferenceObjForPerons)

      this.firstNameTrstArrayForCross = names
        .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "FIRST_NAME"))
        .map(erpData =>
        // erpData['TRUST_SCORE']
        {
          return {
            mdmid: erpData['PARTY_MDM_ID'],
            trust: parseInt(erpData['TRUST_SCORE'], 10)

          };
        }

        );

      let lenghtForERP = 0;
      lenghtForERP = this.firstNameTrstArrayForCross.length;
      this.lastNameTrstArrayForCross = names
        .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "LAST_NAME"))
        .map(erpData =>
        // erpData['TRUST_SCORE']
        {
          return {
            mdmid: erpData['PARTY_MDM_ID'],
            trust: parseInt(erpData['TRUST_SCORE'], 10)

          };
        }

        );
      if (this.lastNameTrstArrayForCross.length === 0 || this.lastNameTrstArrayForCross.length < 1) {
        this.lastNameTrstArrayForCross = this.createZeroArray(lenghtForERP);

      }
      this.middleNameTrstArrayForCross = names
        .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "MIDDLE_NAME"))
        .map(erpData =>
        // erpData['TRUST_SCORE']
        {
          return {
            mdmid: erpData['PARTY_MDM_ID'],
            trust: parseInt(erpData['TRUST_SCORE'], 10)

          };
        }

        );
      if (this.middleNameTrstArrayForCross.length === 0 || this.middleNameTrstArrayForCross.length < 1) {
        this.middleNameTrstArrayForCross = this.createZeroArray(lenghtForERP);

      }

      this.fullNameTrstArrayForCross = names
        .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "FULL_NAME"))
        .map(erpData =>
        // erpData['TRUST_SCORE']
        {
          return {
            mdmid: erpData['PARTY_MDM_ID'],
            trust: parseInt(erpData['TRUST_SCORE'], 10)

          };
        }

        );
      if (this.fullNameTrstArrayForCross.length === 0 || this.fullNameTrstArrayForCross.length < 1) {
        this.fullNameTrstArrayForCross = this.createZeroArray(lenghtForERP);

      }

      this.genderTrstArrayForCross = names
        .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "GENDER_CD"))
        .map(erpData =>
        // erpData['TRUST_SCORE']
        {
          return {
            mdmid: erpData['PARTY_MDM_ID'],
            trust: parseInt(erpData['TRUST_SCORE'], 10)

          };
        }
        );
      if (this.genderTrstArrayForCross.length === 0 || this.genderTrstArrayForCross.length < 1) {

        this.genderTrstArrayForCross = this.createZeroArray(lenghtForERP);
      }


      this.orgNameTrstArrayForCross = names
        .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "ORGANIZATION_NAME"))
        .map(erpData =>
        // erpData['TRUST_SCORE']
        {
          return {
            mdmid: erpData['PARTY_MDM_ID'],
            trust: parseInt(erpData['TRUST_SCORE'], 10)

          };
        }
        );
      if (this.orgNameTrstArrayForCross.length === 0 || this.orgNameTrstArrayForCross.length < 1) {

        this.orgNameTrstArrayForCross = this.createZeroArray(lenghtForERP);
      }

      this.namePrefixTrstArrayForCross = names
        .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "NAME_PREFIX_CD"))
        .map(erpData =>
        // erpData['TRUST_SCORE']
        {
          return {
            mdmid: erpData['PARTY_MDM_ID'],
            trust: parseInt(erpData['TRUST_SCORE'], 10)

          };
        }
        );
      if (this.namePrefixTrstArrayForCross.length === 0 || this.namePrefixTrstArrayForCross.length < 1) {

        this.namePrefixTrstArrayForCross = this.createZeroArray(lenghtForERP);
      }


      this.dunsNumberPrefixTrstArrayForCross = names
        .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "DUNS_NUMBER"))
        .map(erpData =>
        // erpData['TRUST_SCORE']
        {
          return {
            mdmid: erpData['PARTY_MDM_ID'],
            trust: parseInt(erpData['TRUST_SCORE'], 10)

          };
        }
        );
      if (this.dunsNumberPrefixTrstArrayForCross.length === 0 || this.dunsNumberPrefixTrstArrayForCross.length < 1) {

        this.dunsNumberPrefixTrstArrayForCross = this.createZeroArray(lenghtForERP);
      }
      console.log('array generation completed');
      console.log('array generation completed for erp source');
    }
    let netSuiteProcessedDataForCross=[];
if (this.uniqueMDMsForNetSuiteForCrossRef.length > 0) {
  for (let i = 0; i < uniqueMdmsNetSuiteArrayForCross.length; i++) {
    console.log('elemnt is', uniqueMdmsNetSuiteArrayForCross[i]);

    let objId = uniqueMdmsNetSuiteArrayForCross[i];
    let objSourceData = netSuiteForMatchRef.filter(item => item['PARTY_MDM_ID'] === uniqueMdmsNetSuiteArrayForCross[i]);

    let formattedObject = {};
    formattedObject['mdmIds'] = objId;
    formattedObject['mdmData'] = objSourceData;
    netSuiteProcessedDataForCross.push(formattedObject);

  }
}
console.log('formatted array netSuiteProcessedDataForCross ',netSuiteProcessedDataForCross);
//net source logic
if(netSuiteProcessedDataForCross.length>0){

  const nameValuesForNet = netSuiteProcessedDataForCross.map(person => person['mdmData']);
  this.firstNameTrstArrayForCrossForNetScape = nameValuesForNet
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "FIRST_NAME"))
  .map(erpData =>
  // erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['PARTY_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)

    };
  }

  );
  let length = this.firstNameTrstArrayForCrossForNetScape.length;
  this.taxIdTrstArrayForCrossForNetScape = nameValuesForNet
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "TAX_ID"))
  .map(erpData => {
    return {
      mdmid: erpData['PARTY_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)

    };
  });
  if (this.taxIdTrstArrayForCrossForNetScape.length === 0 || this.taxIdTrstArrayForCrossForNetScape.length < 1) {
    this.taxIdTrstArrayForCrossForNetScape = this.createZeroArray(length);
  
  }


// let lenghtForERP = 0;
// lenghtForERP = this.firstNameTrstArrayForCross.length;
this.lastNameTrstArrayForCrossForNetScape = nameValuesForNet
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "LAST_NAME"))
  .map(erpData =>
  // erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['PARTY_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)

    };
  }

  );
if (this.lastNameTrstArrayForCrossForNetScape.length === 0 || this.lastNameTrstArrayForCrossForNetScape.length < 1) {
  this.lastNameTrstArrayForCrossForNetScape = this.createZeroArray(length);

}
this.middleNameTrstArrayForCrossForNetScape = nameValuesForNet
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "MIDDLE_NAME"))
  .map(erpData =>
  // erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['PARTY_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)

    };
  }

  );
if (this.middleNameTrstArrayForCrossForNetScape.length === 0 || this.middleNameTrstArrayForCrossForNetScape.length < 1) {
  this.middleNameTrstArrayForCrossForNetScape = this.createZeroArray(length);

}

this.fullNameTrstArrayForCrossForNetScape = nameValuesForNet
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "FULL_NAME"))
  .map(erpData =>
  // erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['PARTY_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)

    };
  }

  );
if (this.fullNameTrstArrayForCrossForNetScape.length === 0 || this.fullNameTrstArrayForCrossForNetScape.length < 1) {
  this.fullNameTrstArrayForCrossForNetScape = this.createZeroArray(length);

}

this.genderTrstArrayForCrossForNetScape = nameValuesForNet
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "GENDER_CD"))
  .map(erpData =>
  // erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['PARTY_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)

    };
  }
  );
if (this.genderTrstArrayForCrossForNetScape.length === 0 || this.genderTrstArrayForCrossForNetScape.length < 1) {

  this.genderTrstArrayForCrossForNetScape = this.createZeroArray(length);
}


this.orgNameTrstArrayForCrossForNetScape = nameValuesForNet
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "ORGANIZATION_NAME"))
  .map(erpData =>
  // erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['PARTY_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)

    };
  }
  );
if (this.orgNameTrstArrayForCrossForNetScape.length === 0 || this.orgNameTrstArrayForCrossForNetScape.length < 1) {

  this.orgNameTrstArrayForCrossForNetScape = this.createZeroArray(length);
}

this.namePrefixTrstArrayForCrossForNetScape = nameValuesForNet
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "NAME_PREFIX_CD"))
  .map(erpData =>
  // erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['PARTY_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)

    };
  }
  );
if (this.namePrefixTrstArrayForCrossForNetScape.length === 0 || this.namePrefixTrstArrayForCrossForNetScape.length < 1) {

  this.namePrefixTrstArrayForCrossForNetScape = this.createZeroArray(length);
}


this.dunsNumberPrefixTrstArrayForCrossForNetScape = nameValuesForNet
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "DUNS_NUMBER"))
  .map(erpData =>
  // erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['PARTY_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)

    };
  }
  );
if (this.dunsNumberPrefixTrstArrayForCrossForNetScape.length === 0 || this.dunsNumberPrefixTrstArrayForCrossForNetScape.length < 1) {

  this.dunsNumberPrefixTrstArrayForCrossForNetScape = this.createZeroArray(length);
}

let combinedFirstName = [...this.firstNameTrstArrayForCrossForNetScape, ...this.firstNameTrstArrayForCross];
this.maxTrustForFNameForCross = Math.max(...combinedFirstName.map(combinedFirstName => combinedFirstName.trust));
let maxTrustSCoreObjectsForFName=combinedFirstName.filter(combinedCustId => combinedCustId.trust ===   this.maxTrustForFNameForCross);
this.maxTrustMDMForFname= Math.max(...maxTrustSCoreObjectsForFName.map(maxTrustSCoreObjectsForFName => maxTrustSCoreObjectsForFName.mdmid));
//console.log('maxTrusFname', this.maxTrustForFNameForCross);
if (this.maxTrustForFNameForCross === 0 ||combinedFirstName.length < 2 ) {
  this.maxTrustForFNameForCross = 1000;
}


 //maxTrustForCustIDForCross=0;
 let combinedtaxId = [...this.taxIdTrstArrayForCrossForNetScape, ...this.taxIdTrstArrayForCross];
 this.maxTrustFortaxIDForCross = Math.max(...combinedtaxId.map(combinedtaxId => combinedtaxId.trust));
let maxTrustSCoreObjectsForID=combinedtaxId.filter(combinedCustId => combinedCustId.trust ===   this.maxTrustFortaxIDForCross);
this.maxTrustMDMFortaxID= Math.max(...maxTrustSCoreObjectsForID.map(maxTrustSCoreObjectsForID => maxTrustSCoreObjectsForID.mdmid));
console.log('maxTrustForCustIDForCross', this.maxTrustFortaxIDForCross);
console.log('maxTrustMDM ID ForID ', this.maxTrustMDMFortaxID);
 if (this.maxTrustFortaxIDForCross === 0 ||combinedtaxId.length < 2 ) {
   this.maxTrustFortaxIDForCross = 1000;
 }
 //maxTrustForLNameForCross=0;
 
 let combinedLName = [...this.lastNameTrstArrayForCrossForNetScape, ...this.lastNameTrstArrayForCross];
    this.maxTrustForLNameForCross= Math.max(...combinedLName.map(combinedLName => combinedLName.trust));
    let maxTrustSCoreObjectsForLName=combinedLName.filter(combinedLName => combinedLName.trust ===   this.maxTrustForLNameForCross);
    this.maxTrustMDMForLName= Math.max(...maxTrustSCoreObjectsForLName.map(maxTrustSCoreObjectsForLName => maxTrustSCoreObjectsForLName.mdmid));

    if (this.maxTrustForLNameForCross === 0 ||combinedLName.length < 2) {
      this.maxTrustForLNameForCross = 1000;
    }



let combinedMiddleName = [...this.middleNameTrstArrayForCrossForNetScape, ...this.middleNameTrstArrayForCross];
this.maxTrustForMiddleNameForCross = Math.max(...combinedMiddleName.map(combinedMiddleName => combinedMiddleName.trust));
let maxTrustSCoreObjectsForMiddleName=combinedMiddleName.filter(combinedMiddleName => combinedMiddleName.trust ===   this.maxTrustForMiddleNameForCross);
this.maxTrustMDMForMiddlename= Math.max(...maxTrustSCoreObjectsForMiddleName.map(maxTrustSCoreObjectsForMiddleName => maxTrustSCoreObjectsForMiddleName.mdmid));
//console.log('maxTrusFname', this.maxTrustForFNameForCross);
if (this.maxTrustForMiddleNameForCross === 0 ||combinedMiddleName.length < 2 ) {
  this.maxTrustForMiddleNameForCross = 1000;
}


let combinedFullName = [...this.fullNameTrstArrayForCrossForNetScape, ...this.fullNameTrstArrayForCross];
this.maxTrustForFullNameForCross = Math.max(...combinedFullName.map(combinedFullName => combinedFullName.trust));
let maxTrustSCoreObjectsForFullName=combinedFullName.filter(combinedFullName => combinedFullName.trust ===   this.maxTrustForFullNameForCross);
this.maxTrustMDMForullname= Math.max(...maxTrustSCoreObjectsForFullName.map(maxTrustSCoreObjectsForFullName => maxTrustSCoreObjectsForFullName.mdmid));
//console.log('maxTrusFname', this.maxTrustForFullNameForCross);
if (this.maxTrustForFullNameForCross === 0 ||combinedFullName.length < 2 ) {
  this.maxTrustForFullNameForCross = 1000;
}


let combinedOrgName = [...this.orgNameTrstArrayForCrossForNetScape, ...this.orgNameTrstArrayForCross];
this.maxTrustForOrgNameForCross = Math.max(...combinedOrgName.map(combinedOrgName => combinedOrgName.trust));
let maxTrustSCoreObjectsForOrgName=combinedOrgName.filter(combinedOrgName => combinedOrgName.trust ===   this.maxTrustForOrgNameForCross);
this.maxTrustMDMForOrgname= Math.max(...maxTrustSCoreObjectsForOrgName.map(maxTrustSCoreObjectsForOrgName => maxTrustSCoreObjectsForOrgName.mdmid));
//console.log('maxTrusFname', this.maxTrustForFullNameForCross);
if (this.maxTrustForOrgNameForCross === 0 ||combinedOrgName.length < 2 ) {
  this.maxTrustForOrgNameForCross = 1000;
}




let combinedGender = [...this.genderTrstArrayForCrossForNetScape, ...this.genderTrstArrayForCross];
this.maxTrustForGenderForCross = Math.max(...combinedGender.map(combinedGender => combinedGender.trust));
let maxTrustSCoreObjectsForGender=combinedGender.filter(combinedGender => combinedGender.trust ===   this.maxTrustForGenderForCross);
this.maxTrustMDMForGender= Math.max(...maxTrustSCoreObjectsForGender.map(maxTrustSCoreObjectsForGender => maxTrustSCoreObjectsForGender.mdmid));
//console.log('maxTrusFname', this.maxTrustForFullNameForCross);
if (this.maxTrustForGenderForCross === 0 ||combinedGender.length < 2 ) {
  this.maxTrustForGenderForCross = 1000;
}


let combinedNamePrefix = [...this.namePrefixTrstArrayForCrossForNetScape, ...this.namePrefixTrstArrayForCross];
this.maxTrustForNPrefixForCross = Math.max(...combinedNamePrefix.map(combinedNamePrefix => combinedNamePrefix.trust));
let maxTrustSCoreObjectsForPrefix=combinedNamePrefix.filter(combinedNamePrefix => combinedNamePrefix.trust ===   this.maxTrustForNPrefixForCross);
this.maxTrustMDMForNPrefix= Math.max(...maxTrustSCoreObjectsForPrefix.map(maxTrustSCoreObjectsForPrefix => maxTrustSCoreObjectsForPrefix.mdmid));
//console.log('maxTrusFname', this.maxTrustForFullNameForCross);
if (this.maxTrustForNPrefixForCross === 0 ||combinedNamePrefix.length < 2 ) {
  this.maxTrustForNPrefixForCross = 1000;
}


let combinedNameDunsNumber = [...this.dunsNumberPrefixTrstArrayForCrossForNetScape, ...this.dunsNumberPrefixTrstArrayForCross];
this.maxTrustForDunsNumberForCross = Math.max(...combinedNameDunsNumber.map(combinedNameDunsNumber => combinedNameDunsNumber.trust));
let maxTrustSCoreObjectsForDunsNumber=combinedNameDunsNumber.filter(combinedNameDunsNumber => combinedNameDunsNumber.trust ===   this.maxTrustForDunsNumberForCross);
this.maxTrustMDMForDunsNumber= Math.max(...maxTrustSCoreObjectsForDunsNumber.map(maxTrustSCoreObjectsForDunsNumber => maxTrustSCoreObjectsForDunsNumber.mdmid));
//console.log('maxTrusFname', this.maxTrustForFullNameForCross);
if (this.maxTrustForDunsNumberForCross === 0 ||combinedNameDunsNumber.length < 2 ) {
  this.maxTrustForDunsNumberForCross = 1000;
}

console.log('array generation completed');
console.log('array generation completed for erp source');

}


  }

  createZeroArray(length) {
    return new Array(length).fill(
     { 'mdmid':0,
        'trust':0}
    );
  }
  get maxValueForFirstNameTrstArray(): number {
    //return Math.max(...this.firstNameTrstArray);
    return null;
  }
  get maxValueForLastNameTrstArray(): number {
   // return Math.max(...this.firstNameTrstArray);
   return null;
  }
  

}
