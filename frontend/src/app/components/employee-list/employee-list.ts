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

  // 1. Inject ChangeDetectorRef into the constructor
  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: any) => {
        console.log('API Raw Data:', data);
        this.employees = Array.isArray(data) ? data : [];
        this.filteredEmployees = [...this.employees];
        
        // 2. FORCE ANGULAR TO REDRAW THE LAYOUT TEMPLATE IMMEDIATELY
        this.cdr.detectChanges();
      },
      error: (err) => console.error('API Fetching Error:', err)
    });
  }

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
    this.cdr.detectChanges(); // Force redraw on search filter too
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => alert('Error deleting record.')
      });
    }
  }
}