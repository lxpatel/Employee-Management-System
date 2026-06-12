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

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // 1. FETCH ALL EMPLOYEES FROM BACKEND
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: any) => {
        console.log('API Raw Data:', data);
        this.employees = Array.isArray(data) ? data : [];
        this.filteredEmployees = [...this.employees];
        
        // Force Angular to render async data immediately
        this.cdr.detectChanges();
      },
      error: (err) => console.error('API Fetching Error:', err)
    });
  }

  // 2. REAL-TIME SEARCH FILTER
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
    this.cdr.detectChanges(); // Force redraw on search
  }

  // 3. DELETE EMPLOYEE WITH CONFIRMATION
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => alert('Error deleting record.')
      });
    }
  }

  // 4. PROFESSIONAL ADD-ON: EXPORT ACTIVE GRID TO CSV
  exportToCSV(): void {
    if (this.filteredEmployees.length === 0) {
      alert('No data available to export.');
      return;
    }

    // Define standard spreadsheet headers
    const headers = ['Employee ID', 'Name', 'Email', 'Department', 'Salary (INR)'];
    
    // Map objects into formatted rows
    const rows = this.filteredEmployees.map(emp => [
      emp.id,
      `"${emp.name}"`, // Wrapped in quotes to handle potential spaces/commas safely
      emp.email,
      `"${emp.department}"`,
      emp.salary
    ]);

    // Build raw CSV text compilation block
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    // Generate an invisible background download payload stream
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