import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as _ from 'lodash';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FormService } from 'src/app/services/form.service';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  @ViewChild('attachments') attachment: any;
  imagePreview = ""
  fileList: File[] = [];
  imageList: any[] = [];
  listOfFiles: any[] = [];
  isLoading = false;
  appForm!: FormGroup
  selected = 'option1';
  form = new FormGroup({});
  pageHeading: any
  formAction = 'Add'
  butText = 'Save'
  id: any
  keyField: any
  isDataError = false
  config: any = {}
  authdata: any
  options: any = {};
  fields!: FormlyFieldConfig[]
  fields1: any[] = [];
  uploadedFiles: any
  previewUrl: any
  url: any
  @Input('formName') formName: any
  @Input('mode') mode: string = "page"
  @Input('model') model: any = {}
  @Output('onClose') onClose = new EventEmitter<any>();
  displayURL: any;
  videocntrl!: FormGroup
  videoUrl: string = '';
  video: any;
  langList: any;
  langArr: any;
  language: any
  EnglishLanguagefil: any
  defaultLang: any
  videocntrl_url: any;
  opt: any;
  field: any;
  selectLanguage: any
  lang: any

  



  constructor(
    private formBuilder: FormBuilder,
    private dataservice: DataService,
    private formService: FormService,
    private sanitizer: DomSanitizer,
    private dialogService: DialogService


  ) {

  }



  //* APPLICATION FORM BUILDER
  ngOnInit(): void {
debugger
    this.appForm = this.formBuilder.group({
      lang:new FormControl(''),
      url:new FormControl(''),
      app_code: ['', [Validators.required,
      Validators.maxLength(30)]],
      app_category: new FormControl('', [Validators.pattern("^[a-z A-Z 0-9 \s]*$"), Validators.required, Validators.maxLength(30)]),
      org_id: new FormControl(''),
      default_label: new FormControl(''),
      default_image_url: new FormControl(''),
      is_variant_flag: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.required, Validators.minLength(10)]),
      videocntrl_url: new FormControl('')
    })
    // this.videocntrl = this.formBuilder.group({

    // })
   
    this.getList()
    //* IMAGE
    this.opt = this.field.props || {};
    this.opt.fileType

  }
  ngOnChanges(changes: SimpleChanges) {
  }

  frmSubmit(data: any) {
    debugger
    this.formService.saveFormData(data).then((result: any) => {
      if (result != undefined) {
        // this.goBack(result)
      }
    })
  }

  initLoad() {
    this.formService.LoadInitData(this)
  }

  //*  DISPLAY VIDEO 
  urlArr: any = []
  languagecode: any
  changeValue(value: any) {
    debugger
    this.lang = value.label
    console.log(value.id)
  }
  result: any
  groups: any


  
  addVideo() {
    debugger
var formData = {
    // url:'',
    // lang:'EN'
    url:this.appForm.value.url,
    lang:this.appForm.value.lang
  }
    this.appForm.value
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(formData.url);
    this.urlArr.push(formData)
    
  }


  getData(langCode:string) {
    return this.urlArr.filter((v:any) => v.lang == langCode)
  }

  //* REPEAT ADD & REMOVE
  addField() {
    debugger
    this.fields1.push('');
  }
  removeField(index: number) {
    this.fields1.splice(index, 1);
  }


  //* UPLOADED IMAGE
  onFileSelection(event: any) {
    debugger
    //upload files to the server
    // Call API
    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageList.push(reader.result)

      }
    }

  }

  //* REMOVE IMAGE
  removeSelectedFile(index: any) {
    this.imageList.splice(index, 1);
  }

  //* LIST THE  LANGUAGE IN DB

  getList() {
    debugger
    this.dataservice.getDataList('language').subscribe((res: any) => {

      this.langList = res.data;
      // let arr2:any=[]
      // this.EnglishLanguagefil = this.listData.filter((a:any)=> a.label == "English")
      this.langArr = this.langList.filter((a: any) => a.label != "English")
      console.log(this.langArr, "language")
      // arr.push(arr2[0])
      // console.log(this.listData, "Language data")

    });
  }


  //* REMOVE VIDEO
  removeSelectedVideo(index: any) {
    this.urlArr.splice(index, 1);
  }



}
