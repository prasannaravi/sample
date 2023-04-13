import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
  <div
    class="content"
    fxLayout="row wrap"
    fxLayout.sm="column"
    
  >
    <ng-container
      
      *ngFor="let f of field.fieldGroup; let i = index"
    >
      <formly-field [field]="f"></formly-field>

      <button mat-icon-button (click)="remove(i)">
        <mat-icon>delete_forever</mat-icon>
      </button>
    </ng-container>
  </div>
  <br />
  <div>
    <button style="margin-top:.5rem" mat-icon-button (click)="add()">
      <mat-icon>add</mat-icon>
    </button>
  </div>
  <ng-template #empty>
    <div style="display: flex; justify-content: center; width:500px">
      No {{ to.label | lowercase }} added
    </div>
  </ng-template>
`
})
export class FormlyRepeatComponent extends FieldArrayType {}