import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() user: User = {
    userName: '',
    password: '',
    _id: null,
  };
  warning: any;
  @Input() loading = false;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = new User();
  }
  onSubmit(f: NgForm): void {
    if (this.user.userName && this.user.password) {
      this.loading = true;
      this.auth.login(this.user).subscribe(
        (success) => {
          this.loading = false;
          localStorage.setItem('access_token', success.token);
          this.router.navigate(['/new-releases']);
        },
        (err) => {
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    } else {
      this.warning = 'Username or password field is empty';
      this.loading = false;
    }
  }
}
