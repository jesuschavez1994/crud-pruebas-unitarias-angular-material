export interface Refrencia {
  usuario: Usuario;
}

export interface Usuario {
  role: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  correo: string;
  uid: string;
}