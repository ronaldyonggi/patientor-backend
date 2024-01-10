import { Diagnosis, HealthCheckRating, NewEntry } from "../types";
import { isDate, isString } from "./utils";

// ====================================== DIAGNOSIS PARSER =================================================
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnosis['code']> ;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

// ====================================== STRING PARSER =================================================
const parseString = (str: unknown): string => {
    if (!isString(str)) {
        throw new Error('Invalid input: ' + str);
    }
    return str;
};

// ====================================== DATE PARSER =================================================
const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date type: ' + date);
    }
    return date;
};

// ====================================== DISCHARGE PARSER =================================================
const parseDischarge = (object: unknown): {date: string, criteria: string} => {
    // Make sure the object argument is of type object
    if ( !object || typeof object !== 'object') {
        throw new Error('Incorrect or missing discharge data');
    }

    // Make sure the object has date and criteria property
    if ('date' in object && 'criteria' in object) {
        if (!isString(object.date) || !isDate(object.date)) {
            throw new Error('Incorrect discharge date data');
        }
        if (!isString(object.criteria)) {
            throw new Error('Incorrect discharge criteria data');
        }

        const processedDischarge = {
            date: object.date,
            criteria: object.criteria
        };

        return processedDischarge;
    }
    throw new Error('Incorrect discharge data format');
};

// ====================================== SICKLEAVE PARSER =================================================
const parseSickLeave = (object: unknown): { startDate: string, endDate: string} => {
    // Make sure the object argument is of type object
    if ( !object || typeof object !== 'object') {
        throw new Error('Incorrect or missing sickLeave data');
    }

    // Make sure the object argument has startDate and endDate property
    if ('startDate' in object && 'endDate' in object) {
        if (!isString(object.startDate) || !isDate(object.startDate)) {
            throw new Error('Incorrect startDate data');
        }
        if (!isString(object.endDate) || !isDate(object.endDate)) {
            throw new Error('Incorrect endDate data');
        }

        const processedSickLeave = {
            startDate: object.startDate,
            endDate: object.endDate
        };

        return processedSickLeave;
    }

    throw new Error('Incorrect sickLeave data format');
};


// ====================================== healthCheckRating PARSER =================================================
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (healthCheckRating !== 0 && healthCheckRating!== 1 && healthCheckRating !== 2 && healthCheckRating !== 3) {
        throw new Error('Invalid healthCheckRating input: ' + healthCheckRating);
    }
    return healthCheckRating;
};

// ====================================== toNewEntry =================================================
const toNewEntry =(object: unknown): NewEntry => {
    if ( !object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object && 'diagnosisCodes' in object) {
        switch (object.type) {
            case 'HealthCheck': {
                if ('healthCheckRating' in object) {
                    const newEntry = {
                        description: parseString(object.description),
                        date: parseDate(object.date),
                        specialist: parseString(object.specialist),
                        diagnosisCodes: parseDiagnosisCodes(object),
                        type: object.type,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    };
                    return newEntry;
                }
                break;
            }
            case 'Hospital': {
                if ('discharge' in object) {
                    const newEntry = {
                        description: parseString(object.description),
                        date: parseDate(object.date),
                        specialist: parseString(object.specialist),
                        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                        type: object.type,
                        discharge: parseDischarge(object.discharge)
                    };
                    return newEntry;
                }
                break;
            }
            case 'OccupationalHealthcare': {
                if ('employerName' in object) {
                    // Case sickLeave field exists
                    if ('sickLeave' in object) {
                        const newEntry = {
                            description: parseString(object.description),
                            date: parseDate(object.date),
                            specialist: parseString(object.specialist),
                            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                            type: object.type,
                            employerName: parseString(object.employerName),
                            sickLeave: parseSickLeave(object.sickLeave)
                        };
                        return newEntry;
                    } // Case sickLeave field does not exist
                    else {
                        const newEntry = {
                            description: parseString(object.description),
                            date: parseDate(object.date),
                            specialist: parseString(object.specialist),
                            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                            type: object.type,
                            employerName: parseString(object.employerName),
                        };
                        return newEntry;
                    }
                }
                break;
            }
            default:
                throw new Error('Invalid entry type');

        }

    }

    throw new Error('Invalid input data!');

};

export default toNewEntry;