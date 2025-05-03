import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/app.routes';
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent,appConfig).catch((err) =>
  console.error(err)
);
