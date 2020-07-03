import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuard implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean>{
  return this.auth.appUser$.pipe(
      map((appUser: AppUser) => appUser.isAdmin)
  )
    
  }
}
