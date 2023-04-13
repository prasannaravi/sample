import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from "../../services/data.service";
import {
  ColDef,
  FirstDataRenderedEvent,
} from "ag-grid-community";
import * as moment from "moment";
import { MatSidenav } from '@angular/material/sidenav';
import { DialogService } from '../../services/dialog.service';
import { ActionButtonComponent } from './button';
import { HelperService } from 'src/app/services/helper.service';
import * as _ from 'lodash';




@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  collectionName!: string;
  listName!: string;
  config: any;
  pageHeading: any;
  columnDefs: any;
  listData: any
  lagnguage: any
  addEditMode: string = "popup";
  fields: any;
  selectedRow: any = {};
  loading: boolean = false;
  id: any
  gridApi: any;
  frameworkComponents: any;
  context: any
  formAction: string = "add"
  selectedModel: any = {}
  @ViewChild("editViewPopup", { static: true }) editViewPopup!: TemplateRef<any>;
  formName!: string


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpclient: HttpClient,
    private DataService: DataService,
    private dialogService: DialogService) {
    this.context = { componentParent: this };

    this.frameworkComponents = {
      buttonRenderer: ActionButtonComponent,
    };
    this.route.params.subscribe((params) => {
      if (params["form"]) {
        this.listName = params["form"];
        this.formName = this.listName
        this.loadConfig();
      }
    });
  }

  ngOnInit() {
  }

  public defaultColDef: ColDef = {
    resizable: true,
  };



  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }


  loadConfig() {
    debugger
    this.httpclient
      .get("assets/jsons/" + this.listName + "-" + "list.json")
      .subscribe((config: any) => {
        this.config = config;
        this.collectionName = config.collectionName
        this.pageHeading = config.pageHeading;
        this.addEditMode = config.addEditMode;
        this.fields = [];
        this.columnDefs = this.config.columnDefs;
        this.columnDefs.forEach((e: any) => {
          if (e.type == "datetime") {
            e.valueGetter = (params: any) =>
              moment(params.data[e.field]).format(e.format || "DD-MM-YYYY h:mm a");
          }
        });
        //get list of records for specific collection/table
        this.getList();
      });
  }



  getList() {
    debugger
    this.DataService.getDataList(this.collectionName).subscribe((res: any) => {
      this.listData = res.data;
      if(this.collectionName == "language"){
        this.lagnguage = res.data;
        localStorage.setItem("language", this.lagnguage);
        console.log(this.lagnguage)
      }
      console.log(res)
    });
  }

  onSelectionChanged(event: any) {
    this.selectedRow = event.api.getSelectedRows()[0]
    this.selectedModel = this.selectedRow
  }

  onAddButonClick() {
    this.selectedModel = {}
    this.formAction = "add"
// if(this.listName=="Application"){
//     this.router.navigate(['/application'])}
//     else{
//     this.doAction()}
this.doAction()
  }

  onActionButtonClick(item: any, data: any) {
    this.selectedModel = this.selectedRow
    this.formAction = item.label.toLowerCase()

    this.formName = item.formName
    let id = this.config.keyField
    if (this.formAction == "add") {
      this.selectedModel = {}
      this.doAction()
    }
    else if (this.formAction == "edit" ) {
      this.doAction(data, id)
    }
    // else if (this.formAction == "notification") {
    //   this.httpclient
    //     .get("assets/jsons/division-email.json")
    //     .subscribe((frmConfig: any) => {
    //       this.fields = frmConfig.form.fields
    //       this.pageHeading = frmConfig.pageHeading;
    //       this.doAction(data, data[id])
    //       // this.doAction(data.notification_emails, data[id])
    //     });
    // }
    else if (this.formAction == "view") {
      this.httpclient
        .get("assets/jsons/" + this.formName + ".json")
        .subscribe((frmConfig: any) => {
          this.fields = frmConfig.form.fields
          this.pageHeading = frmConfig.pageHeading;
          this.doAction(data, data[id])
        });
    } else if (this.formAction == "delete") {
      if (confirm("Do you wish to delete this record?")) {

      }
    }
    // else if (this.formAction == "notification email") {
    //   this.doAction()
    //   // alert("hello")

    // }
  }


  close(event: any) {
    this.dialogService.closeModal()
    this.fields = undefined
    if (event) {
      if (event.action == 'Add') {
        this.listData.push(event.data)
        this.listData = [...this.listData]
      } else {
        this.getList()
      }
    }
  }

  doAction(data?: any, id?: string) {
    if (this.config.editMode == 'popup') {
      this.dialogService.openDialog(this.editViewPopup, this.config.screenWidth, null, data);
    }
    else {
      if (this.formAction == "add") {
        this.router.navigate([`${this.config.addRoute}`])
      }
      else {
        this.router.navigate([`${this.config.editRoute}`, data[this.config.keyField]])
      }
    }
  }

  close_icon() {
    // this.selectedRow = {}
    this.dialogService.closeModal()
  }

}