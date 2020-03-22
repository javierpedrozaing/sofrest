import { Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenMobileChangeService } from 'src/app/services/screen/screen-mobile-change.service';
import { Subscription } from 'rxjs';

export interface User {
  name: string;
  position: string;
  email: string;
  status: boolean;
  init_date: string;
  code: string;
}

const ELEMENT_DATA: User[] = [
  {position: "Mozo", code: "985617891", name: 'Axdro Perez', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617892", name: 'Andro Perez', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617893", name: 'Benito Mendez', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617893", name: 'Benito1 Mendez', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617893", name: 'Benito2 Mendez', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617893", name: 'Benito3 Mendez', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617893", name: 'Benito4 Mendez', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617893", name: 'Benito5 Mendez', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617894", name: 'Pedro Perez', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617894", name: 'Pedro Perez1', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617894", name: 'Pedro Perez2', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617894", name: 'Pedro Perez3', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},{position: "Mozo", code: "985617894", name: 'Pedro Perez', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617894", name: 'Pedro Perez4', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617894", name: 'Pedro Perez5', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617894", name: 'Pedro Perez6', email: 'pedro@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617895", name: 'Juana Diaz', email: 'juana@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617896", name: 'Maria Lara', email: 'maria@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617896", name: 'Miranda Lara', email: 'maria@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617896", name: 'Maria Lopez', email: 'maria@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617897", name: '0123', email: 'maria@gmail.com', status: true, init_date: '15/05/2019'},
  {position: "Mozo", code: "985617897", name: '1123', email: 'maria@gmail.com', status: true, init_date: '15/05/2019'},
];

@Component({
  selector: 'app-user-mobile',
  templateUrl: './user-mobile.component.html',
  styleUrls: ['./user-mobile.component.scss']
})
export class UserMobileComponent implements OnInit, OnDestroy {
  
  @ViewChildren('shownDiv') divs: QueryList<ElementRef>;
  public objectKeys = Object.keys;
  public dataSource : any = {};
  public listData : string[] = ["#","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z",];
  public selectedIndex : number = 0;
  subscription: Subscription;

  constructor(
    private router: Router,
    private screenMobileChangeService: ScreenMobileChangeService,
  ) { 
    if(!this.screenMobileChangeService.isMobile) this.router.navigate(['/users/list']);
    this.subscription = this.screenMobileChangeService.getStatus().subscribe(isMobile => { 
      if(!isMobile) this.router.navigate(['/users/list']);
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.chargeDataSource("name", ELEMENT_DATA);
  }

  scrollEvent($event:Event){
    for (let index = 0; index < this.listData.length; index++) {
      let result = this.isScrolledIntoView(index);
      if(result!==false){
        this.selectedIndex = result; 
        break;
      }
    }
  }

  chargeDataSource( key : string, data: any[]){
    data.forEach((element)=>{
      if(element){
        if(element[key]){
          if(typeof element[key] === "number") element[key] = element[key].toString();
          let replaceEmptySpace = element[key].replace(" ", "");
          if(replaceEmptySpace.charAt(0).match(/^[A-Za-z]+$/)){
            if(!this.dataSource[replaceEmptySpace.charAt(0).toUpperCase()]) this.dataSource[replaceEmptySpace.charAt(0).toUpperCase()] = {
              "data" : []
            }
            this.dataSource[replaceEmptySpace.charAt(0).toUpperCase()].data.push(element);
          }else{
            if(!this.dataSource["#"]) this.dataSource["#"] = {
              "data" : []
            }
            this.dataSource["#"].data.push(element);
          }
        }
      }    
    })
    this.orderDataSource();
  }

  orderDataSource(){
    Object.keys(this.dataSource).forEach((key:string)=>{
      if(this.dataSource[key]){
        if(this.dataSource[key]["data"]){
          this.dataSource[key]["data"] = this.dataSource[key]["data"].sort((a, b) => {return a-b});
        } 
      }
    })
  }

  scroll(positionElement : number) {
    let el = document.getElementById(this.listData[positionElement]);
    if(el){
      this.selectedIndex = positionElement;
      el.scrollIntoView(true);
      window.scrollBy(0, -60);
    }else{
      return this.scroll( positionElement === this.listData.length - 1 ? 0 : positionElement + 1);
    }
  }

  isScrolledIntoView(index:number) {
    if(this.dataSource[this.listData[index]]){
      let element = document.getElementById(this.listData[index]);
      if(element){
        var rect = element.getBoundingClientRect();
        return ((rect.top < 65 && rect.bottom > 65)  || ((rect.top >= 65) && (rect.bottom  <= window.innerHeight))) ? index : false;
      }
    }
    return false;
  }

}
