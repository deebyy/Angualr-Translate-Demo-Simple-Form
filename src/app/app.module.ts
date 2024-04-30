import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// The imports needed for translation and localization
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    const appLang = localStorage.getItem('app-lang') ?? 'en';
    this.translateService.setDefaultLang('en');
    this.translateService.use(appLang);

    this.translateService.onLangChange.subscribe((event) => {
      document.documentElement.dir = event.lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = event.lang;
      localStorage.setItem('app-lang', event.lang);
    });
  }
}
    // For a head of time AOT compilation support

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
