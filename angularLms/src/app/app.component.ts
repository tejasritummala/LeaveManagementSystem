import { Component } from '@angular/core';
import { NewServService } from './new-serv.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularLms';
 
  constructor(private newServService: NewServService) {

   }
   onActivate(componentReference) {
    console.log(componentReference)
    console.log("hddddddddddddddddddddddddddddddddddddddddddddddds");
    // componentReference.messageEvent.subscribe((data) => {
    //    console.log("---------------------------------------------------",data);
    // })
 }
}
