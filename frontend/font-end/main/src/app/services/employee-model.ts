/*export interface Employee {
    id: string;
    departement: string;
    localisation: string;
    matricule: string;
    nom: string;
    poste: string;
    prenom: string;

  }
*/
export class Employee {
/*  nom: string;
  prenom: string;
  matricule: string;
  localisation: string;
  departement: string;
  poste: string;*/
  username?: string;
  email?: string;
  password?: string;
  roles?: Role[];
  status: string;
  constructor() {
   /* this.id = '';
    this.departement = '';
    this.localisation = '';
    this.matricule = '';
    this.nom = '';
    this.poste = '';
    this.prenom = '';*/
    this.username = '';
    this.email = '';
    this.password = '';
    this.roles = [];
    this.status = '';
  }
}

export interface Role {
  id: number;
  name: ERole; // Utilise ERole ici pour correspondre à l'énumération
}
export enum ERole {
  ROLE_USER = 'ROLE_USER',
  ROLE_MODERATOR = 'ROLE_MODERATOR',
  ROLE_ADMIN = 'ROLE_ADMIN'
}
