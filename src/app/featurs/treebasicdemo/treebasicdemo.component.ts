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

@Component({
  selector: 'app-treebasicdemo',
  standalone: true,
   imports: [TreeModule,CommonModule,FormsModule,CheckboxModule],
  templateUrl: './treebasicdemo.component.html',
  styleUrl: './treebasicdemo.component.scss'
})
export class TreebasicdemoComponent {
  files: TreeNode[]=[];
  ngOnInit() {
    this.files = [
      {
        label: 'Documents',
        key: '0',
        data: this.initPermission(),
        children: [
          {
            label: 'Reports',
            key: '0-0',
            data: this.initPermission(),
            children: [
              { label: 'Annual.pdf', key: '0-0-0', data: this.initPermission() },
              { label: 'Monthly.pdf', key: '0-0-1', data: this.initPermission() }
            ]
          },
          { label: 'Invoices', key: '0-1', data: this.initPermission() }
        ]
      },
      {
        label: 'Pictures',
        key: '1',
        data: this.initPermission(),
        children: [
          { label: 'Vacation.png', key: '1-0', data: this.initPermission() },
          { label: 'Events.png', key: '1-1', data: this.initPermission() }
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
  onToggle(node: TreeNode, type: 'read' | 'write', value: boolean) {
    node.data[type] = value;
    node.data[`${type}Indeterminate`] = false;

    if (node.children) {
      this.propagateDown(node.children, type, value);
    }

    this.updateParentStates(this.files, null, type);
  }
  propagateDown(children: TreeNode[], type: 'read' | 'write', value: boolean) {
    for (const child of children) {
      child.data[type] = value;
      child.data[`${type}Indeterminate`] = false;
      if (child.children) {
        this.propagateDown(child.children, type, value);
      }
    }
  }
  updateParentStates(nodes: TreeNode[], parent: TreeNode | null, type: 'read' | 'write') {
    for (const node of nodes) {
      if (node.children) {
        this.updateParentStates(node.children, node, type);

        const allChecked = node.children.every(
          c => c.data[type] === true && !c.data[`${type}Indeterminate`]
        );
        const allUnchecked = node.children.every(
          c => c.data[type] === false && !c.data[`${type}Indeterminate`]
        );

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
}
