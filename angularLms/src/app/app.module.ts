import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule }    from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { RejectComponent } from './approve/reject/reject.component';
import { EmpAttComponent } from './emp-att/emp-att.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ProfileComponent } from './profile/profile.component';
import { TopBarComponent } from './top-bar/top-bar.component';
// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { DxSchedulerModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ApplyLeaveComponent,
    RejectComponent,
    EmpAttComponent,
    ProfileComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    // NgxMaterialTimepickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
    // DxSchedulerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
