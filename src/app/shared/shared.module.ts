import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewUserModalComponent } from './add-new-user-modal/add-new-user-modal.component';
import { MaterialModuleModule } from '../material/material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteUserComponent } from './delete-user/delete-user.component';


@NgModule({
  declarations: [
    AddNewUserModalComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
