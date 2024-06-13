import { Component, OnInit } from '@angular/core';
import { NewServService } from '../../new-serv.service';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.css']
})
export class RejectComponent implements OnInit {
  displayedColumns: string[] = ['select', 'date', 'id', 'name', 'reason', 'bal', 'leavetype', 'remarks'];
  totalLeaves;
  leavesData;
  configData;
  empList;
  empArr = [];
  filterLeavesData;
  constructor(private newServService: NewServService) { }

  ngOnInit() {
    var that = this;
    var month = new Date().getMonth() + 1;
    var availLeavesBasedOnMonth = month * 1.25;
    this.newServService.selectedDates([]);
    this.newServService.getEmp().subscribe(data => {
      debugger;
      this.empList = data.filter(function (object) {
        return object.reportingto[0].id === "FGT1001"
      });
      for (var i = 0; i < this.empList.length; i++) {
        this.empArr.push(this.empList[i].fgtid);
      }
    })
    this.newServService.getUser().subscribe(data => {
      debugger;
      this.totalLeaves = data;
      this.leavesData = data.filter(function (object) {
        return object.fgtid != "FGT1001" && object.status === "Pending";
      });

      var filterData = [];
      for (var k = 0; k < this.leavesData.length; k++) {
        if (that.empArr.includes(this.leavesData[k].fgtid)) {
          debugger;
          filterData.push(this.leavesData[k]);
        }
      }
      this.filterLeavesData = filterData;
      console.log(this.filterLeavesData);
      console.log(this.leavesData);
    });
    this.newServService.getConfig().subscribe(data => {
      this.configData = data;
      var FestiveArr =  this.configData[0].festiveHoliday;
     
      for (var i = 0; i < this.filterLeavesData.length; i++) {
        for(var f=0;f<FestiveArr.length;f++){
          if(FestiveArr[f].date ===this.filterLeavesData[i].date){
            this.filterLeavesData[i].isfestive = true;
            this.filterLeavesData[i].isothers = false;
            this.filterLeavesData[i].isworkfromhome = false;
          }
        }
        var fgtidcheck = this.filterLeavesData[i].fgtid;
        var availstatus = this.totalLeaves.filter(function (fobj, ind) {
          return (fobj.fgtid == fgtidcheck && that.empArr.includes(fobj.fgtid) && fobj.status == "Approved" && fobj.iscasual == true)
        })
        var availfestivstatus = this.totalLeaves.filter(function (fobj, ind) {
          return (fobj.fgtid == fgtidcheck && that.empArr.includes(fobj.fgtid) && fobj.status == "Approved" && fobj.isfestive == true)
        })
        var obj = this.empList.filter(function (fobj, ind) {
          return (fobj.fgtid === fgtidcheck)
               })

        this.filterLeavesData[i].availstatus = availLeavesBasedOnMonth - availstatus.length;
        this.filterLeavesData[i].availfestivstatus = 6 - availfestivstatus.length;
        this.filterLeavesData[i].name = obj[0].name;
      }

    });
  }
  handleChecked(evt) {
    debugger;
    console.log(evt);
    var value = evt.target.checked;
    var table = evt.srcElement.parentElement.parentElement.parentElement.parentElement;
    var len = table.rows.length
    for (var i = 1; i < len; i++) {
      table.rows[i].cells[0].childNodes[0].checked = value;
    }
  }
  approveLeave() {
    debugger;
    var approveArr = this.getLeaveDetails();
    for (var k = 0; k < approveArr.length; k++) {
      approveArr[k].status = "Approved";
      this.newServService.updateUser(approveArr[k]).subscribe(data => {
        alert(data.data);
        this.ngOnInit();
      }, error => console.log(error));
    }
  }
  rejectLeave() {
    var approveArr = this.getLeaveDetails();
    for (var k = 0; k < approveArr.length; k++) {
      approveArr[k].status = "Rejected";
      this.newServService.updateUser(approveArr[k]).subscribe(data => {
        alert(data.data);
        this.ngOnInit();
      }, error => console.log(error));
    }

  }
  getLeaveDetails() {
    var rows = (document.getElementById("approverejecttable") as HTMLTableElement).rows;
    var arr = [];
    var approveArr = [];
    for (var i = 1; i < rows.length; i++) {
      var checked = (rows[i].cells[0].children[0] as HTMLInputElement).checked;
      if (checked) {
        arr.push(rows[i].cells[1].innerText);
      }
    }
    console.log(arr);
    for (var j = 0; j < this.filterLeavesData.length; j++) {
      if (arr.includes(this.filterLeavesData[j].date)) {

        approveArr.push(this.filterLeavesData[j]);
      }
    }
    return approveArr;
  }
  leaveChange(evt, el) {
    var val = evt.srcElement.selectedOptions[0].value;
    console.log(evt);
    if (val === "Sick Leave") {
      el.iscasual = false;
      el.iscompoff = false;
      el.isfestive = false;
      el.islop = false;
      el.isothers = true;
      el.isworkfromhome = false;
    } else if (val === "Comp Off") {
      el.iscasual = false;
      el.iscompoff = true;
      el.isfestive = false;
      el.islop = false;
      el.isothers = false;
      el.isworkfromhome = false;
    } else if (val === "Festive Leave") {
      el.iscasual = false;
      el.iscompoff = false;
      el.isfestive = true;
      el.islop = false;
      el.isothers = false;
      el.isworkfromhome = false;
    } else if (val === "Work From Home") {
      el.iscasual = false;
      el.iscompoff = false;
      el.isfestive = false;
      el.islop = false;
      el.isothers = false;
      el.isworkfromhome = true;
    } else if (val === "Casual Leave") {
      el.iscasual = true;
      el.iscompoff = false;
      el.isfestive = false;
      el.islop = false;
      el.isothers = false;
      el.isworkfromhome = false;
    }
    console.log(el);

  }
}
