import { Component, OnInit  } from '@angular/core';
import { DialogService, DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService,ConfirmationService } from 'primeng/api';
import { PanelModule } from "primeng/panel";
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
//import { Menu } from 'primeng/menu';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from "primeng/multiselect"; 
import { InputTextModule } from 'primeng/inputtext';
import { Table } from 'primeng/table';
import { MDMService } from 'src/app/Services/mdm-service';
import { FormsModule } from '@angular/forms';
import { RadioButton } from 'primeng/radiobutton';
import { Select } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { saveAs } from 'file-saver';
import { SplitButtonModule } from 'primeng/splitbutton';
    import { SplitterModule } from 'primeng/splitter';
@Component({
  selector: 'app-task',
  standalone: true,
imports: [FormsModule,PanelModule,SplitButtonModule,SplitterModule,MenuModule,CheckboxModule,DialogModule,InputSwitchModule,CommonModule,ProgressSpinnerModule,Select,RadioButtonModule,RadioButton,MenubarModule,SidebarModule,TabMenuModule,TabsModule,TableModule,MultiSelectModule,ButtonModule],
 
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  selectedCategories: any[] = [];
  selectedMdmId={};

  categoriesNew: any[] = [
      { name: 'MDMID:12345', key: 'A' },
      { name: 'MDMID:456', key: 'M' },
      { name: 'MDMID:456234', key: 'P' },
      { name: 'MDMID:456234234', key: 'R' },
      { name: 'MDMID:12345', key: 'A1' },
      { name: 'MDMID:456', key: 'M1' },
      { name: 'MDMID:456234', key: 'P1' },
      { name: 'MDMID:456234234', key: 'R1' },
     
  ];
  categories = [
    { id: 1, name: 'MDMID:12345', description: 'All kinds of books' },
    { id: 2, name: 'MDMID:456', description: 'Instruments and audio' },
    { id: 3, name: 'MDMID:456234', description: 'Outdoor and indoor sports' },

    // {  id: 4,name: 'MDMID:456234234', description: 'All kinds of books' },
    // {  id: 5,name: 'MDMID:12345', description: 'All kinds of books'},
    //  {  id: 6,name: 'MDMID:456', description: 'All kinds of books' },
    // {  id: 7,name: 'MDMID:456234', description: 'All kinds of books' },
    // {  id: 8,name: 'MDMID:456234234', description: 'All kinds of books' },
  ];
  
  // { name: 'MDMID:12345', key: 'A11' },
  // { name: 'MDMID:456', key: 'M11' },
  // { name: 'MDMID:456234', key: 'P11' },
  // { name: 'MDMID:456234234', key: 'R11' },
  // { name: 'MDMID:12345', key: 'A12' },
  // { name: 'MDMID:456', key: 'M12' },
  // { name: 'MDMID:456234', key: 'P12' },
  // { name: 'MDMID:456234234', key: 'R12' }
  ngOnInit() {
  }
  onCheckboxClick(category: any) {
    console.log('Checkbox clicked:', category);
    this.selectedMdmId=category;
    // Add your logic here
  }
  
}
