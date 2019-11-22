import { Component, OnInit,Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NewServService } from '../new-serv.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  empData;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<ProfileComponent>,private dialog: MatDialog,private newServService: NewServService) { }

  ngOnInit() {
    this.newServService.GetEmp().subscribe(data => {
      this.empData = data;
      console.log( this.empData[0]);
    });
  }
  onSave(){
    debugger;
    var profiletable = (document.getElementById('profiletable') as HTMLTableElement);
    var fgtid = (profiletable.rows[0].cells[2].childNodes[0] as HTMLInputElement).defaultValue;
    // var objid = profiletable.rows[0].cells[2].childNodes[0].getAttribute("typeid");
    var phone = (profiletable.rows[4].cells[2].childNodes[0] as HTMLInputElement).value;
    var email = (profiletable.rows[5].cells[2].childNodes[0] as HTMLInputElement).value;
    var cpr = (profiletable.rows[6].cells[2].childNodes[0] as HTMLInputElement).value;
    var dateofjoining = (profiletable.rows[7].cells[2].childNodes[0] as HTMLInputElement).value;
    var employeestatus =(profiletable.rows[8].cells[2].childNodes[0] as HTMLInputElement).value;
    var location = (profiletable.rows[9].cells[2].childNodes[0] as HTMLInputElement).value;
    var reportingto = (profiletable.rows[10].cells[2].childNodes[0] as HTMLInputElement).value;
    var releavingdate = (profiletable.rows[11].cells[2].childNodes[0] as HTMLInputElement).value;
    var role = (profiletable.rows[12].cells[2].childNodes[0] as HTMLInputElement).value;
    var companyemailiD = (profiletable.rows[13].cells[2].childNodes[0] as HTMLInputElement).value;
    var avatar = (profiletable.rows[14].cells[2].childNodes[0] as HTMLInputElement).value;
    var phnchk = (profiletable.rows[4].cells[4].childNodes[0] as HTMLInputElement).checked;
    var emailchk = (profiletable.rows[5].cells[4].childNodes[0] as HTMLInputElement).checked;
    var name = (profiletable.rows[1].cells[2].childNodes[0] as HTMLInputElement).value;
    var obj = this.empData[0];
    // obj._id = objid;
    obj.phone[0].number = phone;
    obj.phone[0].private = phnchk;
    obj.email[0].id = email;
    obj.email[0].emailchk = emailchk;
    obj.cpr = cpr;
    obj.name = name;
    obj.dateofjoining = dateofjoining;
    obj.employeestatus = employeestatus;
    obj.reportingto[0].id = reportingto;
    obj.releavingdate = releavingdate;
    obj.location = location;
    obj.role = role;
    obj.companyemailid = companyemailiD;
    obj.avatar = avatar;

    console.log(obj);
    this.newServService.updateEmp(obj).subscribe(data => {
      alert(data.data);
      // this.ngOnInit();
    }, error => console.log(error)); 
    this.dialogRef.close();
  }
  onClose(){
    this.dialogRef.close();
  }
}
