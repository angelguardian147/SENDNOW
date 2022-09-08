import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';



@NgModule({
  declarations: [CardComponent, DeleteContactComponent],
  imports: [
    CommonModule
  ]
})
export class CardModule { }
