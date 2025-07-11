import { Component } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
//import { MatButtonModule } from '@angular/material/button';
//import {MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { CommonModule } from '@angular/common';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { RadioButtonModule } from 'primeng/radiobutton';
//import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { MDMService } from 'src/app/Services/mdm-service';
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
@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule,FormsModule,MatTreeModule, Select,RadioButtonModule,MatButtonModule, ButtonModule,MatIconModule,MatCheckboxModule,TreeModule,CheckboxModule,MatInputModule,MatDialogModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
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
 
  // treeControl = new FlatTreeControl<FlatNode>(n => n.level, n => n.expandable);
  // treeFlattener = new MatTreeFlattener<TreeNode, FlatNode>(
  //   (node, level, parent) => this.transformer(node, level, parent),
  //   n => n.level,
  //   n => n.expandable,
  //   n => n.children || []
  // );
  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
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
  files: TreeNode[] = [];
  roleFiles: TreeNode[] = [];
  selectedNodes: TreeNode[] = [];
  newnodes: TreeNode[] = [];
  assignedRolesForUser=[];
  roles=[];
  selectedRole=[];
  nodes: TreeNode[] = [
    {
      label:'All Tables',
      key:'root',
      data:{read:false,write:false},
      children:[
        {
        label:'Customer Table',
        key:'child1',
        data:{read:false,write:false},
        children:[
          {
          label:'Customer ID',
          key:'CustomerID',
          data:{read:false,write:false},
        },
        {
          label:'Customer MDM ID',
        key:'CustomerMDMID',
        data:{read:false,write:false},
        },
        {
          label:'Customer FName',
        key:'RName',
        data:{read:false,write:false},
        },
        {
          label:'Customer Last Name',
        key:'LastName',
        data:{read:false,write:false},
        },
        {
          label:'Customer Email',
        key:'CEmail',
        data:{read:false,write:false},
        },
        {
          label:'Customer Phone',
        key:'CPhone',
        data:{read:false,write:false},
        },
        {
          label:'Customer Age',
        key:'CAGe',
        data:{read:false,write:false},
        },
        {
          label:'Customer Gender',
        key:'CGender',
        data:{read:false,write:false},
        },
        {
          label:'Customer BirthDate',
        key:'CBirthDate',
        data:{read:false,write:false},
        },
        {
          label:'Customer Loyality',
        key:'CLoyality',
        data:{read:false,write:false},
        },
      ]
      },
      {
        label:'Customer Address Table',
      key:'child2',
      data:{read:false,write:false},
      children:[
        {
        label:'Customer CITY',
        key:'CustomerCITY',
        data:{read:false,write:false},
      },
      {
        label:'Customer STATE',
      key:'CustomerSTATE',
      data:{read:false,write:false},
      },
      {
        label:'Customer COUNTRY',
      key:'CustomerCOUNTRY',
      data:{read:false,write:false},
      },
      {
        label:'Customer ZIP CODE',
      key:'CustomerZIPCODE',
      data:{read:false,write:false},
      }
    ]
      },
      {
        label:'Customer Relation Ship Table',
      key:'child3',
      data:{read:false,write:false},
      children:[
        {
        label:'CUSTOMER_BUS_REL_MDM_ID',
        key:'CUSTOMER_BUS_REL_MDM_ID',
        data:{read:false,write:false},
      },
      {
        label:'CUSTOMER_BUS_REL_ID',
      key:'CUSTOMER_BUS_REL_ID',
      data:{read:false,write:false},
      },
      {
        label:'RELATIONSHIP_TYPE_CD',
      key:'RELATIONSHIP_TYPE_CD',
      data:{read:false,write:false},
      }
    ]
      },
    ]
    }
  ];
  
  
  ngOnInit() {

    this.roles = [
    
      { name: 'Data Steward', value: 101 },
      { name: 'Manager', value: 102 },
      { name: 'Sr.Manager', value: 103 },
      
      { name: 'Read Only Role', value: 1 },
     ];
    let finalQueryString='where ';
 // this.getAllUserRoles(finalQueryString);
    this.newnodes = [
      {
        label: 'Documents',
        data: this.initPermission(),
        children: [
          {
            label: 'Reports',
            data: this.initPermission(),
            children: [
              { label: 'Annual.pdf', data: this.initPermission() },
              { label: 'Monthly.pdf', data: this.initPermission() }
            ]
          },
          {
            label: 'Invoices',
            data: this.initPermission()
          }
        ]
      },
      {
        label: 'Pictures',
        data: this.initPermission(),
        children: [
          { label: 'Vacation.png', data: this.initPermission() },
          { label: 'Events.png', data: this.initPermission() }
        ]
      }
    ];
    this.roleFiles = [
      {
        label: 'Documents',
        key: '0',
        data: { read: false, write: false },
        children: [
          {
            label: 'Reports',
            key: '0-0',
            data: { read: false, write: false },
            children: [
              {
                label: 'Annual.pdf',
                key: '0-0-0',
                data: { read: false, write: false }
              }
            ]
          }
        ]
      },
      {
        label: 'Pictures',
        key: '1',
        data: { read: false, write: false },
        children: [
          {
            label: 'Vacation.png',
            key: '1-0',
            data: { read: false, write: false }
          }
        ]
      }
    ];
    this.files = [
      {
        label: 'Documents',
        key: '0',
        data: { read: false, write: false },
        children: [
          {
            label: 'Reports',
            key: '0-0',
            data: { read: false, write: false },
            children: [
              {
                label: 'Annual.pdf',
                key: '0-0-0',
                data: { read: false, write: false }
              }
            ]
          },
          {
            label: 'Invoices',
            key: '0-1',
            data: { read: false, write: false }
          }
        ]
      },
      {
        label: 'Pictures',
        key: '1',
        data: { read: false, write: false },
        children: [
          {
            label: 'Vacation.png',
            key: '1-0',
            data: { read: false, write: false }
          }
        ]
      }
    ];
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
  // togglePermission(node: TreeNode, permission: 'read' | 'write', checked: boolean) {
  //   node.data[permission] = checked;
  // }

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
              { name: 'CUSTOMER_ID', read: true, write: false, create: false, delete: false, },
              { name: 'CUSTOMER_MDM_ID', read: false, write: false, create: false, delete: false, },
              { name: 'CREATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'CREATED_BY', read: false, write: false, create: false, delete: false, },
              { name: 'LAST_UPDATE_DATE', read: false, write: false, create: false, delete: false, },
              { name: 'UPDATED_BY', read: false, write: false, create: false, delete: false, },
              { name: 'CONSOLIDATION_IND', read: false, write: false, create: false, delete: false, },
              { name: 'IS_ACTIVE', read: false, write: false, create: true, delete: false, },
              { name: 'FIRST_NAME', read: true, write: false, create: true, delete: false, },
              { name: 'LAST_NAME', read: true, write: false, create: true, delete: false, },
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

  initPermission() {
    return {
      read: false,
      write: false,
      readIndeterminate: false,
      writeIndeterminate: false
    };
  }
  
   onPermissionToggle(node: TreeNode, type: 'read' | 'write', value: boolean) {
    node.data[type] = value;
    node.data[`${type}Indeterminate`] = false;

    // Update children recursively
    if (node.children) {
      this.propagateDown(node.children, type, value);
    }

    // Update parents recursively
    this.updateParentState(this.nodes, null, type);
  }
  
  
  propagateDown(nodes: TreeNode[], type: 'read' | 'write', value: boolean) {
    for (const child of nodes) {
      child.data[type] = value;
      child.data[`${type}Indeterminate`] = false;
      if (child.children) {
        this.propagateDown(child.children, type, value);
      }
    }
  }
  
 updateParentState(nodes: TreeNode[], parent: TreeNode | null, type: 'read' | 'write') {
  for (const node of nodes) {
    if (node.children) {
      this.updateParentState(node.children, node, type);
      const allChecked = node.children.every(c => c.data[type] === true && !c.data[`${type}Indeterminate`]);
      const allUnchecked = node.children.every(c => c.data[type] === false && !c.data[`${type}Indeterminate`]);

      if (allChecked) {
        node.data[type] = true;
        node.data[`${type}Indeterminate`] = false;
      } else if (allUnchecked) {
        node.data[type] = false;
        node.data[`${type}Indeterminate`] = false;
      } else {
        node.data[type] = false;
        node.data[`${type}Indeterminate`] = true;
      }
    }
  }
}

async getAllUserRoles(queryForAPI:string) : Promise<void>{
   
  //let builtString='where role_id=';
  let  roleId=this.selectedRole;
  let builtString = "WHERE role_id =" + roleId ;
  let apiUrl = 'http://localhost:3000/api/getAllUserRolesByName';
 
//  this.mdmService.getRequestForAPI(apiUrl, "?buildQuery=" + builtString).subscribe({
  //let apiUrl = 'http://localhost:3000/api/getAllUserRolesByName';
  return new Promise((resolve,rejects) =>{
    this.mdmService.getRequestForAPI(apiUrl,"?buildQuery=" + builtString).subscribe({
      next:(response:any) =>{
        
        if(response){
          this.assignedRolesForUser=response;
          this.processTreeData(response)
       // this.customerByCountryResponse=response;
       //this.customerCountBySystemName=response;
      //  this.users=response;
      //  this.totalRecords=  this.users.length;
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

  processTreeData(response:any){
    let rolesData1=response;
    //let rolesData=response;
    const booleanKeys = ['UPDATE_PERMISSION', 'CREATE_PERMISSION','DELETE_PERMISSION', 'READ_PERMISSION',];

    const rolesData = rolesData1.map(obj => {
      const newObj = { ...obj };
    
      booleanKeys.forEach(key => {
        if (key in newObj) {
          newObj[key] = newObj[key] === 'true';
        }
      });
    
      return newObj;
    });
    const uniqueTableNames = [...new Set(rolesData.map(roles => roles['TABLE_NAME']))];
console.log('uniqueTableNames',uniqueTableNames); // ['Alice', 'Bob', 'Charlie']

const groupedByTableName = rolesData.reduce((acc,person ) => {
  const key = person['TABLE_NAME'];
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(person);
  return acc;
}, {} as Record<string, typeof rolesData>);

console.log('groupedByTableName',groupedByTableName);

const groupedArray = Object.entries(groupedByTableName).map(([name, children]) => ({
  name,
  children
}));
// });
const fieldsToRemove = ['CREATED_BY', 'CREATE_DATE','LAST_UPDATE_DATE','ROLE_NAME','UPDATED_BY','USERNAME','TABLE_NAME'];
// const cleanedPeople = groupedArray.map(person =>
//   this.deepOmitPaths(person, fieldsToRemove)
// );

let cleanedData = groupedArray.map(groupObj => ({
  ...groupObj,
  //@ts-ignore
  children: groupObj.children.map(user => {
    const cleanedUser = { ...user };
    fieldsToRemove.forEach(key => delete cleanedUser[key]);
    return cleanedUser;
  })
}));
const newProps = {
  read: false,
  write: false,
  create: false,
  delete: false,
};
//let formattedData=
console.log('cleaned !!!',cleanedData);
let formattedData = cleanedData.map(obj => ({
  ...obj,
  ...newProps
}));
console.log('formattedData @@@ !!!',formattedData);

const renameMap = {
  COLUMN_NAME: 'name',
  READ_PERMISSION: 'read',
  UPDATE_PERMISSION: 'write',
  DELETE_PERMISSION: 'delete',
  CREATE_PERMISSION: 'create',
};

 
const renamedData = formattedData.map(group => ({
  ...group,
  children: group.children.map(user => {
    const renamedUser = {};

    for (const key in user) {
      if (renameMap[key]) {
        renamedUser[renameMap[key]] = user[key]; // Rename
      } else {
        renamedUser[key] = user[key]; // Keep as-is
      }
    }

    return renamedUser;
  })
}));

console.log('renamedDatarenamedDatarenamedData ',renamedData);

let responseObjForTree={ 
  name: 'All Tables',
  read: false,
  write: false,
  create:false,
  delete:false,
  children:renamedData
}
// renamedData


console.log('responseObjForTree ',responseObjForTree);
//this.dataSource.data = this.buildPermissionTree();
let responseArray=[];
responseArray.push(responseObjForTree);

let colNames={name: 'UPDATED_BY', read: false, write: false, create: false, delete: true};
let oldObj=this.dataSource.data;

// const updatedData = oldObj.map(children => ({
//   ...children,
//   children: children.children.map(user =>
//     user.name === colNames.name ? colNames : user
//   )
// }));
console.log('hello old obj',oldObj);
let formartedObjectsForProceesing=oldObj[0]['children'];

const formartedObject = formartedObjectsForProceesing.map(parent => ({
  ...parent,
  children: parent.children.map(child => ({
    ...child,
    tablename: parent.name // 👈 added property
  }))
}));

console.log('hello formartedObject',formartedObject);
console.log('hello formartedObject',formartedObject);
let updated =[];
let iteratedData=renamedData;
let objectNamesForRoles=[];
for (let i = 0; i < iteratedData.length; i++) {
  for (let j = 0; j < iteratedData[i]['children'].length; j++) {
    let colNames=iteratedData[i]['children'][j];
    colNames.tablename=iteratedData[i]['name'];
    // let wholeObj={
    //   name:iteratedData[i]['name'],
    //   colNames:colNames,
    //   read: false,
    //   write: false,
    //   create:false,
    //   delete:false,

    // }
    //objectNamesForRoles.push(wholeObj);
   objectNamesForRoles.push(colNames);
   // console.log('singleObj',colNames);
 
  }
}

// Create a lookup map from newUsers by id
const objectNamesForRolesMap = Object.fromEntries(objectNamesForRoles.map(user => [user.name, user]));
updated = formartedObject.map(group =>
  group['children'].map(user =>
    objectNamesForRolesMap[user.name] ? objectNamesForRolesMap[user.name] : user
  )
);
 
// updated = formartedObject.map(group =>
//   group['children'].map(col =>
//     col.name === colNames.name ? colNames : col
//   )
// );
console.log(updated);



let grouped ={};

// updated.flat().forEach(parent => {
//   parent.children.forEach(child => {
//     const key = child.tablename;
//     if (!grouped[key]) {
//       grouped[key] = [];
//     }
//     grouped[key].push(child);
//   });
// });

const seen = new Set();
// Flatten outer array
updated.flat().forEach(item => {
  // Support both `tablename` and `tabName` keys
  const key = item.tablename || 'UNKNOWN';
  const uniqueKey = `${item.name}|${key}`;
  if (!seen.has(uniqueKey)) {
    seen.add(uniqueKey);

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(item);
  }
});


console.log('grouped ',grouped);

let namedGroups = Object.entries(grouped).map(([key, items]) => ({
  name: key,
  create: false,
  delete: false,
  read: false,
  write: false,
  children:items
}));

console.log('updatedupdatedupdated ',updated);
console.log('grouped ',grouped);
console.log('namedGroups ',namedGroups);


let newResponseObjForTree={ 
  name: 'All Tables',
  read: false,
  write: false,
  create:false,
  delete:false,
  children:namedGroups
}
let newresponseArray=[];
newresponseArray.push(newResponseObjForTree);
//@ts-ignore
//this.dataSource.data = responseArray;

//this.dataSource.data = newresponseArray;
this.dataSource.data = [...newresponseArray];
//this.dataSource.data = responseObjForTree;


}

deepOmitPaths(obj: any, paths: string[]): any {
  const result = structuredClone(obj); // deep clone to avoid mutation

  for (const path of paths) {
    const keys = path.split('.');
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      if (typeof current[keys[i]] !== 'object' || current[keys[i]] === null) {
        current = null;
        break;
      }
      current = current[keys[i]];
    }

    if (current && typeof current === 'object') {
      delete current[keys[keys.length - 1]];
    }
  }

  return result;
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
onSavePermissions() {
  const permissions = this.getSelectedPermissions();
  console.log('hello selected data is',permissions);
  let selectedRole=this.selectedRole;
  let permissionObjForDel={
    // custId: this.custId,
    //userName:userName,
    role:selectedRole,
     
   };
  
  this.deleteUserPermissionswithAPI(permissionObjForDel);
  
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
    //let userName=this.selectedUserName;
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
async deleteUserPermissionswithAPI(userObj:any) : Promise<void>{

 
  let apiUrl = 'http://localhost:3000/api/deleteRolePermission';
 
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
handleTableChange(){
  console.log('selected role is f',this.selectedRole);
  let finalQueryString='where ';
   this.getAllUserRoles(finalQueryString);
}

  openPermissionChange(node: TreeNode, type: 'read' | 'write', event:any) {
    node.data[type] = event.target.checked;
  }
  handleChange(event: any) {
    console.log('Checkbox changed:', event.checked);
  }
}
