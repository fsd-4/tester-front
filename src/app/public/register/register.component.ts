import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snakBar: MatSnackBar,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      ism: [null, Validators.required],
      familiya: [null],
      login: [null, Validators.required],
      parol: [null, Validators.required],
    })
  }

  register(){
    console.log(this.regForm.getRawValue());
    this.accountService.register(this.regForm.getRawValue()).subscribe(data=>{
          this.snakBar.open('Muvaffaqiyatli', "ok", {
            duration: 3000
          });
          this.router.navigate(['/login'])
    }, error=>{
      this.snakBar.open('xatolik ro\'y berdi', "ok", {
        duration: 3000
      });
    })
    
  }

}
