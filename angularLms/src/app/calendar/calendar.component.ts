import { Component, OnInit,ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput,Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NewServService } from '../new-serv.service';
import {employee} from '../models';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  isThisSecond
} from 'date-fns';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('fullcalendar',{static:true}) calendarComponent: FullCalendarComponent;
  dataSource: any;
  currentDate: Date = new Date(2017, 4, 25);
  private imageSrc: string = '';
  leavesData;
  empData;
  attendanceData;
  configData;
  ld;
  cal;
  dates = [];
  arr=[];
  options: OptionsInput;
  viewDate: Date = new Date();
  
  events = [  {
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: colors.red,
    allDay: true,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  },
  {
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: colors.yellow,
   
  },
  {
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: colors.blue,
    allDay: true
  },
  {
    start: addHours(startOfDay(new Date()), 2),
    end: new Date(),
    title: 'A draggable and resizable event',
    color: colors.yellow,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  }];
  
  constructor(private newServService: NewServService,private http: HttpClient) {
    this.dataSource = new DataSource({
      store: new CustomStore({
          load: (options) => this.getData(options, { showDeleted: false })
      })
  });
  }
  private getData(options: any, requestOptions: any) {
    let PUBLIC_KEY = 'AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k',
        CALENDAR_ID = 'f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com';
    let dataUrl = [ 'https://www.googleapis.com/calendar/v3/calendars/',
            CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');

    return this.http.get(dataUrl, requestOptions).toPromise().then((data: any) => data.items);
}

dayRender(date) {
  var that = this;
  var year = date.el.dataset.date.substring(2, 4);
  var month = date.el.dataset.date.substring(5, 7);
  var day = date.el.dataset.date.substring(8, 11);
  var dateStr = [day, month, year].join("-");
  if(that.leavesData != undefined){
    var that = this;
    // date.el.onmouseover = function () {
    //   for (var i = 0; i < this.leavesData.length; i++) {
    //     if (this.leavesData[i].date === dateStr && this.leavesData[i].fgtid === "FGT1001") {
    //       date.el.title = this.leavesData[i].comments;
    //     }
    //   }
    // }
    for (var i = 0; i < that.leavesData.length; i++) {
      if (that.leavesData[i].date === dateStr && that.leavesData[i].fgtid === "FGT1001") {
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
  if(that.attendanceData != undefined){
  for (var i = 0; i < that.attendanceData.length; i++) {
    if (that.attendanceData[i].attendence[0].date === dateStr && that.attendanceData[i].fgtid === "FGT1001") {
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
if(that.configData != undefined){
  for (var i = 0; i < that.configData[0].festiveHoliday.length; i++) {
  
    if (that.configData[0].festiveHoliday[i].date === dateStr) {
  
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
 

}
calldayRender(){
  debugger;
  let calendarApi = this.calendarComponent.getApi();
  calendarApi.render();
}
select(arg) {
        alert("selected");
        var that = this;
        that.dates = that.getDates(arg.start, arg.end); 
        var updatedDatess = [];
        for (var i = 0; i < that.dates.length; i++) {
    
          var date = {
            //fgtid: self.props.location.state.empdet.fgtid,
            fgtid: "FGT1001",
            date: that.dates[i],
            status: "Pending",
            comments: "",
            remark: "",
            islop: false,
            iscasual: false,
            iscompoff: false,
            isfestive: false,
            approvedby: "",
            isdowntime: false,
            isothers: false,
            isworkfromhome: false
          }
          updatedDatess.push(date);
        }
        console.log(updatedDatess);
        that.newServService.selectedDates(updatedDatess);
      }
   
ngOnInit() {
    debugger;   
    this.dates = [];
    this.newServService.selectedDates([]);
    this.ld = this.newServService.GetUser();
    this.newServService.GetConfig().subscribe(data => {
      this.configData = data;
      console.log(this.configData);
    });
    this.newServService.GetUser().subscribe(data => {
      this.leavesData = data;
    });
    this.newServService.GetEmp().subscribe(data => {
      this.empData = data;
    });
    this.newServService.GetAtt().subscribe(data => {
      this.attendanceData = data;
      console.log(data);
    });
    this.options = {
      googleCalendarApiKey: 'AIzaSyDpySfy1n16129SFOBRDA-Nt_t6JX6EHnU',
      editable: true,
      events: 'en.indian#holiday@group.v.calendar.google.com',
      eventSources:[
        // {
        //   googleCalendarId:'tejasritummala@gmail.com'
        // },
        {
          googleCalendarId: 'dt0blhcb2qvugvih960988l9r4@group.calendar.google.com',
          className: 'nice-event'
        }
      ],
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
  getDates(strDate, endDate) {
    debugger;
    var dates = [],
      currentDate = strDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      var date = new Date(currentDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      currentDate = [date.getFullYear(), mnth, day].join("-");
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }
  onSubmit(){
    var obj={
      fgtid: "FGT1115",
      name: "Teju",
      dob: "15-07-1997",
      gender: "Female",
      bloodgroup: "B+",
      cpr: "",
      address: "Gpalli",
      phone: [],
      email: [],
      emergencyconatct: [],
      location: [],
      reportingto: [{id:"FGT1001"}],
      releavingdate: "",
      role: "manager",
      companyemailid: "teja@fulcrum-gt.com",
      avatar: this.imageSrc
    }
    this.newServService.saveEmp(obj).subscribe(data => {
      alert(data.data);
    }, error => console.log(error));
  }
  eventClick(event){
    alert("eventClick")
    console.log(event);
  }
}
