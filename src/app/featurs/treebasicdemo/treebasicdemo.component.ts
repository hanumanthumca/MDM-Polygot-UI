import { Component, OnInit } from '@angular/core';
//import { ImportsModule } from './imports';
import { TreeNode } from 'primeng/api';
//import { NodeService } from '@/service/nodeservice';
import { Tree } from 'primeng/tree';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
//import {MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { RadioButtonModule } from 'primeng/radiobutton';
//import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { MDMService } from 'src/app/Services/mdm-service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

interface PermissionNode {
  name: string;
  read: boolean;
  write: boolean;
  create:boolean;
  delete:boolean;
  readIndeterminate?: boolean;
  writeIndeterminate?: boolean;
  createIndeterminate?: boolean;
  deleteIndeterminate?: boolean;
  children?: PermissionNode[];
}

interface FlatNode {
  name: string;
  level: number;
  expandable: boolean;
  read: boolean;
  write: boolean;
  create:boolean;
  delete:boolean;
  readIndeterminate?: boolean;
  writeIndeterminate?: boolean;
  createIndeterminate?: boolean;
  deleteIndeterminate?: boolean;
  parent?: FlatNode;
}
const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

@Component({
  selector: 'app-treebasicdemo',
  standalone: true,
   //imports: [TreeModule,CommonModule,FormsModule,CheckboxModule,MatButtonModule,MatInputModule,MatDialogModule],

imports: [CommonModule,FormsModule,MatTreeModule, Select,RadioButtonModule,ButtonModule,MatButtonModule, MatIconModule,MatCheckboxModule,TreeModule,CheckboxModule,MatInputModule,MatDialogModule],
   templateUrl: './treebasicdemo.component.html',
  styleUrl: './treebasicdemo.component.scss'
})
export class TreebasicdemoComponent {
  selectedColor: string = '';
  colors: string[] = ['Data Manager', 'Data Steward', 'Data Admin'];
  userNames=[];
  selectedUserName=[];
  roles=[];
  selectedRole=[];
  files: TreeNode[]=[];
  childrenAccessor = (node: FoodNode) => node.children ?? [];
  private transformer = (node: PermissionNode, level: number, parent?: FlatNode): FlatNode => {
    const flatNode: FlatNode = {
      name: node.name,
      level,
      expandable: !!node.children && node.children.length > 0,
      read: node.read,
      write: node.write,
       create: node.create,
      delete: node.delete,
      readIndeterminate: node.readIndeterminate,
      writeIndeterminate: node.writeIndeterminate,
      createIndeterminate: node.createIndeterminate,
      deleteIndeterminate: node.deleteIndeterminate,
      parent
    };
    return flatNode;
  };
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener<PermissionNode, FlatNode>(
    (node, level) => this.transformer(node, level),
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
   //
   constructor(private mdmService: MDMService) {
    this.dataSource.data = this.buildPermissionTree();
  }
  hasChild = (_: number, node: FlatNode) => node.expandable;
  ngOnInit() {
   // colors: string[] = ['Data Manager', 'Data Steward', 'Data Admin'];
    this.roles = [
    
      { name: 'Data Steward', value: '101' },
      { name: 'Manager', value: '102' },
      { name: 'Sr.Manager', value: '103' },
      
      { name: 'Read Only Role', value: '1' },
     ];

    //  this.userRoles = [
    //   { id: 1, name: 'Read Only Role' },
    //   { id: 101, name: 'Data Steward' },
    //   { id: 102, name: 'Manager' },
    //   { id: 103, name: 'Sr. Manager' },
  
    // ];
    //  this.userRoles = [
    //   { id: 1, name: 'Read Only Role' },
    //   { id: 101, name: 'Data Steward' },
    //   { id: 102, name: 'Manager' },
    //   { id: 103, name: 'Sr. Manager' },
  
    // ];
    let finalQueryString='where ';
  this.getAllColumns(finalQueryString);
  this.getAllUserNames(finalQueryString);
  
  }

  async getAllUserNames(queryForAPI:string) : Promise<void>{
   
    let builtString=queryForAPI;
    let apiUrl = 'http://localhost:3000/api/getAllUserNames';
    return new Promise((resolve,rejects) =>{
      this.mdmService.getRequestForAPI(apiUrl,"?buildQuery="+builtString).subscribe({
        next:(response:any) =>{
          
          if(response){
            this.userNames=response;
         // this.customerByCountryResponse=response;
         //this.customerCountBySystemName=response;
        // this.users=response;
        // this.totalRecords=  this.users.length;
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
  async getAllColumns(queryForAPI:string) : Promise<void>{
   
    let builtString=queryForAPI;
    let apiUrl = 'http://localhost:3000/api/getAllTableColumns';
    return new Promise((resolve,rejects) =>{
      this.mdmService.getRequestForAPI(apiUrl,"?buildQuery="+builtString).subscribe({
        next:(response:any) =>{
          
          if(response){
         // this.customerByCountryResponse=response;
         //this.customerCountBySystemName=response;
        // this.users=response;
        // this.totalRecords=  this.users.length;
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
  buildPermissionTree(): PermissionNode[] {
    return [
      {
        name: 'All Tables',
        read: false,
        write: false,
        create:false,
        delete:false,
        children: [
          {
            name: 'BO_CUSTOMER',
            read: false,
            write: false,
            create: false,
            delete: false,
            children: [
              { name: 'CUSTOMER_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CUSTOMER_MDM_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CREATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'CREATED_BY', read: false, write: false, create: false, delete: false, },
              { name: 'LAST_UPDATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'UPDATED_BY', read: false, write: false, create: false, delete: false, },
              { name: 'CONSOLIDATION_IND', read: false, write: false, create: false, delete: false, },
              { name: 'IS_ACTIVE', read: false, write: false, create: false, delete: false, },
              { name: 'FIRST_NAME', read: false, write: false, create: false, delete: false, },
              { name: 'LAST_NAME', read: false, write: false, create: false, delete: false, },
              { name: 'EMAIL', read: false, write: false, create: false, delete: false, },
              { name: 'PHONE', read: false, write: false, create: false, delete: false, },
              { name: 'AGE', read: false, write: false, create: false, delete: false, },
              { name: 'LOYALTY_SCORE', read: false, write: false, create: false, delete: false, },
              { name: 'GENDER_CD', read: false, write: false, create: false, delete: false, },
              { name: 'BIRTH_DATE', read: false, write: false, create: false, delete: false, }
            ]
          },
          {
            name: 'BO_CUSTOMER_ADDRESS',
            read: false,
            write: false,
            create: false,
            delete: false,
            children: [
              { name: 'CUSTOMER_ADDRESS_MDM_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CUSTOMER_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CREATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'CREATED_BY', read: false, write: false, create: false, delete: false, },
              { name: 'LAST_UPDATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'UPDATED_BY', read: false, write: false, create: false, delete: false, },
              { name: 'CONSOLIDATION_IND', read: false, write: false, create: false, delete: false, },
              { name: 'IS_ACTIVE', read: false, write: false, create: false, delete: false, },

              { name: 'CUSTOMER_ADDRESS_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CUSTOMER_ADDRESS', read: false, write: false, create: false, delete: false, },
              { name: 'CITY', read: false, write: false, create: false, delete: false, },
              { name: 'STATE', read: false, write: false, create: false, delete: false, },

              { name: 'COUNTRY', read: false, write: false, create: false, delete: false, },
              { name: 'ZIP_CODE', read: false, write: false, create: false, delete: false, },


            ]
          },
          {
            name: 'BO_CUSTOMER_ADDRESS_BRIDGE',
            read: false,
            write: false,
            create: false,
            delete: false,
            children: [
              { name: 'CUSTOMER_ADDRESS_BRIDGE_MDM_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CUSTOMER_MDM_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CUSTOMER_ADDRESS_MDM_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CREATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'CREATED_BY', read: false, write: false, create: false, delete: false, },
              { name: 'LAST_UPDATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'UPDATED_BY', read: false, write: false, create: false, delete: false, },
              { name: 'CONSOLIDATION_IND', read: false, write: false, create: false, delete: false, },
              { name: 'IS_ACTIVE', read: false, write: false, create: false, delete: false, }
            ]
          },

          {
            name: 'BO_CUSTOMER_BUS_REL',
            read: false,
            write: false,
            create: false,
            delete: false,
            children: [
              { name: 'CUSTOMER_BUS_REL_MDM_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CREATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'CREATED_BY', read: false, write: false, create: false, delete: false, },
              { name: 'LAST_UPDATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'UPDATED_BY', read: false, write: false, create: false, delete: false, },
              { name: 'CONSOLIDATION_IND', read: false, write: false, create: false, delete: false, },
              { name: 'IS_ACTIVE', read: false, write: false, create: false, delete: false, },
              { name: 'CUSTOMER_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CUSTOMER_BUS_REL_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CUSTOMER_MDM_ID', read: false, write: false, create: false, delete: false, },
              { name: 'RELATIONSHIP_TYPE_CD', read: false, write: false, create: false, delete: false, },
              { name: 'RELATIONSHIP_START_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'RELATIONSHIP_END_DATE', read: false, write: false, create: false, delete: false, }
            ]
          },
          {
            name: 'REF_COUNTRY',
            read: false,
            write: false,
            create: false,
            delete: false,
            children: [
              { name: 'COUNTRY_CD', read: false, write: false, create: false, delete: false, },
              { name: 'COUNTRY_DESC', read: false, write: false, create: false, delete: false, },
              { name: 'CREATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'LAST_UPDATE_DATE', read: false, write: false, create: false, delete: false, },
             
            ]
          },
          {
            name: 'REF_GENDER',
            read: false,
            write: false,
            create: false,
            delete: false,
            children: [
              { name: 'GENDER_CD', read: false, write: false, create: false, delete: false, },
              { name: 'GENDER_DESC', read: false, write: false, create: false, delete: false, },
              { name: 'CREATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'LAST_UPDATE_DATE', read: false, write: false, create: false, delete: false, },
             
            ]
          },
          {
            name: 'REF_RELATIONSHIP_TYPE',
            read: false,
            write: false,
            create: false,
            delete: false,
            children: [
              { name: 'RELATIONSHIP_TYPE_CD', read: false, write: false, create: false, delete: false, },
              { name: 'RELATIONSHIP_TYPE_DESC', read: false, write: false, create: false, delete: false, },
              { name: 'CREATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'LAST_UPDATE_DATE', read: false, write: false, create: false, delete: false, },
             
            ]
          },
          
        ]
      }
      
    ];
  }

  onSavePermissions() {
    const permissions = this.getSelectedPermissions();
    console.log('hello selected data is',permissions);
    
    for (let i = 0; i < permissions.length; i++) {
      //   sourceId=sourceId+','+wholeResponse[i]['SRC_CUSTOMER_MDM_ID'];
     
      let string=permissions[i]['path'];
      let parts=string.split('/');
      if(parts.length>2){
        let tableName=parts[1];
        let colName=parts[2];
        let createPermission=permissions[i]['create'];
        let updatePermission=permissions[i]['write'];
        let deletePermission=permissions[i]['delete'];
        let readPermission=permissions[i]['read'];
      let userName=this.selectedUserName;
      let role=this.selectedRole;
   
    let permissionObj={
      // custId: this.custId,
      //userName:userName,
      role:role,
       tableName: tableName,
       coulumnName:colName,
       readPermission:readPermission,
       createPermission:createPermission,
       updatePermission:updatePermission,
       deletePermission:deletePermission
     };
    console.log('query string values are permissionObj ',permissionObj) ;
    //createUserPermission

    this.createUserPermissionswithAPI(permissionObj);
      }

    }


    

  
   
  // this.permissionService.savePermissions(permissions).subscribe({
  //   next: () => alert('Permissions saved!'),
  //   error: err => alert('Error saving permissions: ' + err.message)
  // });
  }

  async createUserPermissionswithAPI(userObj:any) : Promise<void>{

 
    let apiUrl = 'http://localhost:3000/api/createUserPermission';
   // let userPwd=this.generatePassword();
   // let userPwd=this.userName+this.phoneNumber;
    // let userObj={
    //  // custId: this.custId,
    //  custUserName:this.userName,
    //  custPwd:userPwd,
    //   custFirstName: this.firstName,
    //   custLastName:this.lastName,
    //   custEmail:this.email,
    //   custPhone:this.phoneNumber,
      
    // };
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
  getSelectedPermissions() {
    const flatList: { path: string; read: boolean; write: boolean;create: boolean; delete: boolean }[] = [];
  
    const walk = (
      node: any,
      path: string = '',
      level: number = 0,
      parent?: any
    ) => {
      const currentPath = path ? `${path}/${node.name}` : node.name;
  
      const hasPermission = node.read || node.write||node.create || node.delete;
      if (hasPermission) {
        flatList.push({
          path: currentPath,
          read: node.read,
          write: node.write,
          create: node.create,
          delete: node.delete,

        });
      }
  
      const children = this.treeControl.getDescendants(node).filter(
        (n) => n.level === node.level + 1
      );
  
      for (const child of children) {
        walk(child, currentPath, level + 1, node);
      }
    };
  
    const roots = this.treeControl.dataNodes.filter(n => n.level === 0);
    for (const root of roots) {
      walk(root);
    }
  
    return flatList;
  }
  onToggle(node: FlatNode, permission: 'read' | 'write' | 'create'|'delete', value: boolean) {
    node[permission] = value;
    node[`${permission}Indeterminate`] = false;

    const descendants = this.treeControl.getDescendants(node);
    for (const child of descendants) {
      child[permission] = value;
      child[`${permission}Indeterminate`] = false;
    }

    this.updateParents(node, permission);
  }
  updateParents(node: FlatNode, permission: 'read' | 'write'| 'create'|'delete') {
    let parent = node.parent;
    while (parent) {
      //@ts-ignore
      const children = this.treeControl.getDescendants(parent).filter(c => c.level === parent.level + 1);
      const allChecked = children.every(c => c[permission] && !c[`${permission}Indeterminate`]);
      const allUnchecked = children.every(c => !c[permission] && !c[`${permission}Indeterminate`]);

      if (allChecked) {
        parent[permission] = true;
        parent[`${permission}Indeterminate`] = false;
      } else if (allUnchecked) {
        parent[permission] = false;
        parent[`${permission}Indeterminate`] = false;
      } else {
        parent[permission] = false;
        parent[`${permission}Indeterminate`] = true;
      }

      parent = parent.parent;
    }
  }
}
