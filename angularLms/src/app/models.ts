export interface  Leaves {
    fgtid: String;
    date: String;
    status: String;
    comments: String;
    remark: String;
    islop: Boolean;
    iscompoff: Boolean;
    iscasual: Boolean;
    isfestive:Boolean;
    isothers:Boolean;
    approvedby:String;
    isworkfromhome:Boolean ; 
  }
  export interface employee {
    fgtid: String,
    name: String,
    dob: String,
    gender: String,
    bloodgroup: String,
    cpr: String,
    address: String,
    phone: [],
    email: [],
    emergencyconatct: [],
    location: [],
    reportingto: [{id:String}],
    releavingdate: String,
    role: String,
    companyemailid: String,
    avatar: String
  }
  export interface attendance {
    fgtid: String,
    attendence: []
  }
  export interface config{
    fgtid: String,
    availfestiveholiday: String,
    availleaves: String,
    availsick: String,
    festiveholiday: [],
    mandatoryhd: [],
    leaveincremnet: [],
    superuser: [],
  }