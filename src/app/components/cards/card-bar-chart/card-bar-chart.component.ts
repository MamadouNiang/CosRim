import { Component, OnInit, AfterViewInit } from "@angular/core";
import Chart from "chart.js";
import { UserCrudService } from "src/app/services/user-crud.service";

@Component({
  selector: "app-card-bar-chart",
  templateUrl: "./card-bar-chart.component.html",
})
export class CardBarChartComponent implements OnInit, AfterViewInit {
  datas = [];
  vTotal;
  aTotal;
  eTotal;
  tTotal;
  rTotal;
  aTotalEPr;
  aTotalEPu;
  aTotalEM;
  eTotalEPr;
  eTotalEPu;
  eTotalEM;
  tTotalEPr;
  tTotalEPu;
  tTotalEM;
  rTotalEPr;
  rTotalEPu;
  rTotalEM;
  TPr = 0;
  TPu = 0;
  TM = 0;
  user: any;
  constructor(    public userService: UserCrudService,
    ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.datas = [];
    let v = 0;
    let toujounine = 0;
    let arafat = 0;
    let riyad = 0;
    let elmina = 0;
    let toujounineEPr = 0;
    let toujounineEPu = 0;
    let toujounineEM = 0;
    let arafatEPr = 0;
    let arafatEPu = 0;
    let arafatEM = 0;
    let riyadEPr = 0;
    let riyadEPu = 0;
    let riyadEM = 0;
    let elminaEPr = 0;
    let elminaEPu = 0;
    let elminaEM = 0;
    let TPr = 0;
    let TPu = 0;
    let TM = 0;
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
          zone: e.payload.doc.data()["zone"],
          etablissement: e.payload.doc.data()["etablissement"],
        };
      });
      for (let i = 0; i < this.user.length; i++) {
        if (this.user[i].userType === 'visiteur') {
          v = v + 1;
          this.datas.push(this.user[i]);

          if (this.user[i].zone === 'toujounine') {
            toujounine = toujounine + 1;
            if (this.user[i].etablissement === 'prive') {
              toujounineEPr = toujounineEPr + 1;
            }
            if (this.user[i].etablissement === 'public') {
              toujounineEPu = toujounineEPu + 1;
            }
            if (this.user[i].etablissement === 'mahadra') {
              toujounineEM = toujounineEM + 1;
            }
          }
          if (this.user[i].zone === 'riyad') {
            riyad = riyad + 1;
            if (this.user[i].etablissement === 'prive') {
              riyadEPr = riyadEPr + 1;
            }
            if (this.user[i].etablissement === 'public') {
              riyadEPu = riyadEPu + 1;
            }
            if (this.user[i].etablissement === 'mahadra') {
              riyadEM = riyadEM + 1;
            }
          }
          if (this.user[i].zone === 'elmina') {
            elmina = elmina + 1;
            if (this.user[i].etablissement === 'prive') {
              elminaEPr = elminaEPr + 1;
            }
            if (this.user[i].etablissement === 'public') {
              elminaEPu = elminaEPu + 1;
            }
            if (this.user[i].etablissement === 'mahadra') {
              elminaEM = elminaEM + 1;
            }
          }
          if (this.user[i].zone === 'arafat') {
            arafat = arafat + 1;
            if (this.user[i].etablissement === 'prive') {
              arafatEPr = arafatEPr + 1;
            }
            if (this.user[i].etablissement === 'public') {
              arafatEPu = arafatEPu + 1;
            }
            if (this.user[i].etablissement === 'mahadra') {
              arafatEM = arafatEM + 1;
            }
          }
        } else {
        }
      }
      this.TPr = arafatEPr + riyadEPr + elminaEPr + toujounineEPr;
      this.TPu = arafatEPu + riyadEPu + elminaEPu + toujounineEPu;
      this.TM = arafatEM + riyadEM + elminaEM + toujounineEM;
      this.vTotal = v;
      this.aTotal = arafat;
      this.tTotal = toujounine;
      this.rTotal = riyad;
      this.eTotal = elmina;
      let config = {
        type: "bar",
        data: {
          labels: [
            "Privé",
            "Public",
            "Mahadra",

          ],
          datasets: [
            {
              label: "Toujinine",
              backgroundColor: "#00ff00",
              borderColor: "#00ff00",
              data: [toujounineEPr,toujounineEPu,toujounineEM],
              fill: false,
              barThickness: 10
            },
            {
              label: "Arafat",
              fill: false,
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: [arafatEPr, arafatEPu, arafatEM],
              barThickness: 10
            }
            ,
            {
              label: "ElMina",
              fill: false,
              backgroundColor: "#ff0066",
              borderColor: "#ff0066",
              data: [elminaEPr, elminaEPu, elminaEM],
              barThickness: 10
            }
            ,
            {
              label: "Riyad",
              fill: false,
              backgroundColor: "#fcba03",
              borderColor: "#fcba03",
              data: [riyadEPr, riyadEPu, riyadEM],
              barThickness: 10
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Nombres d'inscrits par Zone",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "index",
            intersect: true,
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
          scales: {
            xAxes: [
              {
                display: false,
                scaleLabel: {
                  display: true,
                  labelString: "Month",
                },
                gridLines: {
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(33, 37, 41, 0.3)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                },
                gridLines: {
                  borderDash: [2],
                  drawBorder: false,
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.2)",
                  zeroLineColor: "rgba(33, 37, 41, 0.15)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      let ctx: any = document.getElementById("bar-chart");
      ctx = ctx.getContext("2d");
      new Chart(ctx, config);
    });

  }
  getUsers() {
    this.datas = [];
    let v = 0;
    let toujounine = 0;
    let arafat = 0;
    let riyad = 0;
    let elmina = 0;
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
          zone: e.payload.doc.data()["zone"],
          etablissement: e.payload.doc.data()["etablissement"],
        };
      });
      for (let i = 0; i < this.user.length; i++) {
        if (this.user[i].userType === 'visiteur') {
          v = v + 1;
          this.datas.push(this.user[i]);

          if (this.user[i].zone === 'toujounine') {
            toujounine = toujounine + 1;
          }
          if (this.user[i].zone === 'riyad') {
            riyad = riyad + 1;
          }
          if (this.user[i].zone === 'elmina') {
            elmina = elmina + 1;
          }
          if (this.user[i].zone === 'arafat') {
            arafat = arafat + 1;
          }
        } else {
        }
      }
      this.vTotal = v;
      this.aTotal = arafat;
      this.tTotal = toujounine;
      this.rTotal = riyad;
      this.eTotal = elmina;

    });
  }
}
