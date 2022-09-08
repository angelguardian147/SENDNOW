import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit, OnDestroy {
  
  data: Client = {
    firstName: '',
    lastName: '',
    charge: '',
    company: '',
    email: '',
    estado: '',
    address: '',
};

  log: Login = { 
    client: this.data 
  };

  errorMsg!: string;

  createSubscription!: Subscription;

  constructor(public activeModal: NgbActiveModal,
              private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  
  save(){
    this.createSubscription = this.loginService.create(this.log)
      .subscribe(
        res => {
          this.router.navigate(['/account'], {relativeTo: this.route});
          this.activeModal.dismiss('Cross click');
        },
        err => {
          this.errorMsg = err.error.message;
        }
      );
  }

  closeErrMsg(){
    this.errorMsg = '';
  }

  ngOnDestroy(): void {
    this.createSubscription?.unsubscribe();
  }

}
