import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-compte-dropdown',
  templateUrl: './compte-dropdown.component.html',
})
export class CompteDropdownComponent implements OnInit {

  constructor(    private authService: AuthService,
    ) { }

  dropdownPopoverShow = false;
  navbarOpen = false;
  isAuth: boolean;


  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

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
    firebase.auth().onAuthStateChanged((useri) => {
      if (useri) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });

  }

  onSignOut() {
    if(confirm("êtes-vous sûr de vouloir vous déconnecter.\n Taper: \n        - Ok pour confirmer et continuer \n        - Annuler pour fermer ")){
      this.authService.signOutUser();
    }else{

    }

  }
  onSignOutA() {
    this.authService.signOutAuthAccount();
  }

}
