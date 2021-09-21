import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleNav = new EventEmitter<void>();
  authSubscription: Subscription
  isLoggedIn: boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authSubscription = this.authService.authChange.subscribe(res => {
      this.isLoggedIn = res;
    })
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  toggleSidebar() {
    this.toggleNav.emit()
  }

  mainNav() {
    this.router.navigateByUrl('/profiles/add');
  }


  logout() {
    this.authService.logout();
  }

}
