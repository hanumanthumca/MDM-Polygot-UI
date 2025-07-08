import { Component , ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MDMService } from 'src/app/Services/mdm-service';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
//import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MultiSelectModule } from "primeng/multiselect";
import { UserEditComponent } from '../user-edit/user-edit.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, ButtonModule,MultiSelectModule,DialogModule,Select,FormsModule,CommonModule],
  templateUrl: './users.component.html',
  providers:[MessageService,DialogService],
  styleUrl: './users.component.scss'
})
// constructor(public dynamicDialogRef:DynamicDialogRef, 
//     public dynamicDialogConfig:DynamicDialogConfig,
//     private dialogService:DialogService,
//     private mdmService: MDMService
//   ){}
export class UsersComponent {

constructor(private mdmService: MDMService ,private dialogService:DialogService,
        private messageService:MessageService) {}

@ViewChild("myCustTable") myCustTable:Table | undefined;
  users=[];
  userName='';
  firstName='';
  lastName='';
  email='';
  rows = 10;
  first = 0;
  totalRecords=0;
  phoneNumber='';
  userRoles=[];
  selectedRoles = [];
  queryTableDisplay:boolean =false;
  ngOnInit() {
    
 let finalQueryString='where ';
  this.getAllCustomers(finalQueryString);
  this.getAllUserRoles(finalQueryString);

  this.userRoles = [
    { id: 1, name: 'Read Only Role' },
    { id: 101, name: 'Data Steward' },
    { id: 102, name: 'Manager' },
    { id: 103, name: 'Sr. Manager' },

  ];
}


createNewUser(){
  this.queryTableDisplay=true;
}
u
pageChange(event) {
  this.first = event.first;
  this.rows = event.rows;
}
submitUser(){
  console.log('hello');
  console.log('hello');
  console.log('hello');
  this.createUserwithAPI();
}
async createUserwithAPI() : Promise<void>{

 

  let apiUrl = 'http://localhost:3000/api/createUser';
  let userPwd=this.generatePassword();
  //let serRoles=this.selectedRoles;
 // let userPwd=this.userName+this.phoneNumber;
  let userObj={
   // custId: this.custId,
   custUserName:this.userName,
   custPwd:userPwd,
    custFirstName: this.firstName,
    custLastName:this.lastName,
    custEmail:this.email,
    custPhone:this.phoneNumber,
  
    
  };
  return new Promise((resolve,rejects) =>{
    this.mdmService.sendPostRequestToAPI(apiUrl,userObj).subscribe({
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
       
      }
    })
  })
}

 generatePassword() {
  ///const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  let length = 12
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

 viewUser(user:any){
    let emailid=user['EMAIL'];
    let id=user['USER_ID'];
    console.log('email is',emailid);

    const viewComponentForCust =this.dialogService.open(UserEditComponent,{
  
      data:{
        custId:id,
        userObj:user,
      },
      width:"30 rem",
      header:"Edit User Details",
      closable:true
    });
    viewComponentForCust.onClose.subscribe((result) =>{
      let finalQueryString='where ';
  this.getAllCustomers(finalQueryString);
    })
   }

   async  getAllUserRoles(queryForAPI:string): Promise<void>{
    
    let builtString=queryForAPI;
  let apiUrl = 'http://localhost:3000/api/getAllUserRoles';
  return new Promise((resolve,rejects) =>{
    this.mdmService.getRequestForAPI(apiUrl,"?buildQuery="+builtString).subscribe({
      next:(response:any) =>{
        
        if(response){
       // this.customerByCountryResponse=response;
       //this.customerCountBySystemName=response;
      // this.users=response;
       //this.totalRecords=  this.users.length;
        }else{

        }
        resolve();
      },
      error:(error:object) =>{
        rejects(error);
      },
      complete:() =>{
       // this.users=response;
          //this.customerByC
          // ountryResponse=response;
         // this.processGraphDataForSystemName(this.customerCountBySystemName);

          
      }
    })
  })

  }
async getAllCustomers(queryForAPI:string) : Promise<void>{
   
  let builtString=queryForAPI;
  let apiUrl = 'http://localhost:3000/api/getAllUsers';
  return new Promise((resolve,rejects) =>{
    this.mdmService.getRequestForAPI(apiUrl,"?buildQuery="+builtString).subscribe({
      next:(response:any) =>{
        
        if(response){
       // this.customerByCountryResponse=response;
       //this.customerCountBySystemName=response;
       this.users=response;
       this.totalRecords=  this.users.length;
        }else{

        }
        resolve();
      },
      error:(error:object) =>{
        rejects(error);
      },
      complete:() =>{
       // this.users=response;
          //this.customerByC
          // ountryResponse=response;
         // this.processGraphDataForSystemName(this.customerCountBySystemName);

          
      }
    })
  })
    
  }
}

