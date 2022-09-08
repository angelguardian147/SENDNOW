import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { ContactsService } from '../../contacts.service';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.scss']
})
export class DeleteContactComponent implements OnInit, OnDestroy {

  @Input() clt!: string;
  deleteSubscription!: Subscription;
  clientSubscription!: Subscription;

  constructor(public activeModal: NgbActiveModal,
              private contactService: ContactsService,
              private loginService: LoginService) { }

  ngOnInit(): void {
  }
  
  operationDelete() {
    if (this.clt) {
      this.deleteSubscription = this.contactService.remove(this.clt)
        .subscribe(
          res => {
            this.getClients();
          },
          err => console.log(err)
        );
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

  ngOnDestroy(): void {
    if(this.deleteSubscription){ 
      this.deleteSubscription.unsubscribe();
      this.clientSubscription.unsubscribe();
    }
  }

}
