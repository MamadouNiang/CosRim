import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { createPopper } from "@popperjs/core";

@Component({
  selector: "app-index-dropdown",
  templateUrl: "./index-dropdown.component.html",
})
export class IndexDropdownComponent implements OnInit {
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;

  constructor(public translate: TranslateService) {
    if (localStorage.getItem("langue")===null){
      translate.setDefaultLang('fr');
    }else{
      translate.setDefaultLang(localStorage.getItem("langue"));
    }
  }

  ngOnInit() {}
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }
  maj() {
    alert("en cours de traitement ... ");
  }
  createPoppper() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }



  useLanguage(langue: string) {
    this.dropdownPopoverShow = false;
    this.translate.use(langue);
    localStorage.setItem("langue", langue)
  }
}
