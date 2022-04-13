import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }
  login(){
    const loginParol = this.loginForm.getRawValue();
    console.log(loginParol);
    this.accountService.login(loginParol).subscribe(data=>{
        this.accountService.identity().subscribe((data: any)=>{
          if(data && data.role){
              switch(data.role){
                case "ADMIN": {
                  this.router.navigate(['admin']);
                } break;
                default: {
                  this.router.navigate(['user']);
                } break;
              }
          }
        });
    })

    
  }

}
