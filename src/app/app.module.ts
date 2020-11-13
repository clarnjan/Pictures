import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PictureDetailsComponent } from './picture-details/picture-details.component';
import { PictureEditComponent } from './picture-edit/picture-edit.component';
import { FormsModule } from '@angular/forms';
import { PictureCreateComponent } from './picture-create/picture-create.component';

@NgModule({
  declarations: [
    AppComponent,
    PictureListComponent,
    PictureDetailsComponent,
    PictureEditComponent,
    PictureCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path:"create",component:PictureCreateComponent},
      {path:"pictures/:id",component:PictureDetailsComponent},
      {path:"pictures/edit/:id",component:PictureEditComponent},
      {path:"pictures",component:PictureListComponent},
      {path:"",redirectTo:"pictures",pathMatch:"full"}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
