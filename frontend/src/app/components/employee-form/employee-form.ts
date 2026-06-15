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
    // Initializing form configuration layout parameters including phone and address
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10,15}$')]], // 👈 Dynamic regex accepting 10-15 digit strings cleanly
      address: ['', [Validators.maxLength(255)]],          // 👈 Form control constraint matching VARCHAR capacity limit
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
          // patchValue will automatically match properties (name, email, phone, address, etc.)
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
          // Persist the success notification token to display a green banner on dashboard refresh
          localStorage.setItem('employeeAddedSignal', 'true');
          this.router.navigate(['/']);
        },
        error: () => alert('Failed to add employee')
      });
    }
  }
}