import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactListComponent } from './contact-list.component';
import { ContactService } from 'src/app/services/contact.service';
import { Observable, of } from 'rxjs';
import { ListaUsuario } from 'src/app/interfaces/contact';
import { MaterialModuleModule } from 'src/app/material/material-module.module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

class ContactHttpTestingService {

  getAll(): Observable<ListaUsuario>{
    return of({
      "msg": "Get API - Controller",
      "total": 1,
      "usuarios": [
        {
          "role": "ADMIN_ROLE",
          "estado": true,
          "google": false,
          "nombre": "jesus2",
          "correo": "jesus@gmail.com",
          "uid": "619a94f516574839c4ec0d9e"
        }
      ]
    });
  }

  create(){
    return of({
      "msg": "Post API - Controller",
      "usuarios": {
          "nombre": "Emma",
          "google": true,
          "correo": "Emma@gamil.com",
          "password": "12345678",
          "role": "USER_ROLE",
          "uid": "619a94f516574839c4ec0d9c"
      }
    })
  }

  update(){
    return of({
      "msg": "Put API - Controller",
      "usuario": {
          "nombre": "Update Test",
          "estado": "true",
          "google": true,
          "correo": "update@gamil.com",
          "password": "12345678",
          "role": "USER_ROLE",
          "uid": "619a94f516574839c4ec0d9c"
      }
    })
  }

  delete(){
    return of({
        "msg": "Delete  API - Controller",
        "usuario": {
            "role": "ADMIN_ROLE",
            "estado": false,
            "google": false,
            "nombre": "jesus2",
            "correo": "jesus@gmail.com",
            "uid": "619a94f516574839c4ec0d9e"
        }
    })
  }


}

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactHttp: ContactService // <- variable creada para tener acceso al servicio y no colocar en el constructor de tipo publico
  let dialogSpy: jasmine.SpyObj<MatDialog>; // <- Creamos un espia
  /*************
   otra forma de acceder a los metodos de mi servicio 
   let ContactHttpSpy: jasmine.SpyObj<ContactService> <- creamos el espia
  Y en los provider cambia de useClass => useValue:
  { provide: ContactService, useValue: ContactHttpService }
  *************/


  
  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']); // <- Supervisamos la funcionalidad open de MatDialog
    //ContactHttpSpy = jasmine.createSpyObj<ContactService>('ContactService', ['update']);

    await TestBed.configureTestingModule({
      declarations: [ ContactListComponent ],
      imports: [MaterialModuleModule],
      providers: [
        //{ provide: ContactService, useValue: ContactHttpSpy },
        { provide: ContactService, useClass: ContactHttpTestingService }, // <- Creamos una clase pra no importar HttpClientTestingModule y que nos arroje el problema de la importacione del modulo HttpClientModule
        { provide: MatDialog,      useValue: dialogSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    contactHttp = TestBed.inject(ContactService); // <- para tener acceso al servicio y no colocar en el constructor del componente que sea de tipo publico para poder tener acceso a sus metodos
  });

  it('Se instacia el componente', () => {
    expect(component).toBeTruthy();
  });

  it('inicia con una lista de contacto', () =>{
    expect(component.usuarios.length).toBe(1)
  });

  it('El metodo load debe inicializar la lista de contactos', () => {
    spyOn(contactHttp, 'getAll').and.callThrough();
    component.load();
    expect(component.usuarios.length).toBe(1)
  });

  it('El metodo create debe agregar un nuevo contacto', () => {

    const mockCreateContact: any = {
      "nombre": "Emma",
      "estado": "true",
      "google": true,
      "correo": "Emma@gamil.com",
      "password": "12345678",
      "role": "USER_ROLE",
      
    }

    spyOn(contactHttp, 'create').and.callThrough();
    component.create(mockCreateContact);
    expect(component.usuarios.length).toBe(2); // <- retorna dos porque se esta creando uno nuevo y el metodo esta devolviendo uno por defecto
    expect(component.usuarios[0].nombre).toBe('jesus2');
    expect(component.usuarios[1].nombre).toBe('Emma');
  });

  it('El metodo update debe actualizar el usuario', () => {

    const mockCreateContact: any = {
      "nombre": "Emma",
      "estado": "true",
      "google": true,
      "correo": "Emma@gamil.com",
      "password": "12345678",
      "role": "USER_ROLE"
    }

    const mockUpdate: any ={
      "nombre": "Update Test",
      "google": true,
      "correo": "update@gamil.com",
      "password": "12345678",
      "role": "USER_ROLE",
      "uid": "619a94f516574839c4ec0d9c"
    }
    
    spyOn(contactHttp, 'create').and.callThrough();
    component.create(mockCreateContact);
    spyOn(contactHttp,  'update').and.callThrough();
    component.update(mockUpdate);
  })

  it('Eliminar un contacto', ()=> {
    
    const mockDeleteContact: any = {
      "role": "ADMIN_ROLE",
      "estado": true,
      "google": false,
      "nombre": "jesus2",
      "correo": "jesus@gmail.com",
      "uid": "619a94f516574839c4ec0d9e"
    }

    spyOn(contactHttp, 'delete').and.callThrough();
    component.remove(mockDeleteContact);
    expect(component.usuarios.length).toBe(0);
  
  });

  it('El componente de abrir un modal de confirmacion para eliminar', () =>{

    const mockDeleteContact: any = {
      "role": "ADMIN_ROLE",
      "estado": true,
      "google": false,
      "nombre": "jesus2",
      "correo": "jesus@gmail.com",
      "uid": "619a94f516574839c4ec0d9e"
    }

    const dialog ={ afterClosed: () => of(true) } as MatDialogRef<unknown>
    dialogSpy.open.and.returnValue( dialog )
    component.openRemoveConfirmModal(mockDeleteContact);
    expect(dialogSpy.open).toHaveBeenCalled()
  })

  it('Se debe abrir el Modal para editar un nuevo contacto', ()=>{
    const mockDeleteContact: any = {
      "role": "ADMIN_ROLE",
      "estado": true,
      "google": false,
      "nombre": "jesus2",
      "correo": "jesus@gmail.com",
      "uid": "619a94f516574839c4ec0d9e"
    }

    const dialog ={ afterClosed: () => of(mockDeleteContact) } as MatDialogRef<unknown>
    dialogSpy.open.and.returnValue( dialog )
    component.openFormModal(mockDeleteContact);
    expect(dialogSpy.open).toHaveBeenCalled()
  })

  it('Se debe abrir el Modal para crear un nuevo contacto', ()=>{
    const mockDeleteContact: any = {
      "role": "ADMIN_ROLE",
      "estado": true,
      "google": false,
      "nombre": "jesus2",
      "correo": "jesus@gmail.com",
    }

    const dialog ={ afterClosed: () => of(mockDeleteContact) } as MatDialogRef<unknown>
    dialogSpy.open.and.returnValue( dialog )
    component.openFormModal(mockDeleteContact);
    expect(dialogSpy.open).toHaveBeenCalled()
  })


});

/*
  ng test --code-covetage <- Con esto creamos la carpeta covererage para poder visualizar la covertura de nuestra pruebas unitarias
*/
