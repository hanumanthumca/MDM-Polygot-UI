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
@Component({
  selector: 'app-customer-view',
  standalone: true,

  imports: [FormsModule,PanelModule,MenuModule,CheckboxModule,InputSwitchModule,CommonModule,ProgressSpinnerModule,Select,RadioButtonModule,RadioButton,MenubarModule,SidebarModule,TabMenuModule,TabsModule,TableModule,MultiSelectModule,ButtonModule],

  templateUrl: './customer-view.component.html',
  providers:[DialogService],
  styleUrl: './customer-view.component.scss',
  
})
export class CustomerViewComponent  {
  formGroup!: FormGroup;
  isSourceColumnsChecked: boolean = false;
custId='';
custMdmId='';
customerResult={};
custFirstName='';
custLastName='';
custEmail='';
custAge='';
custGender='';
custCountry='';
custRel='';
custPhone='';
custAddress='';
loyolScore='';
showSuccess = true;
fadeOut = false;
matchXrefSourceId='';
matchXrefTargetId='';
countries=[];
genders=[];
custType=[];
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
matchXReferenceObjForCustomers=[];
crossRefernceTrustObjForCustomers=[];
matchTrustObjForCustomers=[];
matchRefernceObjForCustomers=[];
matchRefernceXReferenceObjForCustomers=[];
matchRefernceTrustObjForCustomers=[];
uniqueMDMsForNetSuiteForMatch=[];
uniqueMDMs=[];
uniqueSourcesForCreossReferences=[];
uniqueMDMsForNetSuiteForCrossRef=[];
uniqueMDMsERPsForCrossRef=[];
uniqueSources=[];

customerHistory: any[]=[];
  erpSourceTrustObjectsFirstName = {};
  netSuiteSourceTrustObjectsFirstName = {};
  erpSourceTrustObjectsCustID = {};
  netSuiteSourceTrustObjectsCustID = {};
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
  erpSourceTrustObjectsFirstNameForMatch = {};
  netSuiteSourceTrustObjectsFirstNameForMatch = {};
  erpSourceTrustObjectsCustIDForMatch = {};
  netSuiteSourceTrustObjectsCustIDForMatch = {};
  erpSourceTrustObjectsLastNameForMatch = {};
  netSuiteSourceTrustObjectsLastNameForMatch = {};
  erpSourceTrustObjectsGenderForMatch = {};
  netSuiteSourceTrustObjectsGenderForMatch = {};
  erpSourceTrustObjectsBirthDateForMatch = {};
  netSuiteSourceTrustObjectsBirthDateForMatch = {};
  erpSourceTrustObjectsAgeForMatch = {};
  netSuiteSourceTrustObjectsAgeForMatch = {};
  erpSourceTrustObjectsPhoneForMatch = {};
  netSuiteSourceTrustObjectsPhoneForMatch = {};
  erpSourceTrustObjectsEMailForMatch = {};
  netSuiteSourceTrustObjectsEMailForMatch = {};
  erpSourceTrustObjectsloyolScoreForMatch = {};
  netSuiteSourceTrustObjectsloyolScoreForMatch = {};
  maxValue=80.00;
  maxTrustForFName=0;
  maxTrustForLName=0;
  maxTrustForAge=0; 
  maxTrustForGender=0;
  maxTrustForBdate=0;
  maxTrustForPhone=0;
  maxTrustForEmail=0;
  maxTrustForLoyolity=0;

  maxMDMIDForFName=0;
  maxMDMIDForLName=0;
  maxMDMIDForAge=0; 
  maxMDMIDForGender=0;
  maxMDMIDForBdate=0;
  maxMDMIDForPhone=0;
  maxMDMIDForEmail=0;
  maxMDMIDForLoyolity=0;

  maxTrustForFNameForCross=0;
  maxTrustForCustIDForCross=0;
  maxTrustMDMForID=0;
  maxTrustMDMForAge=0;
  maxTrustMDMForGender=0;
  maxTrustMDMForBirth=0;
  maxTrustMDMForPhone=0;
  maxTrustMDMForEMail=0;
  maxTrustMDMForLoyal=0;
  maxTrustMDMForFname=0;
  maxTrustForLNameForCross=0;
  maxTrustForAgeForCross=0; 
  maxTrustForGenderForCross=0;
  maxTrustForBdateForCross=0;
  maxTrustForPhoneForCross=0;
  maxTrustForEmailForCross=0;
  maxTrustForLoyolityForCross=0;
  radioOptions = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
    { label: 'Option C', value: 'C' }
  ];
options = [];
customerIdsArrayForCrossReference=[];
customerIdsArrayForMatches=[];
loadSpinner =false;
radioCategories: any[] =[];
netsuiteArrayForCrossReference=[];
erpArrayForCrossReference=[];
netsuiteArrayForCrossReferenceForMatch=[];
erpArrayForCrossReferenceForMatch=[];
firstNameTrstArray=[];
lastNameTrstArray=[];
genderTrstArray=[];
birthTrstArray=[];
ageTrstArray=[];
phoneTrstArray=[];
emailTrstArray=[];
loyolityTrstArray=[];

firstNameTrstArrayForNetSuitMatch=[];
lastNameTrstArrayForNetSuitMatch=[];
genderTrstArrayForNetSuitMatch=[];
birthTrstArrayForNetSuitMatch=[];
ageTrstArrayForNetSuitMatch=[];
phoneTrstArrayForNetSuitMatch=[];
emailTrstArrayForNetSuitMatch=[];
loyolityTrstArrayForNetSuitMatch=[];


firstNameTrstArrayForCross=[];
lastNameTrstArrayForCross=[];
genderTrstArrayForCross=[];
birthTrstArrayForCross=[];
ageTrstArrayForCross=[];
phoneTrstArrayForCross=[];
emailTrstArrayForCross=[];
loyolityTrstArrayForCross=[];
custIdTrstArrayNetSuitMatchForCross=[];
custIdTrstArrayForCross=[];
firstNameTrstArrayForNetSuitMatchForCross=[];
lastNameTrstArrayForNetSuitMatchForCross=[];
genderTrstArrayForNetSuitMatchForCross=[];
birthTrstArrayForNetSuitMatchForCross=[];
ageTrstArrayForNetSuitMatchForCross=[];
phoneTrstArrayForNetSuitMatchForCross=[];
emailTrstArrayForNetSuitMatchForCross=[];
loyolityTrstArrayForNetSuitMatchForCross=[];

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
    this.custMdmId=this.customerResult['CUSTOMER_MDM_ID'];
    this.custLastName=this.customerResult['LAST_NAME'];
    this.custEmail=this.customerResult['EMAIL'];
    this.custPhone=this.customerResult['PHONE'];
    this.custAddress=this.customerResult['CUSTOMER_ADDRESS'];
    

    this.custAge=this.customerResult['AGE'];;
    this.custGender=this.customerResult['GENDER_CD'];
    this.custCountry=this.customerResult['COUNTRY'];

  this.custRel=this.customerResult['RELATIONSHIP_TYPE_CD'];
   // this.custCountry='UK';
    
    this.loyolScore=this.customerResult['LOYALTY_SCORE'];
let mdmId=this.custMdmId;
let custQueryString= "WHERE CUSTOMER_MDM_ID IN (" +mdmId+ ")";
let matchTrustXRefString="WHERE SRC_CUSTOMER_MDM_ID IN (" +mdmId+ ") OR TGT_CUSTOMER_MDM_ID IN (" +mdmId+ ")";
//WHERE SRC_CUSTOMER_MDM_ID =145  OR TGT_CUSTOMER_MDM_ID =145

    let finalQueryString=custQueryString;
    let finalQueryStringForMatchScreen=matchTrustXRefString;
    // let finalQueryString='where '
    //this.getCustomerHistoryDataByCustomerFromAPI(finalQueryString);
    this.getCrossRefernceForCustomers(finalQueryString);
   // this.getJobRunStatus(finalQueryString);
    this.getMatchRefernceForCustomers(finalQueryString);
    this.getCrossRefernceXReferenceForCustomers(finalQueryString);
    this.getMatchRefernceXReferenceForCustomers(finalQueryStringForMatchScreen);
