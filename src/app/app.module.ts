import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClientComponent } from './app.clientInfo';
import { ProductComponent } from './app.products';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, ClientComponent, ProductComponent
  ],
  imports: [
    BrowserModule, FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
