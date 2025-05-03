import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService,ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [],
  templateUrl: './customer-view.component.html',
  providers:[DialogService],
  styleUrl: './customer-view.component.scss'
})
export class CustomerViewComponent  {
custId='';
customerResult={};
  constructor(public dynamicDialogRef:DynamicDialogRef, 
    public dynamicDialogConfig:DynamicDialogConfig,
    private dialogService:DialogService
  ){}
  ngOnInit() {
    this.custId=this.dynamicDialogConfig.data['custId']; 
    this.customerResult=this.dynamicDialogConfig.data['customerObj'];
    console.log('this config data is',this.dynamicDialogConfig.data['custId']);
  }
}
