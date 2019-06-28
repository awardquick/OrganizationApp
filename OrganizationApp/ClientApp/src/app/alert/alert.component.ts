import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Subscribable } from 'rxjs';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  @ViewChild('alert') alert: ElementRef;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
        }

        this.message = message;
        console.log(this.message);

      });
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
