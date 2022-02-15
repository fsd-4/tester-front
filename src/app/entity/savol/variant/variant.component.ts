import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Savol } from 'src/app/model/savol';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public savol: Savol) { }

  ngOnInit(): void {
  }

}
