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
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, ButtonModule,DialogModule,Select,FormsModule,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
// constructor(public dynamicDialogRef:DynamicDialogRef, 
//     public dynamicDialogConfig:DynamicDialogConfig,
//     private dialogService:DialogService,
//     private mdmService: MDMService
//   ){}
export class UsersComponent {

constructor(private mdmService: MDMService ) {}

@ViewChild("myCustTable") myCustTable:Table | undefined;
  users=[];
  userName='';
  firstName='';
  lastName='';
  email='';
  phoneNumber='';
  queryTableDisplay:boolean =false;
  ngOnInit() {
    
 let finalQueryString='where ';
  this.getAllCustomers(finalQueryString);
}
createNewUser(){
  this.queryTableDisplay=true;
}

submitUser(){
  console.log('hello');
  console.log('hello');
  console.log('hello');
  this.createUserwithAPI();
}
async createUserwithAPI() : Promise<void>{

 

  let apiUrl = 'http://localhost:3000/api/createUser';
  let userObj={
   // custId: this.custId,
   custUserName:this.userName,
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

