import { Directive, Renderer2, OnInit, ElementRef, RendererStyleFlags2,
  HostListener, HostBinding, Input, OnChanges } from '@angular/core';

/**
 * Drop down dir.
 */
@Directive({
  selector: '[bsDropDown]'
})
export class DropdownDirective implements OnChanges {
  @HostBinding('class.show') 
  isOpen = false;
  
  @Input('bsDropDown')
  dropDownClicked: boolean = false;

  constructor(private elRef: ElementRef) {}

  ngOnChanges() {
    this.isOpen = this.dropDownClicked;
  }
}