import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [] // O bootstrap será feito direto pelo main.ts chamando o AppComponent standalone
})
export class AppModule {}
