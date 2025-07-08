import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MDMService } from 'src/app/Services/mdm-service';
import { Select } from 'primeng/select';
import { MultiSelectModule } from "primeng/multiselect";
import { DialogService, DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [TableModule, ButtonModule,MultiSelectModule,DialogModule,Select,FormsModule,CommonModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
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
  selectedItemsFromAPI=[];
  userId=0;
   constructor(public dynamicDialogRef:DynamicDialogRef, 
      public dynamicDialogConfig:DynamicDialogConfig,
      private dialogService:DialogService,
      private mdmService: MDMService
    ){}
    ngOnInit() {
      
  this.userRoles = [
    { id: 1, name: 'Read Only Role' },
    { id: 101, name: 'Data Steward' },
    { id: 102, name: 'Manager' },
    { id: 103, name: 'Sr. Manager' },

  ];
      this.userId=this.dynamicDialogConfig.data['custId']; 
      this.userName=this.dynamicDialogConfig['data']['userObj']['USERNAME'];
      this.firstName=this.dynamicDialogConfig['data']['userObj']['FIRSTNAME']
      this.lastName=this.dynamicDialogConfig['data']['userObj']['LASTNAME']
      this.phoneNumber=this.dynamicDialogConfig['data']['userObj']['PHONE']
      this.email=this.dynamicDialogConfig['data']['userObj']['EMAIL']
      
      let permissionObjForDel={
        // custId: this.custId,
        //userName:userName,
        userid:this.userId,
         
       };
      
      this.getUserRoles(permissionObjForDel); 
      
      
    }
  updateUser() {
    this.updateUserwithAPI()
  }

 

  async getUserRoles(userObj:any) : Promise<void>{
    let apiUrl = 'http://localhost:3000/api/getUserRolesForDetails';
   
    
     return new Promise((resolve,rejects) =>{
      this.mdmService.sendPostRequestToAPI(apiUrl,userObj).subscribe({
        next:(response:any) =>{
          
          if(response){
            this.selectedItemsFromAPI=response;
            console.log('roles are',this.selectedRoles);
            // this.customers=response;
            // this.totalRecords= this.customers.length;
           // this.showSuccess=true;
          //  let roles=this.selectedRoles;
          //  for(var  i=0;i<roles.length;i++){
          //   this.updateUserRoles(roles[i]);
          //  }
           
          }else{
  
          }
          resolve();
        },
        error:(error:object) =>{
          rejects(error);
        },
        complete:() =>{
         let rolesFromAPI=this.selectedItemsFromAPI;
          let newArray = [];
          for (var i = 0; i < rolesFromAPI.length; i++) {
            let roleName='Data Steward';
            
            newArray.push(rolesFromAPI[i]['ROLE_ID']);
          }
          console.log('newArray',newArray);
          this.selectedRoles=newArray;
        }
      })
    })
  }

    async updateUserwithAPI() : Promise<void>{
      let apiUrl = 'http://localhost:3000/api/updateUserDetails';
      let userObj={
        custId: this.userId,
        custUserName:this.userName,
         custFirstName: this.firstName,
         custLastName:this.lastName,
         custEmail:this.email,
         custPhone:this.phoneNumber
        
       };
       return new Promise((resolve,rejects) =>{
        this.mdmService.sendPostRequestToAPI(apiUrl,userObj).subscribe({
          next:(response:any) =>{
            
            if(response){
              // this.customers=response;
              // this.totalRecords= this.customers.length;
             // this.showSuccess=true;
             let roles=this.selectedRoles;
             for(var  i=0;i<roles.length;i++){
              this.updateUserRoles(roles[i]);
             }
             
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

    async updateUserRoles(role:any) : Promise<void>{
      let apiUrl = 'http://localhost:3000/api/updateUserRoles';
      let userObj={
        custId: this.userId,
       
         userRoles:role
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
}
