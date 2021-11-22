import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from 'src/app/material/material-module.module';
import { ContactListComponent } from './contact-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ContactListComponent],
  imports: [
    CommonModule, 
    MaterialModuleModule,
    SharedModule
  ],
  exports:[ContactListComponent]
})
export class ContactListModule{ }
