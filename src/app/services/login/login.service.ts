import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  statusTheme = new BehaviorSubject<any>({dark: false});

  statusMenu = new BehaviorSubject<any>({right: false});

  constructor() { }
}
