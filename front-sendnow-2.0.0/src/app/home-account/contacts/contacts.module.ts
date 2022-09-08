import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { CardComponent } from './card/card.component';
import { AddContactComponent } from './add-contact/add-contact.component';



@NgModule({
  declarations: [ContactsComponent, CardComponent, AddContactComponent],
  imports: [
    CommonModule
  ],
  providers: [ContactsService]
})
export class ContactsModule { }
