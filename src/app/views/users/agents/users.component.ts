import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { HeaderStatsComponent } from 'src/app/components/headers/header-stats/header-stats.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-agents',
  templateUrl: './users.component.html',
})
export class UsersAComponent implements OnInit {
  datas = [];

  user: any;
  nom_renom: string;
  email: string;
  userType: string;
  userAccount: string;
  contrat: boolean;
  Item: any;

  errormessage: any;
  error: { name: string; message: string } = { name: "", message: "" };

  isAccountAdmin: boolean;
  isAccountAgent: boolean;
  isAccountProf: boolean;
  isAccountEleve: boolean;
  isAuth: boolean;


  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(
    public userService: UserCrudService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
//info du user
firebase.auth().onAuthStateChanged((useri) => {
  if (useri) {
    this.isAuth = true;
  } else {
    this.isAuth = false;
  }
  this.userService.getAllUsers().subscribe((data) => {
    const user = data.map((e) => {
      return {
        id: e.payload.doc.id,
        emailF: e.payload.doc.data()["email"],
        userType: e.payload.doc.data()["userType"],
      };
    });
    for (let i = 0; i < user.length; i++) {
      if (useri === null) {
        // console.log("ici je suis null i pass");
      } else {
        if (useri.email == user[i].emailF) {
          if (user[i].userType == "administrateur") {
            this.isAccountAdmin = true;
          } else
            if (user[i].userType == "agent") {
            this.isAccountAgent = true;
            this.isAccountAdmin = false;
            }else
           if (user[i].userType == "prof") {
             this.isAccountProf = true;
             this.isAccountAgent = false;
             this.isAccountAdmin = false;
           } else
             if (user[i].userType == "eleve") {
             this.isAccountEleve = true;
             this.isAccountProf = false;
            this.isAccountAgent = false;
             this.isAccountAdmin = false;
           } else {
             this.isAccountEleve = false;
             this.isAccountProf = false;
             this.isAccountAgent = false;
             this.isAccountAdmin = false;
           }
        }
      }

    }
  });
});
  }


  getUsers(item) {
    this.datas = [];
    this.userService.getAllUsers().subscribe((data) => {
      this.user = data.map((e) => {
        return {
          isedit: false,
          id: e.payload.doc.id,
          nom_prenom: e.payload.doc.data()["nom_prenom"],
          email: e.payload.doc.data()["email"],
          userType: e.payload.doc.data()["userType"],
          userAccount: e.payload.doc.data()["userAccount"],
          contrat: e.payload.doc.data()["contrat"],
        };
      });
      for (let i = 0; i < this.user.length; i++) {
        if (this.user[i].userType === item) {
          this.datas.push(this.user[i]);
        } else {
        }
      }
});
  }

  editUser(user) {
    user.isedit = true;
    user.editnom_prenom = user.nom_prenom;
    user.editemail = user.email;
    user.edituserType = user.userType;
    user.edituserAccount = user.userAccount;
    user.editcontrat = user.contrat;

  }
  modifierUser(user) {
    let data = {};
    data["nom_prenom"] = user.editnom_prenom;
    data["email"] = user.editemail;
    data["userType"] = user.edituserType;
    data["userAccount"] = user.edituserAccount;
    data["contrat"] = user.editcontrat;

    this.userService.updateUser(user.id, data);
    user.isedit = false;
  }
  supprimer(id) {
    this.userService.deleteUser(id);
  }
  viewUser(item) {}
}
