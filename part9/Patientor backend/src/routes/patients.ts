import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  res.send(patientService.getOnePatient(id));
});

router.post('/', (req, res) => {
  try {
    const newPerson = toNewPatient(req.body);
    const addedPerson = patientService.addPatient(newPerson);
    res.json(addedPerson);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
