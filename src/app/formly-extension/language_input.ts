import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'formly-field-language',
  template: `
  <div *ngFor="let data of this.langArr">

  <mat-form-field class="buttonstyle" appearance="outline">
    <mat-label>Label in {{data.label}}</mat-label>
    <input type="text" [(ngModel)]="data.label" matInput placeholder="{{data.label}}">
  </mat-form-field>
</div>
   
  `,
})
export class FormlyFieldLanguage extends FieldType {
    langList: any;
    langArr: any;
    
    constructor(
      private dataservice:DataService){
      
        super();
    }
        
    ngOnInit(): void {
      
     
  }

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
    

} 