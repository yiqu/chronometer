import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-reset-lap',
  templateUrl: 'reset-lap.component.html',
  styleUrls: ['./snack-bars.css'],
})
export class ResetLapSnackBarComponent {

  displayData: string = "";

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.displayData = data;
  }
}