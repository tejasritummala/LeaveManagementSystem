import { Component, OnInit,Output, EventEmitter ,ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput, Calendar, createElement } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { NewServService } from '../new-serv.service';

@Component({
  selector: 'app-emp-att',
  templateUrl: './emp-att.component.html',
  styleUrls: ['./emp-att.component.css']
})
export class EmpAttComponent implements OnInit {
  
  @Output() messageEvent = new EventEmitter<any>();
  leavesData;
  empList;
  selected;
  cal;
  configData;
  attendanceData;
  arr = ["2019-10-23", "2019-10-24", "2019-10-19", "2019-10-20"];
  options: OptionsInput;
  @ViewChild('fullcalendar',{static:true}) calendarComponent: FullCalendarComponent;
  title = 'my-first-projec0409';
  calendarPlugins = [dayGridPlugin]; // important!
  constructor(private newServService: NewServService) {
  }
  empChange(evt) {
    debugger;
    console.log(evt.target.value);
    this.selected = evt.target.value;
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.render();
    this.messageEvent.emit(evt.target.value);
  }
  ngOnInit() {
    this.newServService.selectedDates([]);
    this.newServService.GetConfig().subscribe(data => {
      this.configData = data;
      console.log(this.configData);
    });
    this.newServService.GetEmp().subscribe(data => {
      this.empList = data.filter(function (object) {
        return object.reportingto[0].id === "FGT1001"
      });
      this.empList.unshift("");
      console.log(this.empList);
    })
    this.newServService.GetUser().subscribe(data => {  // this is triggered only once, why ?
      this.leavesData = data;
      console.log(data);
    });
    this.newServService.GetAtt().subscribe(data => {
      this.attendanceData = data;
      console.log(data);
    });
    this.options = {
      googleCalendarApiKey: 'AIzaSyDpySfy1n16129SFOBRDA-Nt_t6JX6EHnU',
      editable: true,
      events: 'en.indian#holiday@group.v.calendar.google.com',
      selectable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      header: {
        right: 'today prev,next  myCustomButton',
        center: 'title',
        left: 'prevYear,nextYear'
      },
      plugins: [dayGridPlugin, interactionPlugin,googleCalendarPlugin]
    };
  }
  ngAfterViewInit(){
    debugger;
    let calendarApi = this.calendarComponent.getApi();
    setTimeout(function(){
      calendarApi.render();
    },1000)  
  }
  dayRender(date) {
   var that =this;
    console.log(that.leavesData);
    var year = date.el.dataset.date.substring(2, 4);
    var month = date.el.dataset.date.substring(5, 7);
    var day = date.el.dataset.date.substring(8, 11);
    var dateStr = [day, month, year].join("-");
    if(that.leavesData != undefined){
    for (var i = 0; i < that.leavesData.length; i++) {
      if (that.leavesData[i].date === dateStr && that.leavesData[i].fgtid === that.selected) {
        if (that.leavesData[i].status === "Approved") {
          date.el.insertAdjacentHTML("afterbegin", '<div style="color:green"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span>Approved</span></div>');
        } else if (that.leavesData[i].status === "Rejected") {
          date.el.insertAdjacentHTML("afterbegin", '<div  style="color:red"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span>Rejected</span></div>');
        } else {
          date.el.insertAdjacentHTML("afterbegin", '<div style="color:orange"><i class="fa fa-exclamation-triangle" aria-hidden="true" ></i><span>Pending</span></div>');
        }
      }
    }
  }
  if(that.configData != undefined){
    for (var i = 0; i < that.configData[0].festiveHoliday.length; i++) {
      debugger;
      if (that.configData[0].festiveHoliday[i].date === dateStr) {
        debugger;
        if (date.el.innerText === "") {
          date.el.innerHTML = that.configData[0].festiveHoliday[i].festive;
          date.el.style.fontWeight = "bold";
          date.el.style.color = "#518fed";
          date.el.style.fontSize = "1rem";
        } else {
          date.el.innerHTML = date.el.innerHTML + that.configData[0].festiveHoliday[i].festive;
          date.el.style.fontWeight = "bold";
          date.el.style.color = "#518fed";
          date.el.style.fontSize = "1rem";
        }
      }
    }
  }
  if(that.attendanceData != undefined){
    for (var i = 0; i < that.attendanceData.length; i++) {
      if (that.attendanceData[i].attendence[0].date === dateStr && that.attendanceData[i].fgtid === that.selected) {
        if (that.attendanceData[i].attendence[0].totalhours <= "04:30") {
          date.el.style.color = "red";
        } else if (that.attendanceData[i].attendence[0].totalhours <= "08:00") {
          date.el.insertAdjacentHTML("beforeend", '<div><h6 style="color:red">' + that.attendanceData[i].attendence[0].totalhours + "hrs" + '</h6></div>');
        } else {
          date.el.insertAdjacentHTML("beforeend", '<div><h6 style="color:green">' + that.attendanceData[i].attendence[0].totalhours + "hrs" + '</h6></div>');
        }
      }
    }
  }
  }
}
