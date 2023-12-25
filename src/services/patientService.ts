import patients from '../../data/patients';
import { v1 as uuidv1 }  from 'uuid';

import { NonSSNPatient, Patient } from '../types';

const getNonSSNPatients = (): NonSSNPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => (
        {
            id, name, dateOfBirth, gender, occupation
        }));
};

const addPatient = (name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string): Patient => {
    const newPatientEntry = {
        id: uuidv1(),
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
}

export default {
    getNonSSNPatients,
    addPatient
};