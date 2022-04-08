import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fan } from 'src/app/model/fan';
import { FanService } from 'src/app/service/fan.service';
import { DeleteDialog } from 'src/app/shared/delete-dialog.component';

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss']
})
export class FanComponent implements OnInit {

  fanForm!: FormGroup;
  tahrirRejim = false;
  surovBajarilmoqda = false;
  formOchiq = false;

  displayedColumns: string[] = ['id', 'nom', 'fanDaraja', 'malumot',  'amal'];
  dataSource: any;

  filter = new FormControl('filter');


  constructor(private fb: FormBuilder, private fanService: FanService,
    private snakBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fanForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      fanDaraja: ['', Validators.required],
      malumot: []
    });
    this.load();

  }
  load(key?: any) {
    if (!key) {
      key = '';
    } else {
        if(typeof(key)=='object'){
          key = key.value;
        }
        console.log(key);
        
      
    }
  this.fanService.getAll(key).subscribe(data => {
        this.dataSource = data;
      })
  }

  saqlash() {
    this.surovBajarilmoqda = true;
    let fan = this.fanForm.getRawValue();
    let surov;
    if (this.tahrirRejim)
      surov = this.fanService.update(fan);
    else
      surov = this.fanService.create(fan);


    surov.subscribe(data => {
      this.tozalash();
      this.load();
      this.surovBajarilmoqda = false;
    },
      error => {
        this.snakBar.open("Xatolik ro'y berdi", "Ok");
        this.surovBajarilmoqda = false;
      })



  }
  tahrir(fan: Fan) {
    this.fanForm.reset(fan);
    this.tahrirRejim = true;
    this.formOchiq = true;
  }
  ochirish(fan: Fan) {
    this.dialog.open(DeleteDialog).afterClosed().subscribe(data => {
      if (data) {
        this.fanService.deleteById(fan.id).subscribe(data => {
          this.load();
        })
      }

    })

  }
  tozalash() {
    this.fanForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }


}
