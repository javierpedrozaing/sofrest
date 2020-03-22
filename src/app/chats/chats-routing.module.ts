import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatMobileComponent } from './chat-mobile/chat-mobile.component';


const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'list',
      //   component: ListUsersComponent,
      // },
      {
        path: 'messages',
        component: ChatMobileComponent,
      },
      // {
      //   path: 'list-mobile',
      //   component: UserMobileComponent,
      // },
      {
        path: 'messages-mobile',
        component: ChatMobileComponent,
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChatsRoutingModule { }
