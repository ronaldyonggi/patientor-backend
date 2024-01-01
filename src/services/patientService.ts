import patients from '../../data/patients';
import { v1 as uuidv1 }  from 'uuid';

import { NewPatientEntry, NonSSNPatient, Patient } from '../types';

const getNonSSNPatients = (): NonSSNPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation }) => (
        {
            id, name, dateOfBirth, gender, occupation, entries: []
        }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuidv1(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getNonSSNPatients,
    addPatient
};