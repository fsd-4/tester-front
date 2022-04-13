import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AccountService } from '../core/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  showFiller = false;
   @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
 
  constructor(private observer: BreakpointObserver, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }
 
 
 
   ngAfterViewInit() {
     this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
       if (res.matches) {
         this.sidenav.mode = 'over';
         this.sidenav.close();
       } else {
         this.sidenav.mode = 'side';
         this.sidenav.open();
       }
     });
   }

  logout(){
    this.accountService.logout();
    this.router.navigate(['/'])

  }
}
