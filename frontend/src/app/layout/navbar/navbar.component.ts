import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../store/auth/auth.state';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { logout } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
})
export class NavbarComponent implements OnInit {
  user$!: Observable<User | null>;
  showUserMenu = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectCurrentUser);
  }

  doLogout(): void {
    this.showUserMenu = false;
    this.store.dispatch(logout());
  }
}
