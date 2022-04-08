import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Savol } from 'src/app/model/savol';
import { FanService } from 'src/app/service/fan.service';
import { SavolService } from 'src/app/service/savol.service';
import { DeleteDialog } from 'src/app/shared/delete-dialog.component';
import { VariantComponent } from '../variant/variant.component';

@Component({
  selector: 'app-savol',
  templateUrl: './savol.component.html',
  styleUrls: ['./savol.component.scss']
})
export class SavolComponent implements OnInit, AfterViewInit {

  savolForm!: FormGroup;
  tahrirRejim = false;
  surovBajarilmoqda = false;
  formOchiq = false;

  displayedColumns: string[] = ['id', 'matn', 'fan', 'savol-daraja', 'amal'];
  dataSource: any;
  fanlar: any;
  expandedElement: any;
  filter = new FormControl('filter');

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
    private savolService: SavolService,
    private fanService: FanService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.load());

    this.load();
  }

  ngOnInit(): void {
 
    
    this.savolForm = this.fb.group({
      id: [''],
      matn: ['', Validators.required],
      fan: ['', Validators.required],
      savolDaraja: ['', Validators.required]
    });
   
    this.fanService.getAll('').subscribe(data => {
      this.fanlar = data;
    })

  }
  load(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof (key) == 'object') {
        key = key.value;
      }
      console.log(key);


    }
    this.savolService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: this.sort.active+","+this.sort.direction ?? 'id'
    }).subscribe(data => {
      console.log(data);
      this.dataSource = data.content;

      this.length = data.totalElements;
    });

  }

  saqlash() {
    this.surovBajarilmoqda = true;
    let savol = this.savolForm.getRawValue();
    savol.fan = {
      id: savol.fan
    }
    let surov;
    if (this.tahrirRejim)
      surov = this.savolService.update(savol);
    else
      surov = this.savolService.create(savol);


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
  tahrir(savol: Savol) {
    let s = Object.create(savol);
    s.fan = savol.fan.id;
    this.savolForm.reset(s);
    this.tahrirRejim = true;
    this.formOchiq = true;
  }
  ochirish(savol: Savol) {
    this.dialog.open(DeleteDialog).afterClosed().subscribe(data => {
      if (data) {
        this.savolService.deleteById(savol.id).subscribe(data => {
          this.load();
        })
      }

    })

  }
  tozalash() {
    this.savolForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }
  variantlar(savol: Savol){
      this.dialog.open(VariantComponent, {
        data: savol,
        minWidth: 400
      }).afterClosed().subscribe(data=>{

      })
  }

}
