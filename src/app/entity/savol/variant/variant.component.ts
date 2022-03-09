import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Savol } from 'src/app/model/savol';
import { SavolService } from 'src/app/service/savol.service';
import { DeleteDialog } from 'src/app/shared/delete-dialog.component';



@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit {
  rasmUrl: any;

  variantForm!: FormGroup;
  tahrirRejim = false;
  surovBajarilmoqda = false;
  formOchiq = false;

  displayedColumns: string[] = ['id', 'matn', 'tugri', 'amal'];

  constructor(private fb: FormBuilder,

    private snakBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public savol: Savol, private savolService: SavolService) { }

  ngOnInit(): void {
    this.variantForm = this.fb.group({
      id: [''],
      matn: ['', Validators.required],
      tugri: [false]
    });


    // this.variantService.getFile(this.variant.id).subscribe(data=>{
    //   const reader = new FileReader();
    //   reader.readAsDataURL(data); //FileStream response from .NET core backend
    //   reader.onload = _event => {
    //       this.rasmUrl = reader.result; //url declared earlier
    //       console.log(this.rasmUrl);


    //   };

    // })
  }


  ngAfterViewInit(): void {

  }


  saqlash() {
    this.surovBajarilmoqda = true;
    let variant = this.variantForm.getRawValue();
    variant.savol = this.savol;
    let surov;
    if (this.tahrirRejim)
      surov = this.savolService.updateVariant(variant);
    else
      surov = this.savolService.createVariant(variant);


    surov.subscribe((data: any) => {
      this.tozalash();
      this.surovBajarilmoqda = false;
      this.savol = data;
    },
      (error: any) => {
        this.snakBar.open("Xatolik ro'y berdi", "Ok");
        this.surovBajarilmoqda = false;
      });



  }
  tahrir(variant: any) {
    let s = Object.create(variant);

    this.variantForm.reset(s);
    this.tahrirRejim = true;
    this.formOchiq = true;
  }
  ochirish(variant: any) {

  }
  tozalash() {
    this.variantForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }


}
