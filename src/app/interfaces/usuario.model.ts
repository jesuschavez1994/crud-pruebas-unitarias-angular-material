export class newUsuario{
    
    nombre: string | any;
    correo: string | any;
    password: string | any;
    role: string | any;
    uid?: string | any;

    constructor(nombre?: string, correo?: string, password?: string, role?: string, uid?: string){

        this.nombre = nombre || null;
        this.correo = correo;
        this.password = password;
        this.role = role;
        this.uid = uid || null;
    }
}