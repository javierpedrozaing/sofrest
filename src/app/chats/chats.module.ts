import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMobileComponent } from './chat-mobile/chat-mobile.component';
import { ChatsRoutingModule } from './chats-routing.module';
import { AvatarModule } from 'ngx-avatar';
import { CommonMaterialModule } from '../common/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [ChatMobileComponent],
  imports: [
    CommonModule,
    CommonMaterialModule,
    AvatarModule,
    ChatsRoutingModule,
    FlexLayoutModule,
  ]
})
export class ChatsModule { }
