import patients from '../../data/patients';

import { NonSSNPatient } from '../types';

const getNonSSNPatients = (): NonSSNPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => (
        {
            id, name, dateOfBirth, gender, occupation
        }));
};

export default {
    getNonSSNPatients
};