import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: '',
  };
  warning: any;
  @Input() success = false;
  @Input() loading = false;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.registerUser = new RegisterUser();
  }
  onSubmit(f: NgForm): void {
    if (this.registerUser.userName && this.registerUser.password) {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        () => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    } else {
      this.success = false;
      this.warning = 'Username or password field is empty';
      this.loading = false;
    }
  }
}
