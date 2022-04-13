import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { bottom } from '@popperjs/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccessGuard implements CanActivate {

  constructor(
    private router: Router, 
    private snakBar: MatSnackBar,
    private accountService: AccountService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let role = route.data['role'];
      console.log("keldim", role);
      
      if(role && role[0] && this.accountService.hasRole(role)){
        return true;
      }       
      console.log("huquq yo'q");
      
      this.snakBar.open("Bu bo'limga sizga huquq yo'q!", "X", {
        duration: 4000,
        direction: "ltr"
      })
      this.router.navigate(['/login'])
      return false;
      
  }
  
}
