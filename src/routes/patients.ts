import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utilities/patients';
import toNewEntry from '../utilities/entry';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSSNPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch(error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id;
        const patient = patientService.getPatient(id);
        res.json(patient);
    } catch(error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }

});

router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id
        const newEntry = toNewEntry(req.body)
        const successfullyAddedEntry = patientService.addEntry(id, newEntry)
        res.json(successfullyAddedEntry);
    } catch(error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;

