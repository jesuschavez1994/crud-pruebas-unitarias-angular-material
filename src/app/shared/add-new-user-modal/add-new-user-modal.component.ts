import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Refrencia } from 'src/app/interfaces/create-user';
import { newUsuario } from 'src/app/interfaces/usuario.model';

@Component({
  selector: 'app-add-new-user-modal',
  templateUrl: './add-new-user-modal.component.html',
  styleUrls: ['./add-new-user-modal.component.scss']
})
export class AddNewUserModalComponent implements OnInit {

  hide = true;
  forma: FormGroup;
  

  constructor( public dialogRef: MatDialogRef<AddNewUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Refrencia) { 

    this.forma = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.pattern('[aA-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      role: new FormControl('', [Validators.required]),
    });

    if(data.usuario?.uid){
      this.forma.patchValue(data.usuario)
    }

  }

  ngOnInit(): void {
  }

  onNoClick(): void {

    (this.data.usuario?.uid) ? 

    this.dialogRef.close(new newUsuario(
      this.forma.controls['nombre'].value,
      this.forma.controls['correo'].value,
      this.forma.controls['password'].value,
      this.forma.controls['role'].value,
      this.data.usuario.uid
    ))

    :
    
    this.dialogRef.close(new newUsuario(
      this.forma.controls['nombre'].value,
      this.forma.controls['correo'].value,
      this.forma.controls['password'].value,
      this.forma.controls['role'].value,
    ));
    

  }

  public Send(){
    
  }

  public getErrorMessage( campo: string ) {
    return  this.forma.controls[campo].errors && this.forma.controls[campo].touched;
  }

}
