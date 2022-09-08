import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit, OnDestroy {

  profileSubscription!: Subscription;

  constructor(public activeOffcanvas: NgbActiveOffcanvas,
              public loginService: LoginService) { }

  ngOnInit(): void {
    
  }

  profile(){
    this.profileSubscription = this.loginService.profile().subscribe();
  }

  logOut(){
    this.loginService.logOut();
  }

  ngOnDestroy(): void {
    this.profileSubscription?.unsubscribe();
  }

}
