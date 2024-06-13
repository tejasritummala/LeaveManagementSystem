import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Leaves, Employee, Attendance } from './models';

@Injectable({
  providedIn: 'root'
})
export class NewServService {
  public arr: any[] = [];

  constructor(private http: HttpClient) { }

  selectedDates(data: any[]): void {
    this.arr = [...data];
  }

  returnObject(): any[] {
    console.log("From service", this.arr);
    return [...this.arr];
  }

  getUser(): Observable<Leaves[]> {
    return this.http.get<Leaves[]>('http://localhost:8081/api/getUser/');
  }

  saveUser(user: any): Observable<any> {
    console.log("service", user);
    return this.http.post('http://localhost:8081/api/SaveUser/', user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post('http://localhost:8081/api/updateUser/', user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.post('http://localhost:8081/api/deleteUser/', { 'id': id });
  }

  getEmp(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:8081/api/getEmp/');
  }

  saveEmp(emp: any): Observable<any> {
    // console.log("service", emp);  
    return this.http.post('http://localhost:8081/api/SaveEmp/', emp);
  }

  updateEmp(emp: any): Observable<any> {
    return this.http.post('http://localhost:8081/api/updateEmp/', emp);
  }

  getAtt(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>('http://localhost:8081/api/getAtt/');
  }

  getConfig(): Observable<any> {
    return this.http.get('http://localhost:8081/api/getConfig/');
  }
}