//    this.getCrossRefernceTrustForCustomers(finalQueryString);
    //this.getMatchRefernceTrustForCustomers(finalQueryString);
    this.formGroup = new FormGroup({
      selectedCategory: new FormControl()
  });
    this.countries = [
      { name: 'US', value: 'US' },
      { name: 'Canada', value: 'Canada' },
      { name: 'UK', value: 'UK' },

  ];
  this.genders = [
    { name: 'M', value: 'M' },
    { name: 'F', value: 'F' }
   
];
this.custType=[
  { name: 'CUST', value: 'CUST' },
  { name: 'CUST1', value: 'CUST1' }
]
  this.radioCategories = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' }
];


    setTimeout(() => {
      this.fadeOut = true;
    }, 5000);
    

    console.log('this config data is',this.dynamicDialogConfig.data['custId']);
  }
  updateRecord(){
    let query='ddd';
    this.updateFromAPI(query);
  }
  
  handleToggleChange(event: any) {
    console.log('Toggled to:', event.checked);
    if(event.checked === true){
      this.isSourceColumnsChecked=true;
    }else{
      this.isSourceColumnsChecked=false;
    }
   
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

  async getMatchRefernceXReferenceForCustomers(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;

    let apiUrl = 'http://localhost:3000/api/matchRefernceXReferenceForCustomers';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
          // this.crossRefernceXReferenceObjForCustomers = response;
          this.matchXReferenceObjForCustomers= response;
          } else {

          }
          resolve();
        },
        error: (error: object) => {
          rejects(error);
        },
        complete: () => {
          //this.customerByCountryResponse=response;
        //  this.processMatchTrustDataForCustomers(this.matchXReferenceObjForCustomers);
     //   this.matchXReferenceObjForCustomers=[...this.matchXReferenceObjForCustomers]
          this.processXReferenceForMatch(this.matchXReferenceObjForCustomers);
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
          let mdmId = this.custMdmId;
          let originalMDMId = mdmId;
          let customerIdsArray=[];
          if (this.crossRefernceXReferenceObjForCustomers.length > 1) {

            let wholeResponse = this.crossRefernceXReferenceObjForCustomers;
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
            originalMDMId = this.crossRefernceXReferenceObjForCustomers[0]['ORIGINAL_MDM_ID'];
            let obj={};
            obj={
              'mdmid':this.crossRefernceXReferenceObjForCustomers[0]['ORIGINAL_MDM_ID'],
              'custid':this.crossRefernceXReferenceObjForCustomers[0]['CUSTOMER_ID']
            }
            customerIdsArray.push( obj);
           // customerIdsArray.push( this.crossRefernceXReferenceObjForCustomers[0]['CUSTOMER_ID']);
          }

         // let originalMDMId = this.crossRefernceXReferenceObjForCustomers[0]['ORIGINAL_MDM_ID'];
         this.customerIdsArrayForCrossReference=customerIdsArray;
         
          let custQueryString = "WHERE CUSTOMER_MDM_ID IN (" + mdmId + "," + originalMDMId + ")";
          console.log('new PI CALL', custQueryString);
          console.log('originalMDMId', originalMDMId);
          let finalQueryString = custQueryString;
          this.getCrossRefernceTrustForCustomers(finalQueryString);
        }
      })
    })

  }
  get maxValueForFirstNameTrstArray(): number {
    return Math.max(...this.firstNameTrstArray);
  }
  get maxValueForLastNameTrstArray(): number {
    return Math.max(...this.firstNameTrstArray);
  }

   createZeroArray(length) {
    return new Array(length).fill(
     { 'mdmid':0,
        'trust':0}
    );
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
    console.log('ERP suite trust value size',erpTrustArray.length);
    console.log('net suite trust value size',netSuiteTrustArray.length);
    this.netsuiteArrayForCrossReference=netSuiteTrustArray;
    this.erpArrayForCrossReference=erpTrustArray;
    this.erpSourceTrustObjectsFirstName = erpTrustArray.find(item => item['COLUMN_NAME'] === 'FIRST_NAME');
    this.netSuiteSourceTrustObjectsFirstName = netSuiteTrustArray.find(item => item['COLUMN_NAME'] === 'FIRST_NAME');

    this.erpSourceTrustObjectsCustID = erpTrustArray.find(item => item['COLUMN_NAME'] === 'CUSTOMER_ID');
    this.netSuiteSourceTrustObjectsCustID = netSuiteTrustArray.find(item => item['COLUMN_NAME'] === 'CUSTOMER_ID');

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

    this.uniqueSourcesForCreossReferences=[... new Set(resposeDataForTrust.map(item =>item['CUSTOMER_MDM_ID']))];

    this.uniqueMDMsERPsForCrossRef=[... new Set(this.erpArrayForCrossReference.map(item =>item['CUSTOMER_MDM_ID']))];
    this.uniqueMDMsForNetSuiteForCrossRef=[... new Set(this.netsuiteArrayForCrossReference.map(item =>item['CUSTOMER_MDM_ID']))];
    
    let erpArrayProcessedDataForCross=[];
let uniqueMdmsArrayForCross=this.uniqueMDMsERPsForCrossRef;

let uniqueMdmsNetSuiteArrayForCross=this.uniqueMDMsForNetSuiteForCrossRef;
let erpForMatchRef=this.erpArrayForCrossReference;
let netSuiteForMatchRef=this.netsuiteArrayForCrossReference;

if (this.uniqueMDMsERPsForCrossRef.length > 0) {
  for (let i = 0; i < uniqueMdmsArrayForCross.length; i++) {
    console.log('elemnt is', uniqueMdmsArrayForCross[i]);

    let objId = uniqueMdmsArrayForCross[i];
    let objSourceData = erpForMatchRef.filter(item => item['CUSTOMER_MDM_ID'] === uniqueMdmsArrayForCross[i]);

    let formattedObject = {};
    formattedObject['mdmIds'] = objId;
    formattedObject['mdmData'] = objSourceData;
    erpArrayProcessedDataForCross.push(formattedObject);

  }
}


console.log('formatted array erpArrayProcessedDataForCross ',erpArrayProcessedDataForCross);

if(erpArrayProcessedDataForCross.length>0){
  const names = erpArrayProcessedDataForCross.map(person => person['mdmData']);

   
  this.custIdTrstArrayForCross= names
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "CUSTOMER_ID"))
  .map(erpData => 
  {
    return {
      mdmid:  erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
     
    };
  });

  this.firstNameTrstArrayForCross = names
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "FIRST_NAME"))
  .map(erpData =>
    // erpData['TRUST_SCORE']
    {
      return {
        mdmid:  erpData['CUSTOMER_MDM_ID'],
        trust: parseInt(erpData['TRUST_SCORE'], 10)
       
      };
    }

  );
  //this.firstNameTrstArray[0]['TRUST_SCORE']=98;
  //this.firstNameTrstArrayForCross = this.firstNameTrstArrayForCross.map(Number);
  let lenghtForERP=0;
  lenghtForERP=  this.firstNameTrstArrayForCross.length;
  this.lastNameTrstArrayForCross = names
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "LAST_NAME"))
  .map(erpData => 
   // erpData['TRUST_SCORE']
    {
      return {
        mdmid:  erpData['CUSTOMER_MDM_ID'],
        trust: parseInt(erpData['TRUST_SCORE'], 10)
       
      };
    }
  
  );
  if( this.lastNameTrstArrayForCross.length === 0 ||  this.lastNameTrstArrayForCross.length<1){
  //   createZeroArray
   this.lastNameTrstArrayForCross =this.createZeroArray(lenghtForERP);
   //Array.from({ lenghtForERP }, () => 0);
  }
  //this.lastNameTrstArrayForCross = this.lastNameTrstArrayForCross.map(Number);

 this.genderTrstArrayForCross= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "GENDER_CD"))
.map(erpData => 
 // erpData['TRUST_SCORE']
 {
  return {
    mdmid:  erpData['CUSTOMER_MDM_ID'],
    trust: parseInt(erpData['TRUST_SCORE'], 10)
   
  };
}
);
if( this.genderTrstArrayForCross.length === 0 ||  this.genderTrstArrayForCross.length<1){

 this.genderTrstArrayForCross = this.createZeroArray(lenghtForERP);
}
//this.genderTrstArrayForCross = this.genderTrstArrayForCross.map(Number);

