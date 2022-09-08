import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { LoginService } from 'src/app/login/login.service';
import { ContactsService } from '../../contacts.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {

  @Input() cliente!: Client;
  createSubscription!: Subscription;
  clientSubscription!: Subscription;

  constructor(public activeModal: NgbActiveModal,
              private loginService: LoginService,
              private contactService: ContactsService) { }

  ngOnInit(): void {
  }

  addContact(){
    this.createSubscription = this.contactService.create(this.cliente)
      .subscribe(
        res =>
        {
          this.getClients();
          this.activeModal.dismiss('Cross click');
        },
        err => console.log(err)
      );
  }

  getClients(){
    if(this.loginService.getData()){
      this.clientSubscription = this.contactService.getClients(this.loginService.getData())
      .subscribe(
        res =>
        { 
          this.contactService.contacts = Object.values(res)[0];
        },
        err => console.log(err)
      );
    }
  }

  ngOnDestroy(): void {
    this.clientSubscription?.unsubscribe();
    this.createSubscription?.unsubscribe();
  }

}
