import { Directive, Renderer2, OnInit, ElementRef, OnChanges, SimpleChanges,
  HostListener, HostBinding, Input } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const rainbowHex: string[] = ["#9400D3", "#4B0082", "#0000FF", "#00b300", "#b3b300",
  "#cc6600", "#800000", "#0099cc", "#5900b3", "#669900", "#339966"];
const rainbowHex2: string[] = ['darksalmon', 'hotpink', 'yellow', 'goldenrod', 
  'peachpuff', 'red', 'green', 'blue', 'black'];
const defaultBlack: string = "#000000";

/**
 * Host binding for rainbow color
 */
@Directive({
  selector: '[rainbow]'
})
export class RainbowColorDirective implements OnChanges {

  // with the alias being same, can do [rainbowType]= colors
  @Input('rainbow')
  turnOn: boolean;

  @HostBinding('style.color')
  color: string;

  stop$: Subject<boolean> = new Subject();

  ngOnChanges(change: SimpleChanges) {
    if (this.turnOn) {
      this.startRinbow();
    } else {
      this.stop$.next(true);
      this.color = defaultBlack;
    }
  }

  startRinbow() {
    interval(1000).pipe(
      takeUntil(this.stop$),
      tap(() => {
        this.color = rainbowHex[Math.floor(Math.random() * rainbowHex.length)];
      })
    ).subscribe(
      {
        complete: ()=> {
          console.log("rainbow ended");
        }
      }
    );
  }

  constructor(private renderer: Renderer2, private eleRef: ElementRef) {
    this.turnOn = false;
  }
  
  ngOnInit() {
  }
}