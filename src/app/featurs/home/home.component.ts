import { Component, ViewChild } from '@angular/core';

import {MenuItem, MessageService} from 'primeng/api';
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
import { ChartModule } from 'primeng/chart';
import { MDMService } from 'src/app/Services/mdm-service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
interface Column {
   field: string;
   header: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuModule,MenubarModule,FormsModule,SidebarModule,Select,ButtonModule,DialogModule,ChartModule,TabMenuModule,TabsModule,TableModule,MultiSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

constructor(private mdmService: MDMService ) {}
  menuItems: MenuItem[];
  cols!: Column[];
  first = 0;
@ViewChild("myCustTable") myCustTable:Table | undefined;
@ViewChild('chart') chart: any;
  rows = 10;
  selectedColumns!: Column[];
  // selectedColumns!: Column[];
  cars: any[];
  customers: any[];
  newCars:any[];
  products: any[];
    items: MenuItem[];
    source = [];
    sourceDept=[];
    basicData: any;
    mergedRecordData:any;
    recordGrowthData:any;
    queryTableDisplay:boolean =false;
options:any;
yearGraphOptions:any;
recordGrowthOptions:any;
customerCountByCity:any;
customerCountByCountry:any;
customerActiveInactive:any;
customerCountByCityOptions:any;
customerCountByCountryOptions:any;
customerActiveInactiveOptions:any;
customerByCountryResponse:any;
customerByYearResponse:any;
customerCountBySystemName:any;
customerCountBySystemOptions:any;
    basicOptions: any;
    scrollableItems: MenuItem[];

    activeItem: MenuItem;

    activeItem2: MenuItem;
    selectedSource = [];
    addressColumns=[];
    columns=[];
    //selectedColumns = [];
    selectedColumnsForAddress = [];
    selectedColumnsForAddressWrite = [];

    selectedColumnsForWrite = [];

