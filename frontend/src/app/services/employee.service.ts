import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {}

  // 1. GET ALL EMPLOYEES
  getEmployees(): Observable<any[]> {
    const cacheBusterUrl = `${this.apiUrl}?t=${new Date().getTime()}`;
    return this.http.get<any>(cacheBusterUrl).pipe(
      map(response => {
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.results)) return response.results;
        if (response && response.data) return Array.isArray(response.data) ? response.data : [];
        return [];
      })
    );
  }

  // 2. GET SINGLE EMPLOYEE BY ID (For pre-populating edit form)
  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 3. ADD NEW EMPLOYEE
  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee);
  }

  // 4. UPDATE EXISTING EMPLOYEE
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employee);
  }

  // 5. DELETE EMPLOYEE
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}