this.birthTrstArrayForCross= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "BIRTH_DATE"))
.map(erpData => 
 // erpData['TRUST_SCORE']
 {
  return {
    mdmid:  erpData['CUSTOMER_MDM_ID'],
    trust: parseInt(erpData['TRUST_SCORE'], 10)
   
  };
}

);
if( this.birthTrstArrayForCross.length === 0 ||  this.birthTrstArrayForCross.length<1){

 this.birthTrstArrayForCross = this.createZeroArray(lenghtForERP);
}
//this.birthTrstArrayForCross = this.birthTrstArrayForCross.map(Number);


this.ageTrstArrayForCross= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "AGE"))
.map(erpData =>
  // erpData['TRUST_SCORE']
  {
    return {
      mdmid:  erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
     
    };
  }
  );
if( this.ageTrstArrayForCross.length === 0 ||  this.ageTrstArrayForCross.length<1){

//  this.ageTrstArray = [0,0];
}
//this.ageTrstArrayForCross = this.ageTrstArrayForCross.map(Number);
this.phoneTrstArrayForCross= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "PHONE"))
.map(erpData => 
  //erpData['TRUST_SCORE']
  {
    return {
      mdmid:  erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
     
    };
  }
);
if( this.phoneTrstArrayForCross.length === 0 ||  this.phoneTrstArrayForCross.length<1){

  this.phoneTrstArrayForCross = this.createZeroArray(lenghtForERP);
  //  this.ageTrstArray = [0,0];
  }
//this.phoneTrstArrayForCross = this.phoneTrstArrayForCross.map(Number);

this.emailTrstArrayForCross= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "EMAIL"))
.map(erpData => 
  //erpData['TRUST_SCORE']
  {
    return {
      mdmid:  erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
     
    };
  }
);
if( this.emailTrstArrayForCross.length === 0 ||  this.emailTrstArrayForCross.length<1){

  this.emailTrstArrayForCross = this.createZeroArray(lenghtForERP);
 
  }
//this.emailTrstArrayForCross = this.emailTrstArrayForCross.map(Number);

this.loyolityTrstArrayForCross= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "LOYALTY_SCORE"))
.map(erpData => 
 // erpData['TRUST_SCORE']
  {
    return {
      mdmid:  erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
     
    };
  }
);
if( this.loyolityTrstArrayForCross.length === 0 ||  this.loyolityTrstArrayForCross.length<1){

  this.loyolityTrstArrayForCross = this.createZeroArray(lenghtForERP);
 
  }
//this.loyolityTrstArrayForCross = this.loyolityTrstArrayForCross.map(Number);
}
let netSuiteProcessedDataForCross=[];
if (this.uniqueMDMsForNetSuiteForCrossRef.length > 0) {
  for (let i = 0; i < uniqueMdmsNetSuiteArrayForCross.length; i++) {
    console.log('elemnt is', uniqueMdmsNetSuiteArrayForCross[i]);

    let objId = uniqueMdmsNetSuiteArrayForCross[i];
    let objSourceData = netSuiteForMatchRef.filter(item => item['CUSTOMER_MDM_ID'] === uniqueMdmsNetSuiteArrayForCross[i]);

    let formattedObject = {};
    formattedObject['mdmIds'] = objId;
    formattedObject['mdmData'] = objSourceData;
    netSuiteProcessedDataForCross.push(formattedObject);

  }
}
console.log('formatted array netSuiteProcessedDataForCross ',netSuiteProcessedDataForCross);

if(netSuiteProcessedDataForCross.length>0){
  const nameValuesForNet = netSuiteProcessedDataForCross.map(person => person['mdmData']);
 
  this.firstNameTrstArrayForNetSuitMatchForCross = nameValuesForNet
    .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "FIRST_NAME"))
    .map(erpData => 
      //erpData['TRUST_SCORE']
      {
        return {
          mdmid:  erpData['CUSTOMER_MDM_ID'],
          trust: parseInt(erpData['TRUST_SCORE'], 10)
         
        };
      }
    );
 // this.firstNameTrstArrayForNetSuitMatchForCross = this.firstNameTrstArrayForNetSuitMatchForCross.map(Number);
  //this.firstNameTrstArray[0]['TRUST_SCORE']=98;
  let length = this.firstNameTrstArrayForNetSuitMatchForCross.length;
  this.lastNameTrstArrayForNetSuitMatchForCross = nameValuesForNet
    .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "LAST_NAME"))
    .map(erpData => 
    //  erpData['TRUST_SCORE']
    {
      return {
        mdmid:  erpData['CUSTOMER_MDM_ID'],
        trust: parseInt(erpData['TRUST_SCORE'], 10)
       
      };
    }
    );
  if (this.lastNameTrstArrayForNetSuitMatchForCross.length === 0 || this.lastNameTrstArrayForNetSuitMatchForCross.length < 1) {
    //  this.lastNameTrstArrayForNetSuitMatchForCross = Array.from({ length }, () => 0);
    this.lastNameTrstArrayForNetSuitMatchForCross = this.createZeroArray(length);
  }
 // this.lastNameTrstArrayForNetSuitMatchForCross = this.lastNameTrstArrayForNetSuitMatchForCross.map(Number);

  this.custIdTrstArrayNetSuitMatchForCross = nameValuesForNet
  .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "CUSTOMER_ID"))
  .map(erpData =>   {
    return {
      mdmid:  erpData['CUSTOMER_MDM_ID'],
        trust: parseInt(erpData['TRUST_SCORE'], 10)
     
     
    };});

  // if (this.custIdTrstArrayNetSuitMatchForCross.length === 0 || this.custIdTrstArrayNetSuitMatchForCross.length < 1) {
   
  //   this.custIdTrstArrayNetSuitMatchForCross = this.createZeroArray(length);
  // }
  // this.custIdTrstArrayNetSuitMatchForCross = this.custIdTrstArrayNetSuitMatchForCross.map(Number);


  this.genderTrstArrayForNetSuitMatchForCross = nameValuesForNet
    .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "GENDER_CD"))
    .map(erpData => 
    //  erpData['TRUST_SCORE']
    {
      return {
        mdmid:  erpData['CUSTOMER_MDM_ID'],
        trust: parseInt(erpData['TRUST_SCORE'], 10)
       
      };
    }
    );
  if (this.genderTrstArrayForNetSuitMatchForCross.length === 0 || this.genderTrstArrayForNetSuitMatchForCross.length < 1) {
    //  this.genderTrstArrayForNetSuitMatchForCross =Array.from({ length }, () => 0);
    this.genderTrstArrayForNetSuitMatchForCross = this.createZeroArray(length);
  }
 // this.genderTrstArrayForNetSuitMatchForCross = this.genderTrstArrayForNetSuitMatchForCross.map(Number);

  this.birthTrstArrayForNetSuitMatchForCross = nameValuesForNet
    .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "BIRTH_DATE"))
    .map(erpData => 
      
      //erpData['TRUST_SCORE']
      // 
      {
        return {
          mdmid:  erpData['CUSTOMER_MDM_ID'],
          trust: parseInt(erpData['TRUST_SCORE'], 10)
         
        };
      }
      );
  if (this.birthTrstArrayForNetSuitMatchForCross.length === 0 || this.birthTrstArrayForNetSuitMatchForCross.length < 1) {
    // this.birthTrstArrayForNetSuitMatchForCross =Array.from({ length }, () => 0);
    this.birthTrstArrayForNetSuitMatchForCross = this.createZeroArray(length);
  }
  //this.birthTrstArrayForNetSuitMatchForCross = this.birthTrstArrayForNetSuitMatchForCross.map(Number);

  this.ageTrstArrayForNetSuitMatchForCross = nameValuesForNet
    .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "AGE"))
    .map(erpData => 
     // erpData['TRUST_SCORE']
      {
        return {
          mdmid:  erpData['CUSTOMER_MDM_ID'],
          trust: parseInt(erpData['TRUST_SCORE'], 10)
         
        };
      }
    );
  if (this.ageTrstArrayForNetSuitMatchForCross.length === 0 || this.ageTrstArrayForNetSuitMatchForCross.length < 1) {
    // this.birthTrstArrayForNetSuitMatch =Array.from({ length }, () => 0);
    this.ageTrstArrayForNetSuitMatchForCross = this.createZeroArray(length);
  }
 // this.ageTrstArrayForNetSuitMatchForCross = this.ageTrstArrayForNetSuitMatchForCross.map(Number);

  this.phoneTrstArrayForNetSuitMatchForCross = nameValuesForNet
    .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "PHONE"))
    .map(erpData => 
    //  erpData['TRUST_SCORE']
    {
      return {
        mdmid:  erpData['CUSTOMER_MDM_ID'],
        trust: parseInt(erpData['TRUST_SCORE'], 10)
       
      };
    }
    );
  if (this.phoneTrstArrayForNetSuitMatchForCross.length === 0 || this.phoneTrstArrayForNetSuitMatchForCross.length < 1) {
    // this.birthTrstArrayForNetSuitMatch =Array.from({ length }, () => 0);
    this.phoneTrstArrayForNetSuitMatchForCross = this.createZeroArray(length);
  }
 // this.phoneTrstArrayForNetSuitMatchForCross = this.phoneTrstArrayForNetSuitMatchForCross.map(Number);

  this.emailTrstArrayForNetSuitMatchForCross = nameValuesForNet
    .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "EMAIL"))
    .map(erpData => 
     // erpData['TRUST_SCORE']
     {
      return {
        mdmid:  erpData['CUSTOMER_MDM_ID'],
        trust: parseInt(erpData['TRUST_SCORE'], 10)
       
      };
    }
    
    );
  if (this.emailTrstArrayForNetSuitMatchForCross.length === 0 || this.emailTrstArrayForNetSuitMatchForCross.length < 1) {
    // this.birthTrstArrayForNetSuitMatch =Array.from({ length }, () => 0);
    this.emailTrstArrayForNetSuitMatchForCross = this.createZeroArray(length);
  }
 // this.emailTrstArrayForNetSuitMatchForCross = this.emailTrstArrayForNetSuitMatchForCross.map(Number);
  this.loyolityTrstArrayForNetSuitMatchForCross = nameValuesForNet
    .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "LOYALTY_SCORE"))
    .map(erpData =>
      // erpData['TRUST_SCORE']
       {
        return {
          mdmid:  erpData['CUSTOMER_MDM_ID'],
          trust: parseInt(erpData['TRUST_SCORE'], 10)
         
        };
      }
      );
  if (this.loyolityTrstArrayForNetSuitMatchForCross.length === 0 || this.loyolityTrstArrayForNetSuitMatchForCross.length < 1) {

    this.loyolityTrstArrayForNetSuitMatchForCross = this.createZeroArray(length);
  }
 // this.loyolityTrstArrayForNetSuitMatchForCross = this.loyolityTrstArrayForNetSuitMatchForCross.map(Number);




