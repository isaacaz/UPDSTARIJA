import {
  Input,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";

@Component({
  selector: 'app-acordion',
  templateUrl: './acordion.component.html',
  styleUrls: ['./acordion.component.scss'],
})
export class AcordionComponent implements OnInit {

  @ViewChild("expandWrapper", { read: ElementRef, static: true })
  expandWrapper: ElementRef;

  @Input("expanded") expanded: boolean = false;
  @Input("expandHeight") expandHeight: string = "500px";

  icon: string = "arrow-dropright";
  accordionExapanded = false;
  @Input("title") title: string;


  constructor(public renderer: Renderer2) {

  }
  ngOnInit(){
    this.renderer.setStyle(
      this.expandWrapper.nativeElement,
      "max-height",
      "0px"
    );
    this.renderer.setStyle(
      this.expandWrapper.nativeElement,
      "padding",
      "0px 16px"
    );
  }

  toggleAccordion() {
    if (this.accordionExapanded) {
      this.renderer.setStyle(
        this.expandWrapper.nativeElement,
        "max-height",
        "0px"
      );
      this.renderer.setStyle(
        this.expandWrapper.nativeElement,
        "padding",
        "0px 16px"
      );
    } else {
      this.renderer.setStyle(
        this.expandWrapper.nativeElement,
        "max-height",
        "500px"
      );
      this.renderer.setStyle(
        this.expandWrapper.nativeElement,
        "padding",
        "13px 16px"
      );
    }

    this.accordionExapanded = !this.accordionExapanded;
    this.icon =
      this.icon == "arrow-dropdown"
        ? "arrow-dropright"
        : "arrow-dropdown";
  }
 
 

}
