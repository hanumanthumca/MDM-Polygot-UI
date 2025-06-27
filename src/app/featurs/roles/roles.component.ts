import { Component } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [TreeModule,CommonModule,FormsModule,CheckboxModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  files: TreeNode[] = [];
  nodes: TreeNode[] = [
    {
      label:'Root',
      key:'root',
      data:{read:false,write:false},
      children:[
        {
        label:'Child 1',
      key:'child1',
      data:{read:false,write:false},
      },
      {
        label:'Child 2',
      key:'child2',
      data:{read:false,write:false},
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
  openPermissionChange(node: TreeNode, type: 'read' | 'write', event:any) {
    node.data[type] = event.target.checked;
  }
  handleChange(event: any) {
    console.log('Checkbox changed:', event.checked);
  }
}
