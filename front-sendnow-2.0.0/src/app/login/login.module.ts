import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { AddClientComponent } from './add-client/add-client.component';



@NgModule({
  declarations: [LoginComponent, AddClientComponent],
  imports: [
    CommonModule
  ],
  providers: [LoginService]
})
export class LoginModule { }
