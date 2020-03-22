import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { productos } from 'src/app/sales/sales-form/products.component';

@Injectable({
  providedIn: 'root'
})
export class ScreenMobileChangeService {

  public subject = new Subject<boolean>();
  public dataSource : any;
  public isMobile : boolean = false;
  constructor() { 
    this.dataSource = new MatTableDataSource(productos);
  }

  viewMobile() {
    this.isMobile = true;
    this.subject.next(this.isMobile);
  }

  viewDesktop() {
    this.isMobile = false;
    this.subject.next(this.isMobile);
  }

  getStatus(): Observable<boolean> {
    return this.subject.asObservable();
  }

  search(terms: Observable<string>) {
    console.log(terms);
    return terms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => this.searchEntries(term))
    )
  }

  searchEntries(term) {
    this.dataSource.filter = term.trim().toLowerCase();
    return this.dataSource.filteredData;
  }

}
