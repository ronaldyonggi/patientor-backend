import { NewPatientEntry } from "./types";
import { Gender } from "./types";

// ====================================== STRING TYPE GUARD =================================================
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

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

// ====================================== DATE TYPE GUARD =================================================
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
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

// ====================================== toNewPatientEntry =================================================
const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDOB(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };

        return newEntry;
    }

    throw new Error('Incorrect input data!');
};

export default toNewPatientEntry;