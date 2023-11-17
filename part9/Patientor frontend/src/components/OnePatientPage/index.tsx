import { Container, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { Patient } from '../../types';
import { Link } from 'react-router-dom';

const OnePatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id.toString());
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  return (
    <Container>
      {patient && (
        <>
          <h4>
            {patient.name} <span>{patient.gender}</span>
          </h4>

          <p>ssh: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </>
      )}
    </Container>
  );
};

export default OnePatientPage;
