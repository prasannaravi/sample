import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './component/component.module';
import { FormlyFormOptions, FormlyModule,FormlyField } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { FormlyRepeatComponent } from './formly-extension/repeat_section-type';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';





const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@NgModule({
  declarations: [
    AppComponent,
    FormlyRepeatComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    FormsModule,
    
   
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    MatIconModule,
    
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    
    FormlyModule,

   
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],

  providers: [{
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: appearance
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function tokenGetter() {
  return localStorage.getItem("token");
}
