import { Component, OnInit } from '@angular/core';
import { NewServService } from '../new-serv.service';
@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  displayedColumns: string[] = ['date', 'typeOfLeave', 'reason', 'del'];
  ele_data;
  log = 0;
  constructor(private newServService: NewServService) { }

  ngOnInit() {
    console.log(this.newServService.returnObject());
    this.ele_data = this.newServService.returnObject();
  }
  deleteRow(el) {
    for (var i = 0; i < this.ele_data.length; i++) {
      if (el.date === this.ele_data[i].date) {
        this.ele_data.splice(i, 1);
        break;
      }
    }
    this.newServService.selectedDates(this.ele_data);
    this.ele_data = this.newServService.returnObject();
  }
  ApplyLeave() {
    console.log(this.ele_data);
    var rows = (document.getElementById("applyleavetable") as HTMLTableElement).rows;

    /**********************************************************************************************************************************************
      * 4.1. Loop through rows in applyleave table and checks condition for apply
    **********************************************************************************************************************************************/
   this.log = 0;
    for (var i = 1; i < rows.length; i++) {
      var val = (rows[i].cells[1].childNodes[0] as HTMLSelectElement).selectedOptions[0].innerText;
      if (val === "") {
        this.log = 1;
      }
    }
    if(this.log === 0){
      for (var i = 0; i < this.ele_data.length; i++) {
        var year = this.ele_data[i].date.substring(2, 4);
        var month = this.ele_data[i].date.substring(5, 7);
        var day = this.ele_data[i].date.substring(8, 11);
        var date1 = [day, month, year].join("-");
        this.ele_data[i].date = date1;
        this.newServService.saveUser(this.ele_data[i]).subscribe(data => {
          alert(data.data);
        }, error => console.log(error));
      }
      this.ele_data = [];
      this.newServService.selectedDates(this.ele_data);
      this.ele_data = this.newServService.returnObject();
    }  
  }
  leaveChange(evt, el) {
    console.log(evt.target.value);
    console.log(el);
    for (var i = 0; i < this.ele_data.length; i++) {
      if (el.date === this.ele_data[i].date) {
        if (evt.target.value === "Casual") {
          this.ele_data[i].isothers = true;
          this.ele_data[i].isworkfromhome = false;
        }
        else if (evt.target.value === "Work From Home") {
          this.ele_data[i].isworkfromhome = true;
          this.ele_data[i].isothers = false;
        }
        else {
          this.ele_data[i].isothers = true;
          this.ele_data[i].isworkfromhome = false;
        }
      }
    }
  }
  inputChange(evt, el) {
    debugger;
    console.log(evt.target.value);
    console.log(el);
    for (var i = 0; i < this.ele_data.length; i++) {
      if (el.date === this.ele_data[i].date) {
        this.ele_data[i].comments = evt.target.value;
      }
    }
  }
}
