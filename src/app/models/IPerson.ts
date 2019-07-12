import {Role} from "./Role";

export interface IPerson {
    _id?: string;
    firstName: string;
    lastName: string;
    role: Role;
    canSignup: boolean;
}
