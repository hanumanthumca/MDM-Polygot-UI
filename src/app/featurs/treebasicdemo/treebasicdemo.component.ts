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
//import { FormsModule } from '@angular/forms';



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
   imports: [CommonModule,FormsModule,MatTreeModule, ButtonModule,MatButtonModule, MatIconModule,MatCheckboxModule,TreeModule,CheckboxModule,MatInputModule,MatDialogModule],
   templateUrl: './treebasicdemo.component.html',
  styleUrl: './treebasicdemo.component.scss'
})
export class TreebasicdemoComponent {
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
   constructor() {
    this.dataSource.data = this.buildPermissionTree();
  }
  hasChild = (_: number, node: FlatNode) => node.expandable;
  ngOnInit() {
    
  }
  buildPermissionTree(): PermissionNode[] {
    return [
      {
        name: 'Documents',
        read: false,
        write: false,
        create:false,
        delete:false,
        children: [
          {
            name: 'Reports',
            read: false,
            write: false,
            create:false,
            delete:false,
            children: [
              { name: 'Annual.pdf', read: false, write: false, create:false,
                delete:false, },
              { name: 'Monthly.pdf', read: false, write: false, create:false,
                delete:false, }
            ]
          },
          { name: 'Invoices', read: false, write: false ,create:false,
            delete:false, }
        ]
      },
      {
        name: 'Pictures',
        read: false,
        write: false,
        create:false,
        delete:false,
        children: [
          { name: 'Vacation.png', read: false, write: false, create:false,
            delete:false, },
          { name: 'Events.png', read: false, write: false, create:false,
            delete:false, }
        ]
      }
    ];
  }

  onSavePermissions() {
    const permissions = this.getSelectedPermissions();
    console.log('hello selected data is',permissions);
  // this.permissionService.savePermissions(permissions).subscribe({
  //   next: () => alert('Permissions saved!'),
  //   error: err => alert('Error saving permissions: ' + err.message)
  // });
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
