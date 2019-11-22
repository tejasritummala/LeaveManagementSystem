import { Component, OnInit } from '@angular/core';
import { NewServService } from '../new-serv.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProfileComponent} from '../profile/profile.component';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  empData;
  emp={};
  retrieved;
  constructor(private newServService: NewServService,private dialog: MatDialog,) { 
    this.newServService.GetEmp().subscribe(data => {
      this.empData = data;
      console.log(this.empData);
    //  this.ngOnInIt();
    this.emp = Object.assign({}, this.empData[0]);
    console.log(this.emp);
    this.retrieved = true;
    });
  }

  ngOnInit() {
    // if(this.empData != []){    
    //   this.emp = Object.assign({}, this.empData[0]);
    //   console.log(this.emp);
    //   this.retrieved = true;
    // }
  }
  openDialog(){
    debugger;
    alert("Profile Dialog opened");
    const dialogRef = this.dialog.open(ProfileComponent,{
      data:{
        message: 'Are you sure want to open?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    this.ngOnInit();
  }

}
