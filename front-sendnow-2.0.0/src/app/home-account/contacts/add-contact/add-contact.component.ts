import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { JwtResponse } from 'src/app/interfaces/jwt-response';
import { LoginService } from 'src/app/login/login.service';
import { ContactsService } from '../contacts.service';
import { ConfirmComponent } from './confirm/confirm.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit, OnDestroy {

  @Input() modo!: string;
  @Input() clt!: Client;
  email!: string;
  enable: boolean = false;

  client: Client = {
      firstName: '',
      lastName: '',
      charge: '',
      company: '',
      email: '',
      estado: '',
      address: '',
  };
  user: JwtResponse = {};
  errMsg!: string;
  createSubscription!: Subscription;
  updateSubscription!: Subscription;
  confirmSubscription!: Subscription;
  clientSubscription!: Subscription;
  findContactSubscription!: Subscription;

  constructor(public activeModal: NgbActiveModal,
              private contactService: ContactsService,
              private loginService: LoginService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.modo == 'Update' && this.clt.email){
      this.client = this.clt;
      this.email = this.clt.email;
      this.enable = true;
    }
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

  confirmUser(){
    if(this.client.email){
      this.confirmSubscription = this.loginService.getUserEmail(this.client.email).subscribe(
        (res) => {
          if(Object.values(res)[0]?.length){
            this.add();
          }else{
            const modal = this.modalService.open(ConfirmComponent);
            modal.componentInstance.cliente = this.client;
            this.clear();
          }
        },
        err => {
          console.log(err)
        }
      );
    }
  }

  update(){
    this.updateSubscription = this.contactService.update(this.email, this.client)
      .subscribe(
        res => {
          this.clear();
        },
        err => console.log(err)
      );
  }

  add(){
    if(this.client.email){
      this.createSubscription = this.contactService.addContact(this.client.email)
      .subscribe(
        res =>
        {
          this.clear();
        },
        err => console.log(err)
      );
    }
  }
  
  create(){
    if(this.modo == 'Add'){
      this.confirmUser();
    }else if(this.modo == 'Update'){
      this.update();
    }
  }

  onKeyEmail(){
    if(this.client.email){
      this.findContactSubscription = this.contactService.findClient(this.client.email).subscribe(
        (res) => {
          const contct: Client = Object.values(res)[0];
          if(contct){
            this.client = contct;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  
  clear(){
    this.client = { 
      firstName: '',
      lastName: '',
      charge: '',
      company: '',
      email: '',
      estado: '',
      address: '',
    };
    this.getClients();
  }

  ngOnDestroy(): void {
    this.confirmSubscription?.unsubscribe();
    this.createSubscription?.unsubscribe();
    this.clientSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.clientSubscription?.unsubscribe();
    this.findContactSubscription?.unsubscribe();
  }

}
