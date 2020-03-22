import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private successPaymentSource = new Subject<boolean>();
  constructor() { }

  successPayment$ = this.successPaymentSource.asObservable();

  notifyPayment(successful: boolean) {
    this.successPaymentSource.next(successful);
  }
}
