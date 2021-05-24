import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SearchFormComponent, SearchResultsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, OrderModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
