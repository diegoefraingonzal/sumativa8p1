import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userForm: FormGroup;
  users: Array<{ name: string; email: string; age: number }> = [];
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]]
    });
  }

  addUser() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      if (this.editingIndex !== null) {
        this.users[this.editingIndex] = newUser;
        this.editingIndex = null;
      } else {
        this.users.push(newUser);
      }
      this.userForm.reset();
    }
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }

  editUser(index: number) {
    const user = this.users[index];
    this.userForm.setValue({
      name: user.name,
      email: user.email,
      age: user.age
    });
    this.editingIndex = index;
  }
}
