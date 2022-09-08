import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { LoginService } from 'src/app/login/login.service';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  errMsg!: string;
  clientSubscription!: Subscription;
  personalListSubscription!: Subscription;

  changedList: boolean = false;

  constructor(public clientService: ContactsService,
              private loginService: LoginService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getClients();
  }

  listEmpty(): boolean{
    if(this.clientService.contacts.length == 0){
      return true;
    }
    return false;
  }

  getClients(){
    if(this.loginService.getData()){
      this.clientSubscription = this.clientService.getClients(this.loginService.getData())
      .subscribe();
    }
  }

  getPersonalList(){
    if(this.loginService.getData()){
      this.personalListSubscription = this.clientService.getPrivateList(this.loginService.getData())
      .subscribe();
    }
  }

  openModalAddContact(){
    const modalContact = this.modalService.open(AddContactComponent, { centered: true, size: 'lg' });
    modalContact.componentInstance.modo = 'Add';
  }

  ngOnDestroy(): void {
      this.clientSubscription?.unsubscribe();
      this.personalListSubscription?.unsubscribe();
  }

}
