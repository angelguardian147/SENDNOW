import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ContactsService } from '../home-account/contacts/contacts.service';
import { LoginService } from '../login/login.service';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy { 

  search = '';
  findSubscription!: Subscription;
  clientSubscription!: Subscription;
  
  constructor(private canvasService: NgbOffcanvas,
              private contactService: ContactsService,
              private loginService: LoginService) {}

  ngOnInit(): void {
    
  }

  find(){
    if(this.search){
      this.findSubscription = this.contactService.find(this.search).subscribe();
    }else{
      this.getClients();
    }
  }
  
  getClients(){
    if(this.loginService.getData()){
      this.clientSubscription = this.contactService.getClients(this.loginService.getData()).subscribe();
    }
  }

  openMenu(){
    this.canvasService.open(MenuLateralComponent);
  }

  ngOnDestroy(): void {
    this.findSubscription?.unsubscribe();
    this.clientSubscription?.unsubscribe();
  }

}
