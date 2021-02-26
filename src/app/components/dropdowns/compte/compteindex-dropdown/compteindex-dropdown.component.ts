import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { createPopper } from "@popperjs/core";

@Component({
  selector: 'app-compteindex-dropdown',
  templateUrl: './compteindex-dropdown.component.html',
})
export class CompteindexDropdownComponent implements OnInit {

  constructor(    private authService: AuthService,
    ) { }

  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;

  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
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


  ngOnInit(): void {
  }

  onSignOut() {
    this.authService.signOutUser();
    window.location.reload();
  }
  onSignOutA() {
    this.authService.signOutAuthAccount();
  }

}
