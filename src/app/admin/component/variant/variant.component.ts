import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  variantlar: any = [];
  displayedColumns: string[] = ['position', 'matn', 'tugri', 'amal'];

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private snakBar: MatSnackBar,
    private detecter: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public savol: Savol, private savolService: SavolService) {
    this.variantlar = savol.variantlar;
  }

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


    surov.subscribe((data: Savol) => {
      this.tozalash();
      this.surovBajarilmoqda = false;
      this.variantlar = data.variantlar;

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
    this.dialog.open(DeleteDialog).afterClosed().subscribe(data => {
      if (data) {
        this.savolService.deleteVariant(variant.id).subscribe(data => {

          this.variantlar.splice(this.variantlar.indexOf(variant), 1);
          this.variantlar = [...this.variantlar];
          this.detecter.detectChanges();
        })
      }

    })



  }
  tozalash() {
    this.variantForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }


}