//let combinedCustId=[...this.firstNameTrstArrayForNetSuitMatchForCross, ...this.firstNameTrstArrayForCross];

  let combinedFirstName = [...this.firstNameTrstArrayForNetSuitMatchForCross, ...this.firstNameTrstArrayForCross];
    this.maxTrustForFNameForCross = Math.max(...combinedFirstName.map(combinedFirstName => combinedFirstName.trust));
    let maxTrustSCoreObjectsForFName=combinedFirstName.filter(combinedCustId => combinedCustId.trust ===   this.maxTrustForFNameForCross);
    this.maxTrustMDMForFname= Math.max(...maxTrustSCoreObjectsForFName.map(maxTrustSCoreObjectsForFName => maxTrustSCoreObjectsForFName.mdmid));
    console.log('maxTrusFname', this.maxTrustForFNameForCross);

    const erpArrayForCross=this.firstNameTrstArrayForCross;
    const nscapeArrayForCross=this.firstNameTrstArrayForNetSuitMatchForCross;
    const combinedForIds=erpArrayForCross.concat(nscapeArrayForCross);
let orderdIds=this.customerIdsArrayForCrossReference;
//const orderMap = new Map(combinedForIds.map((mdmid, index) => [mdmid, index]));
//orderdIds.sort((a, b) => orderMap.get(a.mdmid) - orderMap.get(b.mdmid));

//orderdIds.sort((a, b) => combinedForIds.indexOf(a.mdmid) - combinedForIds.indexOf(b.mdmid));

// const common = combinedForIds.filter(obj1 =>
//   orderdIds.some(obj2 => obj2.mdmid === obj1.mdmid)
// );

// orderdIds.sort((a, b) => {
//   return combinedForIds.indexOf(a.mdmid) - combinedForIds.indexOf(b.mdmid);
// });
//const orderMap = new Map(combinedForIds.map((mdmid, index) => [mdmid, index]));

// orderdIds.sort((a, b) => {
//   return orderMap.get(a.mdmid) - orderMap.get(b.mdmid);
// });
const commonArraysForIds = [];

combinedForIds.forEach(obj1 => {
  const match = orderdIds.find(obj2 => obj2.mdmid === obj1.mdmid);
  if (match) {
    commonArraysForIds.push({ ...obj1, ...match }); // merge properties
  }
});

