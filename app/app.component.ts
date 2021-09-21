import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  openSidenav = false;
  title = 'angular-material';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
