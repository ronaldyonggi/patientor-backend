import diagnoses from '../../data/diagnoses';

import { Diagnosis } from '../../type';

const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getDiagnoses,
};
