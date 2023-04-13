import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
// import {FileUploadModule} from 'primeng/fileupload';

import { ApplicationComponent } from "./application/application.component";
import { gridLayout } from "@swimlane/ngx-charts";



@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        MatToolbarModule,
       
       
        
    ],
    declarations: [
        
    ],
    exports: [],
  })
  export class ApplicationComponentModule {}