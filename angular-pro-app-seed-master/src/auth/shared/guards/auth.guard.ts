import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {User} from "firebase/app";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authState.map((user: User) => {
      if (!user) {
        this.router.navigate(['auth/login'])
      }
      return !!user;
    })
  }

}
