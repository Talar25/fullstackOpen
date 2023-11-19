import { Container, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import { Diagnosis, Patient } from '../../types';
import { Link } from 'react-router-dom';

const OnePatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id.toString());

      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();

      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const findDiagnose = (codeArg: string) =>
    diagnoses?.find((diagnose) => diagnose.code === codeArg);

  return (
    <Container>
      {patient && (
        <>
          <h3>
            {patient.name} <span>{patient.gender}</span>
          </h3>

          <p>ssh: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </>
      )}
      <div>
        <h4>entries</h4>
        {patient?.entries.map((entry) => (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default OnePatientPage;
