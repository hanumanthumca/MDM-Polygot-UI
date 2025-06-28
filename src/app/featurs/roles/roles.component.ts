import { Component } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [TreeModule,CommonModule,FormsModule,CheckboxModule,TreeSelectModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  files: TreeNode[] = [];
  roleFiles: TreeNode[] = [];
  selectedNodes: TreeNode[] = [];
  newnodes: TreeNode[] = [];
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
  // files: TreeNode[] = [
  //   {
  //         label: 'Documents',
  //         data: 'Documents Folder',
  //         children: [
  //           {
  //             label: 'Reports',data: 'Reports Folder',
              
              
  //           },
  //           {
  //             label: 'Home',data: 'Home Folder',
              
              
  //           }]
  //         },
  //         {
  //           label: 'Pics',
  //           data: 'Pics Folder',
  //           children: [
  //             {
  //               label: 'Vaction',data: 'Vaction Folder',
                
                
  //             },
  //             {
  //               label: 'Family',data: 'Family Folder',
                
                
  //             }]
  //           },
  // ];
  
  // files: TreeNode[] = [
  //   {
  //     label: 'Documents',
  //     data: { read: false, write: false },
  //     children: [
  //       {
  //         label: 'Reports',
  //         data: { read: false, write: false },
  //         children: [
  //           { label: 'Annual.pdf', data: { read: false, write: false } }
  //         ]
  //       },
  //       {
  //         label: 'Invoices',
  //         data: { read: false, write: false }
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Pictures',
  //     data: { read: false, write: false },
  //     children: [
  //       { label: 'Vacation.png', data: { read: false, write: false } }
  //     ]
  //   }
  // ];
  ngOnInit() {
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
  togglePermission(node: TreeNode, permission: 'read' | 'write', checked: boolean) {
    node.data[permission] = checked;
  }
  // togglePermission(node: TreeNode, permission: 'read' | 'write', checked: boolean) {
  //   node.data[permission] = checked;
  // }
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
  openPermissionChange(node: TreeNode, type: 'read' | 'write', event:any) {
    node.data[type] = event.target.checked;
  }
  handleChange(event: any) {
    console.log('Checkbox changed:', event.checked);
  }
}