console.log('helllo',commonArraysForIds);
console.log('helllo',orderdIds);
this.customerIdsArrayForCrossReference=commonArraysForIds;

    if (this.maxTrustForFNameForCross === 0 ||combinedFirstName.length < 2 ) {
      this.maxTrustForFNameForCross = 1000;
    }

    //maxTrustForCustIDForCross=0;
    let combinedCustId = [...this.custIdTrstArrayNetSuitMatchForCross, ...this.custIdTrstArrayForCross];
    this.maxTrustForCustIDForCross = Math.max(...combinedCustId.map(combinedCustId => combinedCustId.trust));
   let maxTrustSCoreObjectsForID=combinedCustId.filter(combinedCustId => combinedCustId.trust ===   this.maxTrustForCustIDForCross);
   this.maxTrustMDMForID= Math.max(...maxTrustSCoreObjectsForID.map(maxTrustSCoreObjectsForID => maxTrustSCoreObjectsForID.mdmid));
   console.log('maxTrustForCustIDForCross', this.maxTrustForCustIDForCross);
   console.log('maxTrustMDM ID ForID ', this.maxTrustMDMForID);
    if (this.maxTrustForCustIDForCross === 0 ||combinedCustId.length < 2 ) {
      this.maxTrustForCustIDForCross = 1000;
    }
    let combinedLName = [...this.lastNameTrstArrayForNetSuitMatchForCross, ...this.lastNameTrstArrayForCross];
    this.maxTrustForLNameForCross= Math.max(...combinedLName);
    if (this.maxTrustForLNameForCross === 0 ||combinedLName.length < 2) {
      this.maxTrustForLNameForCross = 1000;
    }

    console.log('maxTrustForLNameForCross', this.maxTrustForLNameForCross);


    let combinedAge = [...this.ageTrstArrayForCross, ...this.ageTrstArrayForNetSuitMatchForCross];
    this.maxTrustForAgeForCross = Math.max(...combinedAge.map(combinedAge => combinedAge.trust));
    let maxTrustSCoreObjectsForAge=combinedAge.filter(combinedAge => combinedAge.trust ===   this.maxTrustForAgeForCross);
    
    this.maxTrustMDMForAge= Math.max(...maxTrustSCoreObjectsForAge.map(maxTrustSCoreObjectsForAge => maxTrustSCoreObjectsForAge.mdmid));
    console.log('maxTrustForAgeForCross', this.maxTrustForAgeForCross);
    if (this.maxTrustForAgeForCross === 0 ||combinedAge.length < 2) {
      this.maxTrustForAgeForCross = 1000;
    }

    let combinedgender = [...this.genderTrstArrayForCross, ...this.genderTrstArrayForNetSuitMatchForCross];
    
    this.maxTrustForGenderForCross = Math.max(...combinedgender.map(combinedgender => combinedgender.trust));
	let maxTrustSCoreObjectsForGender=combinedgender.filter(combinedgender => combinedgender.trust ===   this.maxTrustForGenderForCross);
    this.maxTrustMDMForGender= Math.max(...maxTrustSCoreObjectsForGender.map(maxTrustSCoreObjectsForGender => maxTrustSCoreObjectsForGender.mdmid));
	
    console.log('maxTrustForGenderForCross', this.maxTrustForGenderForCross);
    if (this.maxTrustForGenderForCross === 0 ||combinedgender.length < 2) {
      this.maxTrustForGenderForCross = 1000;
    }



    let combinedBirth = [...this.birthTrstArrayForNetSuitMatchForCross, ...this.birthTrstArrayForCross];
    this.maxTrustForBdateForCross = Math.max(...combinedBirth.map(combinedBirth => combinedBirth.trust));
	let maxTrustSCoreObjectsForBdate=combinedgender.filter(combinedgender => combinedgender.trust ===   this.maxTrustForBdateForCross);
    this.maxTrustMDMForBirth= Math.max(...maxTrustSCoreObjectsForBdate.map(maxTrustSCoreObjectsForBdate => maxTrustSCoreObjectsForBdate.mdmid));
	
	



    // let combinedBirth = [...this.birthTrstArrayForNetSuitMatchForCross, ...this.birthTrstArrayForCross];
    // this.maxTrustForBdateForCross = Math.max(...combinedBirth);
    console.log('maxTrustForBdateForCross', this.maxTrustForBdateForCross);
    if (this.maxTrustForBdateForCross === 0 ||combinedBirth.length < 2) {
      this.maxTrustForBdateForCross = 1000;
    }
    let combinedPhone = [...this.phoneTrstArrayForNetSuitMatchForCross, ...this.phoneTrstArrayForCross];
    this.maxTrustForPhoneForCross = Math.max(...combinedPhone.map(combinedPhone => combinedPhone.trust));
	let maxTrustSCoreObjectsForPhone=combinedPhone.filter(combinedPhone => combinedPhone.trust ===   this.maxTrustForPhoneForCross);
	 this.maxTrustMDMForPhone= Math.max(...maxTrustSCoreObjectsForPhone.map(maxTrustSCoreObjectsForPhone => maxTrustSCoreObjectsForPhone.mdmid));
	 console.log('maxTrustForPhoneForCross', this.maxTrustForPhoneForCross);
    if (this.maxTrustForPhoneForCross === 0 ||combinedPhone.length < 2) {
      this.maxTrustForPhoneForCross = 1000;
    }
    let combinedEmail = [...this.emailTrstArrayForNetSuitMatchForCross, ...this.emailTrstArrayForCross];
    this.maxTrustForEmailForCross = Math.max(...combinedEmail.map(combinedEmail => combinedEmail.trust));
		let maxTrustSCoreObjectsForEmail=combinedEmail.filter(combinedEmail => combinedEmail.trust ===   this.maxTrustForEmailForCross);
		 this.maxTrustMDMForEMail= Math.max(...maxTrustSCoreObjectsForEmail.map(maxTrustSCoreObjectsForEmail => maxTrustSCoreObjectsForEmail.mdmid));

    console.log('maxTrustForEmailForCross', this.maxTrustForEmailForCross);
    if (this.maxTrustForEmailForCross === 0 || combinedEmail.length < 2 ) {
      this.maxTrustForEmailForCross = 1000;
    }
    let combinedLoyol = [...this.loyolityTrstArrayForNetSuitMatchForCross, ...this.loyolityTrstArrayForCross];
    this.maxTrustForLoyolityForCross =  Math.max(...combinedLoyol.map(combinedLoyol => combinedLoyol.trust));
	let maxTrustSCoreObjectsForLoyal=combinedLoyol.filter(combinedLoyol => combinedLoyol.trust ===   this.maxTrustForLoyolityForCross);	
		 this.maxTrustMDMForLoyal= Math.max(...maxTrustSCoreObjectsForLoyal.map(maxTrustSCoreObjectsForLoyal => maxTrustSCoreObjectsForLoyal.mdmid));
	
    console.log('maxTrustForLoyolityForCross', this.maxTrustForLoyolityForCross);
    if (this.maxTrustForLoyolityForCross === 0 || combinedLoyol.length < 2) {
      this.maxTrustForLoyolityForCross = 1000;
    }


}








  }

  processXReferenceForMatch(respose: any) {
    let resposeData=respose[0];
    let wholeResponse=respose;
    if(resposeData){
      this.matchXrefSourceId=resposeData['SRC_CUSTOMER_MDM_ID'];
      this.matchXrefTargetId=resposeData['TGT_CUSTOMER_MDM_ID'];
      let custQueryString ='';
      let custIdswithSourceIds=[];
      if(wholeResponse.length >1){
        let sourceId='';
        let sourceIds=[];
     
        //CUSTOMER_MTCH_ID
        for (let i=0;i<wholeResponse.length;i++){
       //   sourceId=sourceId+','+wholeResponse[i]['SRC_CUSTOMER_MDM_ID'];
          sourceIds.push(wholeResponse[i]['SRC_CUSTOMER_MDM_ID']);
          let obj={
            'mdmid':wholeResponse[i]['SRC_CUSTOMER_MDM_ID'],
            'custid':wholeResponse[i]['CUSTOMER_MTCH_ID'],

          };
          custIdswithSourceIds.push(obj);
        }
        let integerString=sourceIds.join(',');
         custQueryString = "WHERE CUSTOMER_MDM_ID IN (" + integerString + "," + this.matchXrefTargetId + ")";

        // custQueryString = "WHERE CUSTOMER_MDM_ID IN (" + this.matchXrefSourceId + "," + this.matchXrefTargetId + ")";
      }else{
        custQueryString = "WHERE CUSTOMER_MDM_ID IN (" + this.matchXrefSourceId + "," + this.matchXrefTargetId + ")";
      }
      
      this.customerIdsArrayForMatches=custIdswithSourceIds;
    //  let custQueryString = "WHERE CUSTOMER_MDM_ID IN (" + this.matchXrefSourceId + "," + this.matchXrefTargetId + ")";
      
      let finalQueryString = custQueryString;
      this.getMatchRefernceTrustForCustomers(finalQueryString);


    }else{
      this.matchXrefTargetId= this.custMdmId;
      this.matchXrefSourceId= this.custMdmId;
      let mdmId = this.custMdmId;
      let custQueryString = "WHERE CUSTOMER_MDM_ID IN (" + mdmId + "," +mdmId + ")";
     
      let finalQueryString = custQueryString;
      this.getMatchRefernceTrustForCustomers(finalQueryString);
    }
   

    
  

    // const uniqueSourceNames=[... new Set(resposeData.map(item =>item['SRC_SYSTEM_NAME']))];
    // let  erpSourceObject = resposeData.find(item => item['SRC_SYSTEM_NAME'] === 'ERP');
    // let  netSuiteSourceObject = resposeData.find(item => item['SRC_SYSTEM_NAME'] === 'NETSUITE');

    // this.erpSourceObjectForTableData=erpSourceObject;
    // this.netSuiteObjectForTableData=netSuiteSourceObject;

    // console.log('hello log', this.erpSourceObjectForTableData);
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

  async getMatchRefernceTrustForCustomers(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/matchRefernceTrustForCustomers';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe(
        
        (response) =>     {
      //  (response: any) => {

        
          // this.crossRefernceTrustObjForCustomers = response;
          this.matchTrustObjForCustomers=response;
          this.processMatchTrustDataForCustomers( this.matchTrustObjForCustomers);
         
        },
      //  },
      (error) => {
         // rejects(error);
         console.error('API error:', error);
        }
      );
    })

  }
  processMatchTrustDataForCustomers(respose: any) {
    let resposeDataForTrust = respose;
    let resposeDataForTrustMatch = respose;
   let erpTrustArrayForMatch = [];
   let netSuiteTrustArrayForMatch = [];
   for (let i = 0; i < resposeDataForTrustMatch.length; i++) {
     if (resposeDataForTrustMatch[i]['SOURCE_SYSTEM'] === 'ERP') {
       erpTrustArrayForMatch.push(resposeDataForTrustMatch[i]);
     }
     if (resposeDataForTrustMatch[i]['SOURCE_SYSTEM'] === 'NETSUITE') {
       netSuiteTrustArrayForMatch.push(resposeDataForTrustMatch[i]);
     }

    
   }
   console.log('ERP suite trust value size',erpTrustArrayForMatch.length);
   console.log('net suite trust value size',netSuiteTrustArrayForMatch.length);
   console.log('net suite trust value size',netSuiteTrustArrayForMatch.length);
   this.netsuiteArrayForCrossReferenceForMatch=netSuiteTrustArrayForMatch;
   this.erpArrayForCrossReferenceForMatch=erpTrustArrayForMatch;
   

  //  this.firstNameTrstArray= names
  //  .filter(erpData => erpData['COLUMN_NAME'] === "FIRST_NAME")
  //  .map(erpData => erpData['TRUST_SCORE']);

   
  //  this.firstNameTrstArray= erpArrayProcessedData
  //  .filter(erpData => erpData['COLUMN_NAME'] === "FIRST_NAME")
  //  .map(erpData => erpData['TRUST_SCORE']);
   this.erpSourceTrustObjectsFirstNameForMatch = erpTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'FIRST_NAME');
   this.netSuiteSourceTrustObjectsFirstNameForMatch = netSuiteTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'FIRST_NAME');

   this.erpSourceTrustObjectsCustIDForMatch = erpTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'CUSTOMER_ID');
   this.netSuiteSourceTrustObjectsCustIDForMatch = netSuiteTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'CUSTOMER_ID');

   this.erpSourceTrustObjectsLastNameForMatch = erpTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'LAST_NAME');
   this.netSuiteSourceTrustObjectsLastNameForMatch = netSuiteTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'LAST_NAME');

   this.erpSourceTrustObjectsGenderForMatch = erpTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'GENDER_CD');
   this.netSuiteSourceTrustObjectsGenderForMatch = netSuiteTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'GENDER_CD');


   this.erpSourceTrustObjectsBirthDateForMatch = erpTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'BIRTH_DATE');
   this.netSuiteSourceTrustObjectsBirthDateForMatch = netSuiteTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'BIRTH_DATE');


   this.erpSourceTrustObjectsPhoneForMatch = erpTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'PHONE');
   this.netSuiteSourceTrustObjectsPhoneForMatch = netSuiteTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'PHONE');

   this.erpSourceTrustObjectsEMailForMatch = erpTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'EMAIL');
   this.netSuiteSourceTrustObjectsEMailForMatch = netSuiteTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'EMAIL');

   this.erpSourceTrustObjectsloyolScoreForMatch = erpTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'LOYALTY_SCORE');
   this.netSuiteSourceTrustObjectsloyolScoreForMatch = netSuiteTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'LOYALTY_SCORE');

   this.erpSourceTrustObjectsAgeForMatch = erpTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'AGE');
   this.netSuiteSourceTrustObjectsAgeForMatch = netSuiteTrustArrayForMatch.find(item => item['COLUMN_NAME'] === 'AGE');



   

