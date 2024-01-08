import patients from '../../data/patients';
import { v1 as uuidv1 }  from 'uuid';

import { NewPatient, NonSSNPatient, Patient } from '../types';

const getNonSSNPatients = (): NonSSNPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries }) => (
        {
            id, name, dateOfBirth, gender, occupation, entries
        }));
};

const getPatient = (id: string): NonSSNPatient | undefined => {
    const patientsNoSSN = getNonSSNPatients();
    return patientsNoSSN.find(p => p.id === id);
};

const addPatient = (object: NewPatient): Patient => {
    const newPatientObject = {
        id: uuidv1(),
        ...object
    };

    patients.push(newPatientObject);
    return newPatientObject;
};

export default {
    getNonSSNPatients,
    getPatient,
    addPatient
};