import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatDialogModule } from '@angular/material/dialog'; 

@NgModule({
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],

  exports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],

  declarations: [],

  providers: [],
})
export class MaterialModule { }
