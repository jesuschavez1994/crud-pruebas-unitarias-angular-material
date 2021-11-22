export interface ListaUsuario {
  msg: string;
  total: number;
  usuarios: Contact[];
}

export interface Contact {
  role: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  correo: string;
  uid?: string;
}