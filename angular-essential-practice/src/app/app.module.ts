import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {InvestmentsModule} from "./investments/investments.module";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [HeaderComponent, AppComponent],
  imports: [BrowserModule, InvestmentsModule],
  bootstrap: [AppComponent]
})
export class AppModule {

}
