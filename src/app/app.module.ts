import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatChipsModule, MatSidenavModule, MatTabsModule } from '@angular/material';

import { TreeviewModule } from 'ngx-treeview';
import { ServiceTreeComponent } from './service-tree/service-tree.component';
import { ModelEditorComponent } from './model-editor/model-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceTreeComponent,
    ModelEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    TreeviewModule.forRoot(),
    MatSidenavModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
