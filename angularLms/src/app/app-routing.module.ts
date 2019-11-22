import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { RejectComponent } from './approve/reject/reject.component';
import { EmpAttComponent } from './emp-att/emp-att.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [{path:"",component:CalendarComponent},{path:"applyLeave",component:ApplyLeaveComponent},
{path:"approveReject",component:RejectComponent},{path:"empAtt",component:EmpAttComponent},{path:"profile",component:ProfileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
