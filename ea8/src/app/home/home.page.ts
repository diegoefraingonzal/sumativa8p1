import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  userForm: FormGroup;
  users: { name: string; email: string; age: number }[] = [];
  editingIndex: number | null = null;

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
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

  editUser(index: number) {
    this.editingIndex = index;
    this.userForm.setValue({
      name: this.users[index].name,
      email: this.users[index].email,
      age: this.users[index].age,
    });
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }
}
