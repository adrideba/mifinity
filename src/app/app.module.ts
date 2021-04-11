// Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Router Module + Router Component + Components
import { AppRoutingModule, RoutingComponents } from './app-routing.module';

// App Component
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// Services
import { ContactsService } from './services/contacts.service';
import { AddressesService } from './services/addresses.service';
import { CountriesService } from './services/countries.service';
import { ContactListItemComponent } from './contacts/contact-list-item/contact-list-item.component';
import { ContactComponent } from './contact/contact.component';

// Interceptors
import { ApiInterceptor } from './interceptor/api.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    HeaderComponent,
    ContactListItemComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    ContactsService,
    CountriesService,
    AddressesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
