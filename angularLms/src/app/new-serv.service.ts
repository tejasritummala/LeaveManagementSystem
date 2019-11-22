import { Injectable } from '@angular/core';
import { HttpClient ,HttpResponse} from '@angular/common/http';
import {Http,Response, Headers, RequestOptions } from '@angular/http';    
import { Observable,of } from 'rxjs';  
import { map } from 'rxjs/operators' 
import {Leaves,employee,attendance} from './models';
@Injectable({
  providedIn: 'root'
})
export class NewServService {
  public arr = [];
  constructor( private http: HttpClient,private https:Http) { }
  selectedDates(data){
    this.arr = [];
    for (let each of data)
        this.arr.push(each)
}
returnObject(){
    console.log("From service",this.arr);
    return this.arr
}
GetUser():Observable<Leaves[]>{         
   return this.https.get('http://localhost:8081/api/getUser/')  
            .pipe(map((response: Response) => response.json())) 
} 
  saveUser(user){  
    console.log("service",user);  
    return this.https.post('http://localhost:8081/api/SaveUser/', user)  
    .pipe(map((response: Response) => response.json()))   
  }  
  updateUser(user){  
    return this.https.post('http://localhost:8081/api/updateUser/', user)  
    .pipe(map((response: Response) => response.json()))   
  }  
  deleteUser(id){   
    return this.http.post('http://localhost:8081/api/deleteUser/',{'id': id})  
          .pipe(map((response: Response) => response.json()))              
  }
  GetEmp():Observable<employee[]>{         
    return this.https.get('http://localhost:8081/api/getEmp/')  
            .pipe(map((response: Response) => response.json()))                       
  } 
  saveEmp(emp){  
    // console.log("service",emp);  
    return this.https.post('http://localhost:8081/api/SaveEmp/', emp)  
    .pipe(map((response: Response) => response.json()))   
  } 
  updateEmp(emp){  
    debugger;
    return this.https.post('http://localhost:8081/api/updateEmp/', emp)  
    .pipe(map((response: Response) => response.json()))   
  }
  GetAtt():Observable<attendance[]>{        
   return this.https.get('http://localhost:8081/api/getAtt/')  
            .pipe(map((response: Response) => response.json()))                     
  } 
  GetConfig(){        
    return this.https.get('http://localhost:8081/api/getConfig/')  
             .pipe(map((response: Response) => response.json()))                     
   } 
}
