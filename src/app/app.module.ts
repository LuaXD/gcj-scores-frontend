import { WebService } from './web.service';
import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SelectModule } from 'ng-select';
import { PaginationModule } from 'ngx-bootstrap';
import {HttpModule, RequestOptions, XHRBackend} from '@angular/http';

import { AppComponent } from './app.component';

export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new WebService(backend, defaultOptions);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SelectModule,
    HttpModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  providers: [
    {
      provide: WebService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions]
    },
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