    ngOnInit() {
        
        this.source = [
            { name: 'Admin', value: 'Admin' },
            { name: 'Reguler User', value: 'Reguler User' },
            { name: 'Read', value: 'Read' },
            { name: 'Write', value: 'Write' },
           ];
           this.sourceDept = [
            { name: 'Finance', value: 'Finance' },
            { name: 'Procurement', value: 'Procurement' },
            { name: 'Admin', value: 'Admin' },
            { name: 'HR', value: 'HR' },
           ];

           this.columns = [
            { field: 'CUSTOMER_ID', headerVal: 'C.CUSTOMER_ID' },
            { field: 'CUSTOMER_MDM_ID', headerVal: 'C.CUSTOMER_MDM_ID' },
            { field: 'FIRST_NAME', headerVal: 'C.FIRST_NAME' },
            { field: 'LAST_NAME', headerVal: 'C.LAST_NAME' },
            { field: 'EMAIL', headerVal: 'C.EMAIL' },
            { field: 'PHONE', headerVal: 'C.PHONE' },
            { field: 'AGE', headerVal: 'C.AGE' },
            { field: 'GENDER_CD', headerVal: 'C.GENDER_CD' },
            { field: 'BIRTH_DATE', headerVal: 'C.BIRTH_DATE' },
            { field: 'LOYALTY_SCORE', headerVal: 'C.LOYALTY_SCORE' },
      
          ];
      
          this.addressColumns = [
            { field: 'CITY', headerVal: 'CA.CITY' },
            { field: 'STATE', headerVal: 'CA.STATE' },
            { field: 'COUNTRY', headerVal: 'CA.COUNTRY' },
            { field: 'ZIP_CODE', headerVal: 'CA.ZIP_CODE' },
      
          ];
        let finalQueryString='where '
        this.getCustomerGraphDataByCountryFromAPI(finalQueryString);
        this.getCustomerGrraphDataForCustomersByYearFromAPI(finalQueryString);
        this.getCustomerGrraphDataForCustomersBySystemFromAPI(finalQueryString);
        this.getGraphDataForActiveInactiveCustomers(finalQueryString);
        const documentStyle = getComputedStyle(document.documentElement);
        this.customerCountByCity = {
            labels: ['2019','2020', '2021', '2022', '2023', '2024', '2025' ],
            datasets: [
                {
                    label: 'Temple Hills',
                    backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    data: [10000, 5900, 8000, 2081, 2956, 3255, 2040]
                },
                {
                    label: 'Baltimore',
                    backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
                    borderColor: documentStyle.getPropertyValue('--p-green-500'),
                    data: [2800, 3048, 5040, 1919, 5686, 10027, 8990]
                },
                {
                    label: 'Columbia',
                    backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
                    borderColor: documentStyle.getPropertyValue('--p-orange-500'),
                    data: [4870, 2538, 6740, 1919, 3486, 1227, 9000]
                }
            ]
        };
        
        this.customerCountBySystemOptions = {
            responsive: true,
            maintainAspectRatio: true,
          
            plugins: {
                title: {
                display: true,
                text: 'Customers Count By Source System ',
                font: {
                    size: 24
                },
                padding: {
                    top: 20,
                    bottom: 30
                }
                },
                datalabels :{
                    anchor:'end',
                    align:'top',
                }
}
          };

        this.customerCountByCityOptions = {
            responsive: true,
            maintainAspectRatio: true,
          
            plugins: {
                title: {
                display: true,
                text: 'Customers Count Based on City',
                font: {
                    size: 24
                },
                padding: {
                    top: 20,
                    bottom: 30
                }
                },
                datalabels :{
                    anchor:'end',
                    align:'top',
                }
            }
          };

          setTimeout(() => {
            this.chart.refresh();
          }, 1000);
          //this.customerCountByCountry = {};
        // this.customerCountByCountry = {
        //     labels: [ '2023', '2024', '2025'],
        //     datasets: [
        //         {
        //             label: 'USA',
        //             backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        //             borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        //             data: [11065, 7059, 6080]
        //         },
        //         {
        //             label: 'CA',
        //             backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
        //             borderColor: documentStyle.getPropertyValue('--p-green-500'),
        //             data: [2080, 4890, 8940]
        //         },
        //         {
        //             label: 'GB',
        //             backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
        //             borderColor: documentStyle.getPropertyValue('--p-orange-500'),
        //             data: [4898, 7838, 9040]
        //         }
        //     ]
        // };
        this.customerCountByCountryOptions = {
            responsive: true,
            maintainAspectRatio: true,
            
            plugins: {
                title: {
                display: true,
                text: 'Customers Count By Country',
                font: {
                    size: 24
                },
                padding: {
                    top: 20,
                    bottom: 30
                }
                }
}
          };
        this.customerActiveInactive = {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2019'],
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
                    borderColor: documentStyle.getPropertyValue('--p-green-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'In Active',
                    backgroundColor: documentStyle.getPropertyValue('--p-red-500'),
                    borderColor: documentStyle.getPropertyValue('--p-red-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.customerActiveInactiveOptions = {
            responsive: true,
            maintainAspectRatio: true,
            
            plugins: {
                title: {
                display: true,
                text: 'Active Inactive Customers',
                font: {
                    size: 24
                },
                padding: {
                    top: 20,
                    bottom: 30
                }
                }
}
          };

        //2ndpage graphs ends
        this.recordGrowthData = {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2019'],
            datasets: [
                {
                    label: 'Customer',
                    backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Items',
                    backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
                    borderColor: documentStyle.getPropertyValue('--p-green-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                },
                {
                    label: 'Commodity',
                    backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
                    borderColor: documentStyle.getPropertyValue('--p-orange-500'),
                    data: [48, 38, 40, 19, 86, 27, 90]
                }
            ]
        };
        this.mergedRecordData = {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2019'],
            datasets: [
                {
                    label: 'Customer',
                    backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Items',
                    backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
                    borderColor: documentStyle.getPropertyValue('--p-green-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                },
                {
                    label: 'Commodity',
                    backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
                    borderColor: documentStyle.getPropertyValue('--p-orange-500'),
                    data: [48, 38, 40, 19, 86, 27, 90]
                }
            ]
        };
        this.recordGrowthOptions = {
            responsive: true,
            maintainAspectRatio: true,
            
            plugins: {
                title: {
                display: true,
                text: 'Record Growth Count',
                font: {
                    size: 24
                },
                padding: {
                    top: 20,
                    bottom: 30
                }
                }
}
          };
          this.yearGraphOptions = {
            responsive: true,
            maintainAspectRatio: true,
            
 plugins: {
    title: {
      display: true,
      text: 'Customer Count By Year',
      font: {
        size: 24
      },
      padding: {
        top: 20,
        bottom: 30
      }
    }
}
          };
        this.options = {
            responsive: true,
            maintainAspectRatio: true,
            
 plugins: {
    title: {
      display: true,
      text: 'Merged Record  Count',
      font: {
        size: 24
      },
      padding: {
        top: 20,
        bottom: 30
      }
    }
}
          };
        this.basicData = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            
            datasets: [
              {
                label: 'Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)'
                ]
              }
            ]
          };
        // this.basicData = {
        //     labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        //     datasets: [
        //         {
        //             label: 'Sales',
        //             data: [540, 325, 702, 620],
        //             backgroundColor: [
        //                 'rgba(249, 115, 22, 0.2)',
        //                 'rgba(6, 182, 212, 0.2)',
        //                 'rgb(107, 114, 128, 0.2)',
        //                 'rgba(139, 92, 246, 0.2)',
        //             ],
        //             borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
        //             borderWidth: 1,
        //         },
        //     ],
        // };
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        
                    },
                },
            },
            scales: {
                x: {
                   
                    grid: {
                        display:false
                    },
                },
                y: {
                    beginAtZero: true,
                   
                    grid: {
                        display:false
                    },
                },
            },
        };
      this.customers=[{
         id: 1000,
         name: 'James Butt',
     lastName: 'James Butt',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     
     },
     {
         id: 1001,
         name: 'Josephine Darakjy',
         lastName: 'JDarakjy',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1002,
         name: 'Art Venere',
        lastName: 'Venere',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
         
     },
     {
         id: 1003,
         name: 'Lenna Paprocki',
          lastName: 'Paprocki',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1004,
         name: 'Donette Foller',
         lastName: 'Foller',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1005,
         name: 'Simona Morasca',
         lastName: 'Morasca',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1006,
         name: 'Mitsue Tollner',
        lastName: 'Tollner',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1007,
         name: 'Leota Dilliard',
         lastName: 'Dilliard',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1008,
         name: 'Sage Wieser',
        lastName: 'Wieser',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1009,
         name: 'Kris Marrier',
         lastName: 'Marrier',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1010,
         name: 'Minna Amigon',
         lastName: 'Amigon',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1011,
         name: 'Abel Maclead',
         lastName: 'Maclead',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1012,
         name: 'Kiley Caldarera',
         lastName: 'Caldarera',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1013,
         name: 'Graciela Ruta',
         lastName: 'Ruta',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1014,
         name: 'Cammy Albares',
        lastName: 'Albares',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1015,
         name: 'Mattie Poquette',
        lastName: 'Poquette',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1016,
         name: 'Meaghan Garufi',
        lastName: 'Garufi',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1017,
         name: 'Gladys Rim',
        lastName: 'Rim',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1018,
         name: 'Yuki Whobrey',
        lastName: 'Whobrey',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1019,
         name: 'Fletcher Flosi',
        lastName: 'Flosi',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1020,
         name: 'Bette Nicka',
       lastName: 'Nicka',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1021,
         name: 'Veronika Inouye',
        lastName: 'Inouye',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1022,
         name: 'Willard Kolmetz',
        lastName: 'Kolmetz',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1023,
         name: 'Maryann Royster',
         lastName: 'Royster',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1024,
         name: 'Alisha Slusarski',
         lastName: 'Slusarski',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     },
     {
         id: 1025,
         name: 'Allene Iturbide',
         lastName: 'Iturbide',
     email:'xyz@abc.com',
       phone:'+1 00098888',
       age:36,
       gender:'Male',
        birthdate: '2015-09-13',
         country: 'Algeria',
     state:'Algeria',
     city: 'Algeria',
     zip:523240,
     }]
      this.newCars = [
         { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
         { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
         { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
         { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
         { "brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34" },
         { "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj" },
         { "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr" },
         { "brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34" },
         { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5" },
         { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s" }
       ]
         ;
      this.products=[{
         id: '1000',
         code: 'f230fh0g3',
         name: 'Bamboo Watch',
         description: 'Product Description',
         image: 'bamboo-watch.jpg',
         price: 65,
         category: 'Accessories',
         quantity: 24,
         inventoryStatus: 'INSTOCK',
         rating: 5
     },
     {
         id: '1001',
         code: 'nvklal433',
         name: 'Black Watch',
         description: 'Product Description',
         image: 'black-watch.jpg',
         price: 72,
         category: 'Accessories',
         quantity: 61,
         inventoryStatus: 'OUTOFSTOCK',
         rating: 4
     },
     {
         id: '1002',
         code: 'zz21cz3c1',
         name: 'Blue Band',
         description: 'Product Description',
         image: 'blue-band.jpg',
         price: 79,
         category: 'Fitness',
         quantity: 2,
         inventoryStatus: 'LOWSTOCK',
         rating: 3
     },
     {
         id: '1003',
         code: '244wgerg2',
         name: 'Blue T-Shirt',
         description: 'Product Description',
         image: 'blue-t-shirt.jpg',
         price: 29,
         category: 'Clothing',
         quantity: 25,
         inventoryStatus: 'INSTOCK',
         rating: 5
     },
     {
         id: '1004',
         code: 'h456wer53',
         name: 'Bracelet',
         description: 'Product Description',
         image: 'bracelet.jpg',
         price: 15,
         category: 'Accessories',
         quantity: 73,
         inventoryStatus: 'INSTOCK',
         rating: 4
     },
     {
         id: '1005',
         code: 'av2231fwg',
         name: 'Brown Purse',
         description: 'Product Description',
         image: 'brown-purse.jpg',
         price: 120,
         category: 'Accessories',
         quantity: 0,
         inventoryStatus: 'OUTOFSTOCK',
         rating: 4
     },
     {
         id: '1006',
         code: 'bib36pfvm',
         name: 'Chakra Bracelet',
         description: 'Product Description',
         image: 'chakra-bracelet.jpg',
         price: 32,
         category: 'Accessories',
         quantity: 5,
         inventoryStatus: 'LOWSTOCK',
         rating: 3
     },
     {
         id: '1007',
         code: 'mbvjkgip5',
         name: 'Galaxy Earrings',
         description: 'Product Description',
         image: 'galaxy-earrings.jpg',
         price: 34,
         category: 'Accessories',
         quantity: 23,
         inventoryStatus: 'INSTOCK',
         rating: 5
     },
     {
         id: '1008',
         code: 'vbb124btr',
         name: 'Game Controller',
         description: 'Product Description',
         image: 'game-controller.jpg',
         price: 99,
         category: 'Electronics',
         quantity: 2,
         inventoryStatus: 'LOWSTOCK',
         rating: 4
     },
     {
         id: '1009',
         code: 'cm230f032',
         name: 'Gaming Set',
         description: 'Product Description',
         image: 'gaming-set.jpg',
         price: 299,
         category: 'Electronics',
         quantity: 63,
         inventoryStatus: 'INSTOCK',
         rating: 3
     },
     {
         id: '1010',
         code: 'plb34234v',
         name: 'Gold Phone Case',
         description: 'Product Description',
         image: 'gold-phone-case.jpg',
         price: 24,
         category: 'Accessories',
         quantity: 0,
         inventoryStatus: 'OUTOFSTOCK',
         rating: 4
     },
     {
         id: '1011',
         code: '4920nnc2d',
         name: 'Green Earbuds',
         description: 'Product Description',
         image: 'green-earbuds.jpg',
         price: 89,
         category: 'Electronics',
         quantity: 23,
         inventoryStatus: 'INSTOCK',
         rating: 4
     },
     {
         id: '1012',
         code: '250vm23cc',
         name: 'Green T-Shirt',
         description: 'Product Description',
         image: 'green-t-shirt.jpg',
         price: 49,
         category: 'Clothing',
         quantity: 74,
         inventoryStatus: 'INSTOCK',
         rating: 5
     },
     {
         id: '1013',
         code: 'fldsmn31b',
         name: 'Grey T-Shirt',
         description: 'Product Description',
         image: 'grey-t-shirt.jpg',
         price: 48,
         category: 'Clothing',
         quantity: 0,
         inventoryStatus: 'OUTOFSTOCK',
         rating: 3
     },
     {
         id: '1014',
         code: 'waas1x2as',
         name: 'Headphones',
         description: 'Product Description',
         image: 'headphones.jpg',
         price: 175,
         category: 'Electronics',
         quantity: 8,
         inventoryStatus: 'LOWSTOCK',
         rating: 5
     },
     {
         id: '1015',
         code: 'vb34btbg5',
         name: 'Light Green T-Shirt',
         description: 'Product Description',
         image: 'light-green-t-shirt.jpg',
         price: 49,
         category: 'Clothing',
         quantity: 34,
         inventoryStatus: 'INSTOCK',
         rating: 4
     },
     {
         id: '1016',
         code: 'k8l6j58jl',
         name: 'Lime Band',
         description: 'Product Description',
         image: 'lime-band.jpg',
         price: 79,
         category: 'Fitness',
         quantity: 12,
         inventoryStatus: 'INSTOCK',
         rating: 3
     },
     {
         id: '1017',
         code: 'v435nn85n',
         name: 'Mini Speakers',
         description: 'Product Description',
         image: 'mini-speakers.jpg',
         price: 85,
         category: 'Clothing',
         quantity: 42,
         inventoryStatus: 'INSTOCK',
         rating: 4
     },
     {
         id: '1018',
         code: '09zx9c0zc',
         name: 'Painted Phone Case',
         description: 'Product Description',
         image: 'painted-phone-case.jpg',
         price: 56,
         category: 'Accessories',
         quantity: 41,
         inventoryStatus: 'INSTOCK',
         rating: 5
     },
     {
         id: '1019',
         code: 'mnb5mb2m5',
         name: 'Pink Band',
         description: 'Product Description',
         image: 'pink-band.jpg',
         price: 79,
         category: 'Fitness',
         quantity: 63,
         inventoryStatus: 'INSTOCK',
         rating: 4
     },
     {
         id: '1020',
         code: 'r23fwf2w3',
         name: 'Pink Purse',
         description: 'Product Description',
         image: 'pink-purse.jpg',
         price: 110,
         category: 'Accessories',
         quantity: 0,
         inventoryStatus: 'OUTOFSTOCK',
         rating: 4
     }];
     this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
    
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },
      { field: 'image', header: 'image' },
      { field: 'price', header: 'Price' },
      { field: 'inventoryStatus', header: 'inventoryStatus' },
      { field: 'rating', header: 'Rating' },
      { field: 'category', header: 'Category' }
     
  ];

  //this.selectedColumns = this.cols;

      this.cars = [
        { "brand": "Volkswagen", "year": 2012, "color": "White", "vin": "dsad231ff" },
        { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
        { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
       
        { "brand": "Jaguar", "year": 2013, "color": "White", "vin": "greg34" },
        { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5" },
        { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s" }
      ];
      this.items = [
          {label: 'My Assigned Tasks', icon: 'pi pi-fw pi-home'},
          {label: 'My Closed Tasks', icon: 'pi pi-fw pi-calendar'},
          {label: 'All Tasks', icon: 'pi pi-fw pi-pencil'},
          {label: 'Available Tasks', icon: 'pi pi-fw pi-file'},
          {label: 'All Closed Tasks', icon: 'pi pi-fw pi-cog'}
      ];

      this.scrollableItems = Array.from({ length: 50 }, (_, i) => ({label: `Tab ${i + 1}`}));

      this.activeItem = this.items[0];

      this.activeItem2 = this.scrollableItems[0];

      this.menuItems = [
          {
             label:'File',
             icon:'pi pi-fw pi-file',
             items:[
                {
                   label:'New',
                   icon:'pi pi-fw pi-plus',
                   items:[
                      {
                         label:'Bookmark',
                         icon:'pi pi-fw pi-bookmark'
                      },
                      {
                         label:'Video',
                         icon:'pi pi-fw pi-video'
                      },

                   ]
                },
                {
                   label:'Delete',
                   icon:'pi pi-fw pi-trash'
                },
                {
                   separator:true
                },
                {
                   label:'Export',
                   icon:'pi pi-fw pi-external-link'
                }
             ]
          },
          {
             label:'Edit',
             icon:'pi pi-fw pi-pencil',
             items:[
                {
                   label:'Left',
                   icon:'pi pi-fw pi-align-left'
                },
                {
                   label:'Right',
                   icon:'pi pi-fw pi-align-right'
                },
                {
                   label:'Center',
                   icon:'pi pi-fw pi-align-center'
                },
                {
                   label:'Justify',
                   icon:'pi pi-fw pi-align-justify'
                },

             ]
          },
          {
             label:'Users',
             icon:'pi pi-fw pi-user',
             items:[
                {
                   label:'New',
                   icon:'pi pi-fw pi-user-plus',

                },
                {
                   label:'Delete',
                   icon:'pi pi-fw pi-user-minus',

                },
                {
                   label:'Search',
                   icon:'pi pi-fw pi-users',
                   items:[
                      {
                         label:'Filter',
                         icon:'pi pi-fw pi-filter',
                         items:[
                            {
                               label:'Print',
                               icon:'pi pi-fw pi-print'
                            }
                         ]
                      },
                      {
                         icon:'pi pi-fw pi-bars',
                         label:'List'
                      }
                   ]
                }
             ]
          },
          {
             label:'Events',
             icon:'pi pi-fw pi-calendar',
             items:[
                {
                   label:'Edit',
                   icon:'pi pi-fw pi-pencil',
                   items:[
                      {
                         label:'Save',
                         icon:'pi pi-fw pi-calendar-plus'
                      },
                      {
                         label:'Delete',
                         icon:'pi pi-fw pi-calendar-minus'
                      },

                   ]
                },
                {
                   label:'Archieve',
                   icon:'pi pi-fw pi-calendar-times',
                   items:[
                      {
                         label:'Remove',
                         icon:'pi pi-fw pi-calendar-minus'
                      }
                   ]
                }
             ]
          },
          {
             label:'Quit',
             icon:'pi pi-fw pi-power-off'
          }
      ];
  }


  async getCustomerGrraphDataForCustomersBySystemFromAPI(queryForAPI:string) : Promise<void>{
   
    let builtString=queryForAPI;
    let apiUrl = 'http://localhost:3000/api/graphDataForCustomersBySystemName';
    return new Promise((resolve,rejects) =>{
      this.mdmService.getRequestForAPI(apiUrl,"?buildQuery="+builtString).subscribe({
        next:(response:any) =>{
          
          if(response){
         // this.customerByCountryResponse=response;
         this.customerCountBySystemName=response;
          }else{
  
          }
          resolve();
        },
        error:(error:object) =>{
          rejects(error);
        },
        complete:() =>{
            //this.customerByCountryResponse=response;
            this.processGraphDataForSystemName(this.customerCountBySystemName);

            
        }
      })
    })
      
    }

  async getCustomerGrraphDataForCustomersByYearFromAPI(queryForAPI:string) : Promise<void>{
   
    let builtString=queryForAPI;
    let apiUrl = 'http://localhost:3000/api/graphDataForCustomersByYear';
    return new Promise((resolve,rejects) =>{
      this.mdmService.getRequestForAPI(apiUrl,"?buildQuery="+builtString).subscribe({
        next:(response:any) =>{
          
          if(response){
         // this.customerByCountryResponse=response;
         this.customerByYearResponse=response;
          }else{
  
          }
          resolve();
        },
        error:(error:object) =>{
          rejects(error);
        },
        complete:() =>{
            //this.customerByCountryResponse=response;
            this.processGraphDataForCustomersByYear(this.customerByYearResponse);
        }
      })
    })
      
    }
  async getCustomerGraphDataByCountryFromAPI(queryForAPI:string) : Promise<void>{
   
    let builtString=queryForAPI;
    let apiUrl = 'http://localhost:3000/api/graphDataForCustomerByCountry';
    return new Promise((resolve,rejects) =>{
      this.mdmService.getRequestForAPI(apiUrl,"?buildQuery="+builtString).subscribe({
        next:(response:any) =>{
          
          if(response){
          this.customerByCountryResponse=response;
          }else{
  
          }
          resolve();
        },
        error:(error:object) =>{
          rejects(error);
        },
        complete:() =>{
            //this.customerByCountryResponse=response;
            this.processGraphDataForCountry(this.customerByCountryResponse);
        }
      })
    })
      
    }
    async getGraphDataForActiveInactiveCustomers(queryForAPI:string) : Promise<void>{
   
        let builtString=queryForAPI;
        let apiUrl = 'http://localhost:3000/api/graphDataForACtiveInactiveCustomers';
        return new Promise((resolve,rejects) =>{
          this.mdmService.getRequestForAPI(apiUrl,"?buildQuery="+builtString).subscribe({
            next:(response:any) =>{
              
              if(response){
              this.customerActiveInactive=response;
              
              }else{
      
              }
              resolve();
            },
            error:(error:object) =>{
              rejects(error);
            },
            complete:() =>{
                //this.customerActiveInactive=response;
                this.processGraphDataForActiveInactiveCountry(this.customerActiveInactive);
            }
          })
        })
          
        }

        processGraphDataForCustomersByYear(respose:any){
            console.log('graph data',respose);
            let wholeData=respose;
            let graphLabels:any[]=[];
            let graphData:any[]=[];
            let usaData:any[]=[];
            let canadaData:any[]=[];
            let ukData:any[]=[];
            wholeData.forEach(item =>{
                graphLabels.push(item['YEAR']);
                usaData.push(item['NUMBER_OF_RECORDS'])
                // if(item['COUNTRY']==='US'){
                //     usaData.push(item['NUMBER_OF_RECORDS'])
                // }else if (item['COUNTRY']==='CA'){
                //     canadaData.push(item['NUMBER_OF_RECORDS'])
                // }else{
                //     ukData.push(item['NUMBER_OF_RECORDS'])
                // }
            });
            const uniqueCountryNames=[... new Set(wholeData.map(item =>item['COUNTRY']))];
            const uniqueYears=[... new Set(wholeData.map(item =>item['YEAR']))];
            console.log('country names',uniqueCountryNames);
            console.log('usaData names',usaData);
    
            const documentStyle = getComputedStyle(document.documentElement);
            this.customerByYearResponse = {};
            this.customerByYearResponse = {
                labels: uniqueYears,
                datasets: [
                    {
                        label: 'Count',
                        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        data: usaData
                    }
                    // ,
                    // {
                    //     label: 'Canada',
                    //     backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
                    //     borderColor: documentStyle.getPropertyValue('--p-green-500'),
                    //     data: canadaData
                    // },
                    // {
                    //     label: 'United Kingdom',
                    //     backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
                    //     borderColor: documentStyle.getPropertyValue('--p-orange-500'),
                    //     data: ukData
                    // }
                ]
            };
    
    
        }

        processGraphDataForSystemName(respose:any){
            console.log('graph data',respose);
            let wholeData=respose;
            let graphLabels:any[]=[];
            let graphData:any[]=[];
            let netSuiteData:any[]=[];
            let erpData:any[]=[];
            let ukData:any[]=[];
            let wholeArrayData=respose;
            const yearValues = wholeArrayData.map(item => item['YEAR']);
            const uniqueyearValues=[... new Set(yearValues.map(item =>item))];
            const duplicates = this.getDuplicatePropertyValues(wholeData, 'YEAR');

            //@ts-ignore
            const missingYears = uniqueyearValues.filter(item => !duplicates.includes(item));
            console.log('single records are',duplicates);
            console.log('missingYears records are',missingYears);
            missingYears.forEach(item =>{
                // graphLabels.push(item['YEAR']);
                let testObj={
                    NUMBER_OF_RECORDS: 0,
                    SRC_SYSTEM_NAME: "ERP", 
                    YEAR: item
                }
                wholeData.push  (testObj);
                 
             })
             console.log('missingYears records are',missingYears);
             wholeData.sort((a, b) => a['YEAR'] - b['YEAR']);
            //  customerCountBySystemName

            //  NETSUITE 

            //  ERP
            wholeData.forEach(item =>{
              
                if(item['SRC_SYSTEM_NAME']==='NETSUITE'){
                    netSuiteData.push(item['NUMBER_OF_RECORDS'])
                }else{
                    erpData.push(item['NUMBER_OF_RECORDS'])
                }
              
                    
                
             });
            // const uniqueCountryNames=[... new Set(wholeData.map(item =>item['COUNTRY']))];
             const uniqueYears=[... new Set(wholeData.map(item =>item['YEAR']))];
            // console.log('country names',uniqueCountryNames);
          
             const documentStyle = getComputedStyle(document.documentElement);
             this.customerCountBySystemName = {};

            this.customerCountBySystemName = {
                labels: uniqueYears,
                datasets: [
                    {
                        label: 'Net Suite',
                        backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
                        borderColor: documentStyle.getPropertyValue('--p-green-500'),
                        data: netSuiteData
                    },
                    {
                        label: 'ERP',
                        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        data: erpData
                    }
                ]
            };
    
    
        }
        processGraphDataForActiveInactiveCountry(respose:any){
            console.log('graph data',respose);
            let wholeData=respose;
            let graphLabels:any[]=[];
            let graphData:any[]=[];
            let activeData:any[]=[];
            let inActiveData:any[]=[];
            let ukData:any[]=[];
            let wholeArrayData=respose;
            const yearValues = wholeArrayData.map(item => item['YEAR']);
            const uniqueyearValues=[... new Set(yearValues.map(item =>item))];
            const duplicates = this.getDuplicatePropertyValues(wholeData, 'YEAR');

            //@ts-ignore
            const missingYears = uniqueyearValues.filter(item => !duplicates.includes(item));
            console.log('single records are',duplicates);
            console.log('missingYears records are',missingYears);
            missingYears.forEach(item =>{
                // graphLabels.push(item['YEAR']);
                let testObj={
                    NUMBER_OF_RECORDS: 0,
                    IS_ACTIVE: "N", 
                    YEAR: item
                }
                wholeData.push  (testObj);
                 
             })
             console.log('missingYears records are',missingYears);
             wholeData.sort((a, b) => a['YEAR'] - b['YEAR']);
            wholeData.forEach(item =>{
               // graphLabels.push(item['YEAR']);
                if(item['IS_ACTIVE']==='Y'){
                    activeData.push(item['NUMBER_OF_RECORDS'])
                }
               // else(item['IS_ACTIVE']==='N') {
                    else {
                    if(item['IS_ACTIVE']==='N'){
                        inActiveData.push(item['NUMBER_OF_RECORDS'])
                    }else{
                        inActiveData.push(0)
                    }
                   
                }
                
            });
            const uniqueCountryNames=[... new Set(wholeData.map(item =>item['COUNTRY']))];
            const uniqueYears=[... new Set(wholeData.map(item =>item['YEAR']))];
            console.log('country names',uniqueCountryNames);
          //  console.log('usaData names',usaData);
    
            const documentStyle = getComputedStyle(document.documentElement);
            this.customerActiveInactive = {};

            this.customerActiveInactive = {
                labels: uniqueYears,
                datasets: [
                    {
                        label: 'Active',
                        backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
                        borderColor: documentStyle.getPropertyValue('--p-green-500'),
                        data: activeData
                    },
                    {
                        label: 'In Active',
                        backgroundColor: documentStyle.getPropertyValue('--p-red-500'),
                        borderColor: documentStyle.getPropertyValue('--p-red-500'),
                        data: inActiveData
                    }
                ]
            };
    
    
        }

         getDuplicatePropertyValues = (arr, prop) => {
            const count = {};
            for (const obj of arr) {
              const val = obj[prop];
              count[val] = (count[val] || 0) + 1;
            }
          
            return Object.keys(count).filter(key => count[key] > 1);
          };
          ngAfterViewInit() {
            setTimeout(() => {
              if (this.chart?.chart) {
                this.chart.chart.resize();
              }
            }, 0);
          }
    processGraphDataForCountry(respose:any){
        console.log('graph data',respose);
        let wholeData=respose;
        let graphLabels:any[]=[];
        let graphData:any[]=[];
        let usaData:any[]=[];
        let canadaData:any[]=[];
        let ukData:any[]=[];
        wholeData.forEach(item =>{
            graphLabels.push(item['YEAR']);
            if(item['COUNTRY']==='US'){
                usaData.push(item['NUMBER_OF_RECORDS'])
            }else if (item['COUNTRY']==='CA'){
                canadaData.push(item['NUMBER_OF_RECORDS'])
            }else{
                ukData.push(item['NUMBER_OF_RECORDS'])
            }
        });
        const uniqueCountryNames=[... new Set(wholeData.map(item =>item['COUNTRY']))];
        const uniqueYears=[... new Set(wholeData.map(item =>item['YEAR']))];
        console.log('country names',uniqueCountryNames);
        console.log('usaData names',usaData);

        const documentStyle = getComputedStyle(document.documentElement);
        this.customerCountByCountry = {};
        this.customerCountByCountry = {
            labels: uniqueYears,
            datasets: [
                {
                    label: 'United States',
                    backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    data: usaData
                },
                {
                    label: 'Canada',
                    backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
                    borderColor: documentStyle.getPropertyValue('--p-green-500'),
                    data: canadaData
                },
                {
                    label: 'United Kingdom',
                    backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
                    borderColor: documentStyle.getPropertyValue('--p-orange-500'),
                    data: ukData
                }
            ]
        };


    }
    createNewUser(){
        this.queryTableDisplay=true;
      }
  
  pageChange(event) {
   this.first = event.first;
   this.rows = event.rows;
}

}
