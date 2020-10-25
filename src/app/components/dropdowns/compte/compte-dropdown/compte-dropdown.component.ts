import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-compte-dropdown',
  templateUrl: './compte-dropdown.component.html',
})
export class CompteDropdownComponent implements OnInit {

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
  }
  onSignOutA() {
    this.authService.signOutAuthAccount();
  }

}
