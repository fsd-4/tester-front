import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/account.service';
import { User } from 'src/app/model/user';
import { FaylService } from 'src/app/service/fayl.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user!: User;
  rasmManzil!: string;
  constructor(private accountService: AccountService, private faylService: FaylService) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(data => {
      if (data) {
        this.user = data;
        this.rasmManzilOzgar();

      }

    })
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);

    if (file) {
      this.faylService.uploadFayl(file).subscribe(f => {
        this.user.rasm = f;
        this.accountService.update(this.user).subscribe(data => {
          this.user = data;
          this.rasmManzilOzgar();
        })

      })
    }
  }
  rasmManzilOzgar() {
    if (this.user.rasm)
      this.rasmManzil = environment.baseApi + "/api/fayl/download/" + this.user.rasm.id;
  }

}
