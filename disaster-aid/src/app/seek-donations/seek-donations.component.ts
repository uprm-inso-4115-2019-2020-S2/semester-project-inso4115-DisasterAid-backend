import { Component, OnInit } from '@angular/core';
import { Donation } from '../donation';
import { SeekDonationsService } from '../seek-donations.service';
import { RequestApiService } from '../request-api.service';
import {MyRequest} from '../my-request'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-seek-donations',
  templateUrl: './seek-donations.component.html',
  styleUrls: ['./seek-donations.component.css']
})
export class SeekDonationsComponent implements OnInit {

  donationsList: Donation[];
  checkoutItems: Donation[] = [];
  loggedInUserID: string;
  pr_cities:string[] =  [ "Adjuntas",
  "Aguada",
  "Aguadilla",
  "Aguas Buenas",
  "Aibonito",
  "Arecibo",
  "Arroyo",
  "Añasco",
  "Barceloneta",
  "Barranquitas",
  "Bayamón",
  "Cabo Rojo",
  "Caguas",
  "Camuy",
  "Canóvanas",
  "Carolina",
  "Cataño",
  "Cayey",
  "Ceiba",
  "Ciales",
  "Cidra",
  "Coamo",
  "Comerío",
  "Corozal",
  "Culebra",
  "Dorado",
  "Fajardo",
  "Florida",
  "Guayama",
  "Guayanilla",
  "Guaynabo",
  "Gurabo",
  "Guánica",
  "Hatillo",
  "Hormigueros",
  "Humacao",
  "Isabela",
  "Jayuya",
  "Juana Díaz",
  "Juncos",
  "Lajas",
  "Lares",
  "Las Marías",
  "Las Piedras",
  "Loiza",
  "Luquillo",
  "Manatí",
  "Maricao",
  "Maunabo",
  "Mayagüez",
  "Moca",
  "Morovis",
  "Naguabo",
  "Naranjito",
  "Orocovis",
  "Patillas",
  "Peñuelas",
  "Ponce",
  "Quebradillas",
  "Rincón",
  "Rio Grande",
  "Sabana Grande",
  "Salinas",
  "San Germán",
  "San Juan",
  "San Lorenzo",
  "San Sebastián",
  "Santa Isabel",
  "Toa Alta",
  "Toa Baja",
  "Trujillo Alto",
  "Utuado",
  "Vega Alta",
  "Vega Baja",
  "Vieques",
  "Villalba",
  "Yabucoa",
  "Yauco" ];
  sup_list: string[] = ["food", "water", "blankets", "clothes", "medicine", "batteries", "tools"];

  constructor(private seekServices: SeekDonationsService, private requestServices: RequestApiService
    , private router: Router, private route: ActivatedRoute) {

       }



  ngOnInit(): void {
    if(localStorage.getItem('loggedInUserID') == null){ this.router.navigate(['/login'])}
    this.loggedInUserID = localStorage.getItem('loggedInUserID');

    var mySearchItem = localStorage.getItem('search');
        console.log(mySearchItem);
        if(mySearchItem == null){
          this.seekServices.seekDonations().subscribe(res => {this.donationsList = res.donations;}, error=>console.error(error));
        }
        else if(this.pr_cities.includes(mySearchItem)){
          this.seekServices.searchByCity(mySearchItem).subscribe(res => {this.donationsList = res.donations;},error=> console.error(error));
          localStorage.removeItem('search');
        }else if(this.sup_list.includes(mySearchItem)){
          this.seekServices.searchBySupplyName(mySearchItem).subscribe(res=> {this.donationsList = res.donations;}, error=> console.error(error));
          localStorage.removeItem('search');
        }else{
          localStorage.removeItem('search');
          this.seekServices.seekDonations().subscribe(res => {this.donationsList = res.donations;}, error=>console.error(error));

        }


  }

    getItem(donation: Donation){
    this.checkoutItems.push(donation);
    document.getElementById(`get-btn_${donation.did}`).setAttribute('disabled', "true");
  }

  requestItems(){
    this.checkoutItems.forEach(item =>{
      const request:MyRequest ={
        supplyName: item.supplyName,
        time: new Date(Date.now()),
        status: "Pending",
        description: item.unit,
        uid: +this.loggedInUserID,
        did: item.did
      }
      this.requestServices.createRequest(request).subscribe(
        res => {console.log("Request created!"),
          this.router.navigate(['/request'])
      }, error => console.error(error)
        // A~adir ruta a requests
      )
    }
      )

      this.checkoutItems = [];
     
  }

  emptyCart(){
    window.location.reload();
  }
}
