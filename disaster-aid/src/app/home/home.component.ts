import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlaskapiService } from '../flaskapi.service';
import {Subscription} from 'rxjs/Subscription';
import { User } from '../user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  userListSubs: Subscription;
  userList : User[];

  constructor(private flaskApi: FlaskapiService) { }
  
  ngOnInit(): void {

    this.flaskApi
      .getUsers().subscribe(res => {
        this.userList = res;
      },
      error => console.log(error)
      );

  }

  ngOnDestroy(): void {
    this.userListSubs.unsubscribe();
  }

}