this.uniqueSources=[... new Set(resposeDataForTrustMatch.map(item =>item['CUSTOMER_MDM_ID']))];
this.uniqueMDMs=[... new Set(this.erpArrayForCrossReferenceForMatch.map(item =>item['CUSTOMER_MDM_ID']))];
this.uniqueMDMsForNetSuiteForMatch=[... new Set(this.netsuiteArrayForCrossReferenceForMatch.map(item =>item['CUSTOMER_MDM_ID']))];

let erpArrayProcessedData=[];
let uniqueMdmsArray=this.uniqueMDMs;

let netSuiteArrayProcessedData=[];
let uniqueMdmsArrayForNetSuite=this.uniqueMDMsForNetSuiteForMatch;

//uniqueMdmsArray.sort((a,b) => a-b);
let erpForMatchRef=this.erpArrayForCrossReferenceForMatch;
 if (this.uniqueMDMs.length > 0) {
   for (let i = 0; i < uniqueMdmsArray.length; i++) {
     console.log('elemnt is', uniqueMdmsArray[i]);

     let objId = uniqueMdmsArray[i];
     let objSourceData = erpForMatchRef.filter(item => item['CUSTOMER_MDM_ID'] === uniqueMdmsArray[i]);

     let formattedObject = {};
     formattedObject['mdmIds'] = objId;
     formattedObject['mdmData'] = objSourceData;
     erpArrayProcessedData.push(formattedObject);

   }
 }
 console.log('formatted array',erpArrayProcessedData);
 if(erpArrayProcessedData.length>0){
 const names = erpArrayProcessedData.map(person => person['mdmData']);
 
 this.firstNameTrstArray = names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "FIRST_NAME"))
.map(erpData =>
  // erpData['TRUST_SCORE']
{
  return {
    mdmid: erpData['CUSTOMER_MDM_ID'],
    trust: parseInt(erpData['TRUST_SCORE'], 10)

  };
}
  );
//this.firstNameTrstArray[0]['TRUST_SCORE']=98;
//this.firstNameTrstArray = this.firstNameTrstArray.map(Number);
let lenghtForERP=0;
lenghtForERP=  this.firstNameTrstArray.length;
//  let arrayLen=2;
//  let length1= this.firstNameTrstArrayForNetSuitMatch.length;
//        this.lastNameTrstArrayForNetSuitMatch = Array.from({ length1 }, () => 0);
this.lastNameTrstArray = names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "LAST_NAME"))
.map(erpData =>
   //erpData['TRUST_SCORE']
   {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }
  );
if( this.lastNameTrstArray.length === 0 ||  this.lastNameTrstArray.length<1){
//   createZeroArray
 this.lastNameTrstArray =this.createZeroArray(lenghtForERP);
 //Array.from({ lenghtForERP }, () => 0);
}
//this.lastNameTrstArray = this.lastNameTrstArray.map(Number);
this.genderTrstArray= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "GENDER_CD"))
.map(erpData => 
  //erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }
);
if( this.genderTrstArray.length === 0 ||  this.genderTrstArray.length<1){

 this.genderTrstArray = this.createZeroArray(lenghtForERP);
}
//this.genderTrstArray = this.genderTrstArray.map(Number);
this.birthTrstArray= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "BIRTH_DATE"))
.map(erpData =>
   //erpData['TRUST_SCORE']
   {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }
  
  );
if( this.birthTrstArray.length === 0 ||  this.birthTrstArray.length<1){

 this.birthTrstArray = this.createZeroArray(lenghtForERP);
}
//this.birthTrstArray = this.birthTrstArray.map(Number);
this.ageTrstArray= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "AGE"))
.map(erpData => 
 // erpData['TRUST_SCORE']
 {
  return {
    mdmid: erpData['CUSTOMER_MDM_ID'],
    trust: parseInt(erpData['TRUST_SCORE'], 10)

  };
}

);
if( this.ageTrstArray.length === 0 ||  this.ageTrstArray.length<1){

//  this.ageTrstArray = [0,0];
}
//this.ageTrstArray = this.ageTrstArray.map(Number);
this.phoneTrstArray= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "PHONE"))
.map(erpData => 
 // erpData['TRUST_SCORE']
 {
  return {
    mdmid: erpData['CUSTOMER_MDM_ID'],
    trust: parseInt(erpData['TRUST_SCORE'], 10)

  };
}

);
//this.phoneTrstArray = this.phoneTrstArray.map(Number);
this.emailTrstArray= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "EMAIL"))
.map(erpData => 
 // erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }
);
//this.emailTrstArray = this.emailTrstArray.map(Number);
this.loyolityTrstArray= names
.flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "LOYALTY_SCORE"))
.map(erpData => 
 // erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }
);

}

