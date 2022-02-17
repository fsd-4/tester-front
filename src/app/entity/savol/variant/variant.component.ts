import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Savol } from 'src/app/model/savol';
import { SavolService } from 'src/app/service/savol.service';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit {
  rasmUrl: any;

  constructor(@Inject(MAT_DIALOG_DATA) public savol: Savol, private savolService: SavolService) { }

  ngOnInit(): void {
    
    
    this.savolService.getFile(this.savol.id).subscribe(data=>{
      const reader = new FileReader();
      reader.readAsDataURL(data); //FileStream response from .NET core backend
      reader.onload = _event => {
          this.rasmUrl = reader.result; //url declared earlier
          console.log(this.rasmUrl);
          
         
      };
      
    })
  }

}
