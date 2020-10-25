import { Component, OnInit } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { UsersAComponent } from 'src/app/views/users/agents/users.component';

@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {
  user: any;
  userF: any;
  isedit: boolean;
  nom_prenom: any;
  email: any;
  userType: any;
  userAccount: any;
  contrat: any;
  item:"";
  datas = [];
  constructor(
    public userService: UserCrudService,

  ) {}


  recupItem(item) {
    this.item = item
    this.ngOnInit();
  }



//   getUser(item) {
//     this.userService.getAllUsers().subscribe((data) => {
//       this.user = data.map((e) => {
//         return {
//           isedit: false,
//           id: e.payload.doc.id,
//           nom_prenom: e.payload.doc.data()["nom_prenom"],
//           email: e.payload.doc.data()["email"],
//           userType: e.payload.doc.data()["userType"],
//           userAccount: e.payload.doc.data()["userAccount"],
//           contrat: e.payload.doc.data()["contrat"],
//         };
//       });
//       console.log(item);
//       for (let i = 0; i < this.user.length; i++) {
//         if ( this.user[i].userType === item) {
//           this.datas.push(this.user[i]);
//            console.log(this.datas);
//         } else {
//         }

//       }
// });
//   }
  ngOnInit(): void {
    this.userService.getUsers(this.item);

  }
}
