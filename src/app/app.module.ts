import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgReduxModule} from '@angular-redux/store';
import {NgRedux, DevToolsExtension} from '@angular-redux/store';
import {rootReducer, ArchitectUIState} from './ThemeOptions/store';
import {ConfigActions} from './ThemeOptions/store/config.actions';
import {AppRoutingModule} from './app-routing.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';

import {CommonModule, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';

// BOOTSTRAP COMPONENTS

import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ChartsModule} from 'ng2-charts';

// LAYOUT

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';
import {PageTitleComponent} from './Layout/Components/page-title/page-title.component';

// HEADER

import {HeaderComponent} from './Layout/Components/header/header.component';
import {SearchBoxComponent} from './Layout/Components/header/elements/search-box/search-box.component';
import {UserBoxComponent} from './Layout/Components/header/elements/user-box/user-box.component';

// SIDEBAR

import {SidebarComponent} from './Layout/Components/sidebar/sidebar.component';
import {LogoComponent} from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import {FooterComponent} from './Layout/Components/footer/footer.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './session/login/login.component';
import { CommonMaterialModule } from './common/material-module';
import { LanguageBoxComponent } from './Layout/Components/header/elements/language-box/language-box.component';
import { DateTimeComponent } from './Layout/Components/header/elements/date-time/date-time.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectsComponent } from './Layout/Components/header/elements/projects/projects.component';
import { gridMenuComponent } from './Layout/Components/header/elements/grid-menu/grid-menu.components';
import { MegaMenuComponent } from './Layout/Components/header/elements/mega-menu/mega-menu.component';
import { MenuComponent } from './Layout/Components/sidebar/elements/menu/menu.component';
import { ToastrModule } from 'ngx-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotificationsComponent } from './Layout/Components/header/elements/notifications-menu/notification-menu.components';
import { SettingsComponent } from './Layout/Components/header/elements/settings/settings.component';
import { GraphQLModule } from './graphql.module';
import { NgxCoolDialogsModule } from 'ngx-cool-dialogs';

import { NgxFitTextModule } from 'ngx-fit-text';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,

    // HEADER

    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,
    LanguageBoxComponent,
    DateTimeComponent,
    ProjectsComponent,
    SettingsComponent,
    gridMenuComponent,
    NotificationsComponent,

    // SIDEBAR

    SidebarComponent,
    LogoComponent,
    MenuComponent,

    // FOOTER

    FooterComponent,

    // ToastsContainer,

    // LOGIN PAGE
    LoginComponent,

    // PAGES
    HomeComponent,

    MegaMenuComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    LayoutModule,
    CommonModule,
    LoadingBarRouterModule,
    NgbModule,
    CommonMaterialModule,
    // Toast
    ToastrModule.forRoot({
      closeButton : true
    }),
    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Charts
    ChartsModule,

    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    GraphQLModule,
    NgxCoolDialogsModule.forRoot({
      theme: 'material', // available themes: 'default' | 'material' | 'dark'
      okButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      color: '#8030c3',
      titles: {
        alert: 'Danger!',
        confirm: 'Desea realizar esta acción?',
        prompt: 'Website asks...'
      }
    }),
    ReactiveFormsModule,
    FormsModule,
    NgxFitTextModule.forRoot(),

  ],
  exports:[
  ],
  providers: [
    {
      provide:
      PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
      DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    ConfigActions,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
              private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
