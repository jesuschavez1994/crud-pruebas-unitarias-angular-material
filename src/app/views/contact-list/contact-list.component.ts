import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddNewUserModalComponent } from 'src/app/shared/add-new-user-modal/add-new-user-modal.component';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/interfaces/contact';
import { DeleteUserComponent } from 'src/app/shared/delete-user/delete-user.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  usuarios: Contact[] = []
  loadUser: boolean = false;

  constructor(
    private contactService: ContactService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.load()
  }

  public openFormModal(usuario?: Contact){
    
    const dialogRef = this.dialog.open(AddNewUserModalComponent, {
      width: '350px',
      disableClose: true,
      data: {  usuario }
    });

    dialogRef.afterClosed().subscribe( (usuario: Contact) => {
       usuario.uid ? this.update(usuario) : this.create(usuario)
    });
    
  }

  public load(){
    this.loadUser = true;
    this.contactService.getAll().subscribe( x => {
      this.usuarios = x.usuarios;
      this.loadUser = false;
    });
  }

  public openRemoveConfirmModal(usuario: Contact){
      
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '350px',
      disableClose: true,
    });

    dialogRef.afterClosed().pipe(
      filter( x => Boolean(x))
    ).subscribe( () => this.remove(usuario) )
    
  }

  public update(usuario: Contact){
    this.contactService.update(usuario).subscribe( userUpdate =>{
      const index = this.usuarios.findIndex( user => user.uid === userUpdate.usuario.uid );
      this.usuarios[index] = usuario;
    })
  }

  public create(usuarioToCreate: Contact){
    this.loadUser = true;
    this.contactService.create(usuarioToCreate).subscribe( x => {
      this.loadUser = false;
      this.usuarios.push(x.usuarios as any);
    })
  }

  public remove(usuario: Contact){
    this.contactService.delete(usuario).subscribe(
      resp =>{
        const index = this.usuarios.findIndex( user => user.uid === resp.usuario.uid );
        this.usuarios.splice(index, 1);
      }
    )
  }

}