//this.loyolityTrstArray = this.loyolityTrstArray.map(Number);
// let netSuiteForMatchRef=this.erpArrayForCrossReferenceForMatch;
let netSuiteForMatchRef=this.netsuiteArrayForCrossReferenceForMatch;
 if (this.uniqueMDMsForNetSuiteForMatch.length > 0) {
   for (let i = 0; i < uniqueMdmsArrayForNetSuite.length; i++) {

     let objId = uniqueMdmsArrayForNetSuite[i];
     let objSourceData = netSuiteForMatchRef.filter(item => item['CUSTOMER_MDM_ID'] === uniqueMdmsArrayForNetSuite[i]);
     let formattedObject = {};
     formattedObject['mdmIds'] = objId;
     formattedObject['mdmData'] = objSourceData;
     netSuiteArrayProcessedData.push(formattedObject);
   }
 }
 
 if(netSuiteArrayProcessedData.length >0){
 const nameValuesForNet = netSuiteArrayProcessedData.map(person => person['mdmData']);

 this.firstNameTrstArrayForNetSuitMatch = nameValuesForNet
 .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "FIRST_NAME"))
 .map(erpData => 
  //erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }

);
 //this.firstNameTrstArrayForNetSuitMatch = this.firstNameTrstArrayForNetSuitMatch.map(Number);
 //this.firstNameTrstArray[0]['TRUST_SCORE']=98;
 let length= this.firstNameTrstArrayForNetSuitMatch.length;
 this.lastNameTrstArrayForNetSuitMatch = nameValuesForNet
 .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "LAST_NAME"))
 .map(erpData => 
  //erpData['TRUST_SCORE']
  {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }

);
 if( this.lastNameTrstArrayForNetSuitMatch.length === 0 ||  this.lastNameTrstArrayForNetSuitMatch.length<1){
  //  this.lastNameTrstArrayForNetSuitMatch = Array.from({ length }, () => 0);
    this.lastNameTrstArrayForNetSuitMatch = this.createZeroArray(length);
 }
 //this.lastNameTrstArrayForNetSuitMatch = this.lastNameTrstArrayForNetSuitMatch.map(Number);
 this.genderTrstArrayForNetSuitMatch= nameValuesForNet
 .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "GENDER_CD"))
 .map(erpData => 
  {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }

 );
 if( this.genderTrstArrayForNetSuitMatch.length === 0 ||  this.genderTrstArrayForNetSuitMatch.length<1){
 //  this.genderTrstArrayForNetSuitMatch =Array.from({ length }, () => 0);
 this.genderTrstArrayForNetSuitMatch = this.createZeroArray(length);
 }
 //this.genderTrstArrayForNetSuitMatch = this.genderTrstArrayForNetSuitMatch.map(Number);
 this.birthTrstArrayForNetSuitMatch= nameValuesForNet
 .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "BIRTH_DATE"))
 .map(erpData =>
  {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }
  );
 if( this.birthTrstArrayForNetSuitMatch.length === 0 ||  this.birthTrstArrayForNetSuitMatch.length<1){
  // this.birthTrstArrayForNetSuitMatch =Array.from({ length }, () => 0);
  this.birthTrstArrayForNetSuitMatch =this.createZeroArray(length);
 }
 //this.birthTrstArrayForNetSuitMatch = this.birthTrstArrayForNetSuitMatch.map(Number);
 this.ageTrstArrayForNetSuitMatch= nameValuesForNet
 .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "AGE"))
 .map(erpData => 
  {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }
);
 if( this.ageTrstArrayForNetSuitMatch.length === 0 ||  this.ageTrstArrayForNetSuitMatch.length<1){
   // this.birthTrstArrayForNetSuitMatch =Array.from({ length }, () => 0);
  this.ageTrstArrayForNetSuitMatch =this.createZeroArray(length);
  }
  //this.ageTrstArrayForNetSuitMatch = this.ageTrstArrayForNetSuitMatch.map(Number);
 this.phoneTrstArrayForNetSuitMatch= nameValuesForNet
 .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "PHONE"))
 .map(erpData => 
  {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }
);
 //this.phoneTrstArrayForNetSuitMatch = this.phoneTrstArrayForNetSuitMatch.map(Number);
 this.emailTrstArrayForNetSuitMatch= nameValuesForNet
 .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "EMAIL"))
 .map(erpData => 
  {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }
);
 //this.emailTrstArrayForNetSuitMatch = this.emailTrstArrayForNetSuitMatch.map(Number);
 this.loyolityTrstArrayForNetSuitMatch= nameValuesForNet
 .flatMap(group => group.filter(erpData => erpData['COLUMN_NAME'] === "LOYALTY_SCORE"))
 .map(erpData =>
  {
    return {
      mdmid: erpData['CUSTOMER_MDM_ID'],
      trust: parseInt(erpData['TRUST_SCORE'], 10)
  
    };
  }
  );
 //this.loyolityTrstArrayForNetSuitMatch = this.loyolityTrstArrayForNetSuitMatch.map(Number);
}

    // let combinedFirstName = [...this.firstNameTrstArrayForNetSuitMatch, ...this.firstNameTrstArray];
    // this.maxTrustForFName = Math.max(...combinedFirstName);
    let combinedFirstName = [...this.firstNameTrstArrayForNetSuitMatch, ...this.firstNameTrstArray];
    this.maxTrustForFName = Math.max(...combinedFirstName.map(combinedFirstName => combinedFirstName.trust));
    let maxTrustSCoreObjectsForFName=combinedFirstName.filter(combinedFirstName => combinedFirstName.trust ===   this.maxTrustForFName);
    this.maxMDMIDForFName= Math.max(...maxTrustSCoreObjectsForFName.map(maxTrustSCoreObjectsForFName => maxTrustSCoreObjectsForFName.mdmid));
    
    const erpArrayForCross=this.firstNameTrstArray;
    const nscapeArrayForCross=this.firstNameTrstArrayForNetSuitMatch;
    const combinedForIds=erpArrayForCross.concat(nscapeArrayForCross);
    let orderdIdsForMatch=this.customerIdsArrayForMatches;
    //const missing = array1.filter(item => !array2.includes(item));
    //const missingInArr2 = combinedForIds.filter(obj => !orderdIdsForMatch.has(obj.mdmid));
    const missing = this.findMissingByKey(combinedForIds, orderdIdsForMatch, 'mdmid');
    console.log('missing &&&&&&& ',missing);
    let missingObj={
      'mdmid':missing[0]['mdmid'],
      'custid':null
    }
    orderdIdsForMatch.push(missingObj);
    //findMissingByKey
    const commonArraysForIds = [];

combinedForIds.forEach(obj1 => {
  const match = orderdIdsForMatch.find(obj2 => obj2.mdmid === obj1.mdmid);
  if (match) {
    commonArraysForIds.push({ ...obj1, ...match }); // merge properties
  }
});

