import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home-account',
  templateUrl: './home-account.component.html',
  styleUrls: ['./home-account.component.scss']
})
export class HomeAccountComponent implements OnInit, OnDestroy {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.loginService.logOut();
  }

}
