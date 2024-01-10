import { NewPatient } from "../types";
import { Gender } from "../types";
import { isString, isDate } from './utils';


// ====================================== NAME PARSER =================================================
const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Invalid name input: ' + name);
    }
    return name;
};

// ====================================== OCCUPATION PARSER =================================================
const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Invalid occupation input: ' + occupation);
    }
    return occupation;
};

// ====================================== SSN PARSER =================================================
const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Invalid ssn input: ' + ssn);
    }
    return ssn;
};

// ====================================== DOB PARSER =================================================
const parseDOB= (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date type: ' + date);
    }
    return date;
};

// ====================================== GENDER TYPE GUARD AND PARSER =================================================
const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error ('Invalid gender input: ' + gender);
    }
    return gender;
};

// ====================================== toNewPatient =================================================
const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDOB(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        };

        return newPatient;
    }

    throw new Error('Incorrect input data!');
};



export default toNewPatient;