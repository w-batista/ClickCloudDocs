import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { DocsFormComponent } from './docs-form/docs-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsListComponent } from './docs-list/docs-list.component';
import { DocSharedProvider } from './shared/doc-shared-provider';
import { LoginComponent } from './login/login.component';
import { DocsComponent } from './docs/docs.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    DocsFormComponent,
    DocsListComponent,
    LoginComponent,
    DocsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [DocSharedProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
