import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>) { }

  ngOnInit(): void {
  }

  closeModal(event: boolean){
    this.dialogRef.close(event)
  }

}
