// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry{
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export type NonSSNPatient = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;