console.log('helllo',commonArraysForIds);
//console.log('helllo',orderdIds);
this.customerIdsArrayForMatches=commonArraysForIds;
    console.log('maxTrusFname', this.maxTrustForFName);
    console.log('helllo',commonArraysForIds);
    let emptyObje={
      'mdmid':this.custMdmId,
      'custid':this.crossRefernceObjForCustomers?.['CUSTOMER_ID']
    }
    if(this.customerIdsArrayForMatches.length===0 ){
      this.customerIdsArrayForMatches.push(emptyObje);
    }
    if (this.maxTrustForFName === 0 ||combinedFirstName.length < 2 ) {
      this.maxTrustForFName = 1000;
    }
    let combinedLName = [...this.lastNameTrstArrayForNetSuitMatch, ...this.lastNameTrstArray];
    this.maxTrustForLName= Math.max(...combinedLName.map(combinedLName => combinedLName.trust)); Math.max(...combinedLName);
	 let maxTrustSCoreObjectsForLName=combinedLName.filter(combinedLName => combinedLName.trust ===   this.maxTrustForLName);
	
	 this.maxMDMIDForLName= Math.max(...maxTrustSCoreObjectsForLName.map(maxTrustSCoreObjectsForLName => maxTrustSCoreObjectsForLName.mdmid));


    if (this.maxTrustForLName === 0 ||combinedLName.length < 2) {
      this.maxTrustForLName = 1000;
    }

    console.log('maxTrustForLName', this.maxTrustForLName);

    // let combinedAge = [...this.ageTrstArray, ...this.ageTrstArrayForNetSuitMatch];
    // this.maxTrustForAge = Math.max(...combinedAge);
    let combinedAge = [...this.ageTrstArray, ...this.ageTrstArrayForNetSuitMatch];
 
    this.maxTrustForAge= Math.max(...combinedAge.map(combinedAge => combinedAge.trust)); 
    //Math.max(...combinedAge);
      let maxTrustSCoreObjectsForAge=combinedAge.filter(combinedAge => combinedAge.trust ===   this.maxTrustForAge);
     
      this.maxMDMIDForAge= Math.max(...maxTrustSCoreObjectsForAge.map(maxTrustSCoreObjectsForAge => maxTrustSCoreObjectsForAge.mdmid));
   
    console.log('maxTrustForAge', this.maxTrustForAge);
    if (this.maxTrustForAge === 0 ||combinedAge.length < 2) {
      this.maxTrustForAge = 1000;
    }
    // let combinedgender = [...this.genderTrstArray, ...this.genderTrstArrayForNetSuitMatch];
    // this.maxTrustForGender = Math.max(...combinedgender);
    let combinedgender = [...this.genderTrstArray, ...this.genderTrstArrayForNetSuitMatch];
    this.maxTrustForGender =  Math.max(...combinedgender.map(combinedgender => combinedgender.trust));
	let maxTrustSCoreObjectsForGender=combinedgender.filter(combinedgender => combinedgender.trust ===   this.maxTrustForGender);
	 this.maxMDMIDForGender= Math.max(...maxTrustSCoreObjectsForGender.map(maxTrustSCoreObjectsForGender => maxTrustSCoreObjectsForGender.mdmid));
	
    console.log('maxTrustForGender', this.maxTrustForGender);
    if (this.maxTrustForGender === 0 ||combinedgender.length < 2) {
      this.maxTrustForGender = 1000;
    }
    // let combinedBirth = [...this.birthTrstArrayForNetSuitMatch, ...this.birthTrstArray];
    // this.maxTrustForBdate = Math.max(...combinedBirth);
    let combinedBirth = [...this.birthTrstArrayForNetSuitMatch, ...this.birthTrstArray];
    this.maxTrustForBdate =  Math.max(...combinedBirth.map(combinedBirth => combinedBirth.trust)); 
	let maxTrustSCoreObjectsForBday=combinedBirth.filter(combinedBirth => combinedBirth.trust ===   this.maxTrustForBdate);
	 this.maxMDMIDForBdate= Math.max(...maxTrustSCoreObjectsForBday.map(maxTrustSCoreObjectsForBday => maxTrustSCoreObjectsForBday.mdmid));
	
    console.log('maxTrustForBdate', this.maxTrustForBdate);
    if (this.maxTrustForBdate === 0 ||combinedBirth.length < 2) {
      this.maxTrustForBdate = 1000;
    }
    // let combinedPhone = [...this.phoneTrstArray, ...this.phoneTrstArrayForNetSuitMatch];
    // this.maxTrustForPhone = Math.max(...combinedPhone);
    let combinedPhone = [...this.phoneTrstArray, ...this.phoneTrstArrayForNetSuitMatch];
    this.maxTrustForPhone = Math.max(...combinedPhone.map(combinedPhone => combinedPhone.trust));
	let maxTrustSCoreObjectsForPhn=combinedPhone.filter(combinedPhone => combinedPhone.trust ===   this.maxTrustForPhone);
 this.maxMDMIDForPhone= Math.max(...maxTrustSCoreObjectsForPhn.map(maxTrustSCoreObjectsForPhn => maxTrustSCoreObjectsForPhn.mdmid));
	
    console.log('maxTrustForPhone', this.maxTrustForPhone);
    if (this.maxTrustForPhone === 0 ||combinedPhone.length < 2) {
      this.maxTrustForPhone = 1000;
    }
    // let combinedEmail = [...this.emailTrstArray, ...this.emailTrstArrayForNetSuitMatch];
    // this.maxTrustForEmail = Math.max(...combinedEmail);
    let combinedEmail = [...this.emailTrstArray, ...this.emailTrstArrayForNetSuitMatch];
    this.maxTrustForEmail = Math.max(...combinedEmail.map(combinedEmail => combinedEmail.trust)); 
	let maxTrustSCoreObjectsForEmail=combinedEmail.filter(combinedEmail => combinedEmail.trust ===   this.maxTrustForEmail);
	this.maxMDMIDForEmail= Math.max(...maxTrustSCoreObjectsForEmail.map(maxTrustSCoreObjectsForEmail => maxTrustSCoreObjectsForEmail.mdmid));
	
    console.log('maxTrustForEmail', this.maxTrustForEmail);
    if (this.maxTrustForEmail === 0 || combinedEmail.length < 2 ) {
      this.maxTrustForEmail = 1000;
    }
    // let combinedLoyol = [...this.loyolityTrstArrayForNetSuitMatch, ...this.loyolityTrstArray];
    // this.maxTrustForLoyolity = Math.max(...combinedLoyol);
    let combinedLoyol = [...this.loyolityTrstArrayForNetSuitMatch, ...this.loyolityTrstArray];
    this.maxTrustForLoyolity = Math.max(...combinedLoyol.map(combinedLoyol => combinedLoyol.trust)); 
	  let maxTrustSCoreObjectsForLoyol=combinedLoyol.filter(combinedLoyol => combinedLoyol.trust ===   this.maxTrustForLoyolity);
		this.maxMDMIDForLoyolity= Math.max(...maxTrustSCoreObjectsForLoyol.map(maxTrustSCoreObjectsForLoyol => maxTrustSCoreObjectsForLoyol.mdmid));
    console.log('maxTrustForLoyolity', this.maxTrustForLoyolity);
    if (this.maxTrustForLoyolity === 0 || combinedLoyol.length < 2) {
      this.maxTrustForLoyolity = 1000;
    }
}
 findMissingByKey(arr1, arr2, key) {
  const valueSet = new Set(arr2.map(obj => obj[key]));
  return arr1.filter(obj => !valueSet.has(obj[key]));
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
  async getMatchRefernceForCustomers(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/matchRefernceForCustomers';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
            this.matchRefernceObjForCustomers = response[0];
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

  async getJobRunStatus(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/runJobs';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {

          if (response) {
           // this.crossRefernceObjForCustomers = response[0];
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
          let finalQueryString='where '
          this.getJobRunStatusLog(finalQueryString);
        }
      })
    })

  }
  async getJobRunStatusLog(queryForAPI: string): Promise<void> {
    let builtString = queryForAPI;
    let apiUrl = 'http://localhost:3000/api/jobsLog';
    return new Promise((resolve, rejects) => {
      this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
        next: (response: any) => {
  
          if (response) {
           // this.crossRefernceObjForCustomers = response[0];
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
    this.loadSpinner=true;
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
          this.loadSpinner=false;
        },
        complete: () => {
          //this.customerByCountryResponse=response;
          this.processHistoryDataForSystemName(this.customerHistory);
          this.loadSpinner=false;
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
    let mdmIdForQuery=this.custMdmId;
    // let startDate='2025-05-15';
    // let endDate='2025-05-20';
     let timestampStart = `${startDate} ${startTime}`
      let timestampEnd = `${endDate} ${endTime}`
   // custHistoryQueryString= ' WHERE HIST_CREATE_DATE BETWEEN TO_TIMESTAMP_NTZ ('+timestampStart+') AND TO_TIMESTAMP_NTZ ('+timestampEnd+ ') AND CUSTOMER_MDM_ID =769 ORDER BY HIST_CREATE_DATE desc;'
    custHistoryQueryString= `WHERE HIST_CREATE_DATE BETWEEN '${startDate}' AND '${endDate}' and  CUSTOMER_MDM_ID ='${mdmIdForQuery} 'ORDER BY HIST_CREATE_DATE desc `;
   // custHistoryQueryString= `WHERE HIST_CREATE_DATE BETWEEN '${startDate}' AND '${endDate}' and  CUSTOMER_MDM_ID =769 ORDER BY HIST_CREATE_DATE desc `;
      
    
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
        historyDataObject[i]['GENDER_CD_Old'] = historyDataObject[i]['GENDER_CD'];
        historyDataObject[i]['BIRTH_DATE_Old'] = historyDataObject[i]['BIRTH_DATE'];
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
