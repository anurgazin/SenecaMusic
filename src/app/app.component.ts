/*********************************************************************************
 *  WEB422 – Assignment 05
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: Aldiyar Nurgazin     Student ID: 121026199      Date: 2021/04/08
 *  Online Link: https://seneca-music-orpin.vercel.app/login
 *
 ********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router,Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  token: any;
  title = 'web422-a4';
  searchString: String;
  constructor(private auth: AuthService, private router: Router) {}
  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = "";
  }
  ngOnInit(){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
