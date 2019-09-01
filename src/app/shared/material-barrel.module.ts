import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 

@NgModule({
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule
  ],

  exports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule
  ],

  declarations: [],

  providers: [],
})
export class MaterialModule { }
