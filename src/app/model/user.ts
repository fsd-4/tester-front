import { Role } from "./role";

export interface User {
  id:number;
  ism:string;
  familiya:string;
  login:string;
  parol:string;
  regVaqt:Date;
  oxirgiTashrif:Date;
  role:Role;
  rasm: any;

}
