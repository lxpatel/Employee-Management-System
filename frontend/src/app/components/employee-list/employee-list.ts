import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.html'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchTerm: string = '';

  // Status Notification Trackers
  showSuccessAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();

    // 🔍 BULLETIN CHECK: Checking localStorage for the success signal!
    const hasAddedSignal = localStorage.getItem('employeeAddedSignal');
    if (hasAddedSignal === 'true') {
      this.triggerSuccessAlert('New employee is added successfully!');
      // Instantly wipe it so it doesn't loop on refresh
      localStorage.removeItem('employeeAddedSignal');
    }
  }

  // Method to display the alert and auto-dismiss it after 4 seconds
  triggerSuccessAlert(msg: string): void {
    this.alertMessage = msg;
    this.showSuccessAlert = true;
    this.cdr.detectChanges(); // Sync view immediately

    setTimeout(() => {
      this.showSuccessAlert = false;
      this.cdr.detectChanges(); // Sync view on disappear
    }, 4000);
  }

  // FETCH ALL EMPLOYEES FROM BACKEND
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: any) => {
        console.log('API Raw Data:', data);
        this.employees = Array.isArray(data) ? data : [];
        this.filteredEmployees = [...this.employees];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('API Fetching Error:', err)
    });
  }

  // REAL-TIME SEARCH FILTER
  filterEmployees(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEmployees = this.employees;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredEmployees = this.employees.filter(emp => 
        (emp.name && emp.name.toLowerCase().includes(term)) || 
        (emp.department && emp.department.toLowerCase().includes(term))
      );
    }
    this.cdr.detectChanges();
  }

  // DELETE EMPLOYEE WITH CONFIRMATION
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => alert('Error deleting record.')
      });
    }
  }

  // EXPORT ACTIVE GRID TO CSV
  exportToCSV(): void {
    if (this.filteredEmployees.length === 0) {
      alert('No data available to export.');
      return;
    }
    const headers = ['Employee ID', 'Name', 'Email', 'Department', 'Salary (INR)'];
    const rows = this.filteredEmployees.map(emp => [
      emp.id,
      `"${emp.name}"`,
      emp.email,
      `"${emp.department}"`,
      emp.salary
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Workforce_Report_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}