import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.html'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.employeeId = +idParam;
      
      this.employeeService.getEmployees().subscribe(employees => {
        const emp = employees.find(e => e.id === this.employeeId);
        if (emp) {
          this.employeeForm.patchValue(emp);
        }
      });
    }
  }

 onSubmit(): void {
    if (this.employeeForm.invalid) return;

    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => alert('Failed to update employee')
      });
    } else {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe({
        next: () => {
          // 1. Pehle hum browser ke localStorage mein signal save kar rahe hain
          localStorage.setItem('employeeAddedSignal', 'true');
          
          // 2. Uske baad hum list page par redirect kar rahe hain
          this.router.navigate(['/']);
        },
        error: () => alert('Failed to add employee')
      });
    }
  }
}