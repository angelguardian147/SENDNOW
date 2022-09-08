import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/interfaces/client';
import { LoginService } from 'src/app/login/login.service';
import { ChatRoomService } from '../../chat-room/chat-room.service';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() clt!: Client;
  errorMsg: boolean = false;
  errMsg!: string;
  showToast: boolean = false;

  constructor(private modalService: NgbModal,
              public chatRoomService: ChatRoomService,
              private loginService: LoginService) { }

  ngOnInit(): void {

  }
  
  chatShow(){
    if(this.clt.email){
      this.loginService.getUserEmail(this.clt.email).subscribe(
        (res) => {
          if(Object.values(res)[0]){
            this.chatRoomService.showChatRoom = true
            if(this.clt.email){
              this.chatRoomService.email = this.clt.email;
            }
            this.chatRoomService.username = Object.values(res)[0];
          }else{
            this.showToast = true;
            this.errMsg = 'This User Does not Exist In The App!'
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  
  openModalUpdateContact(){
    const modalContact = this.modalService.open(AddContactComponent, { centered: true, size: 'lg' });
    modalContact.componentInstance.modo = 'Update';
    modalContact.componentInstance.clt = this.clt;
  }

  openModalDeleteContact(){
    const modalContact = this.modalService.open(DeleteContactComponent, { centered: true });
    modalContact.componentInstance.clt = this.clt.email;
  }

}
