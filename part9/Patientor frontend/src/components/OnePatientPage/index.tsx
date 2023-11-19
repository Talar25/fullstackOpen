import { Container, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import { Diagnosis, Entry, Patient } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CottageIcon from '@mui/icons-material/Cottage';
import { Icon } from '@mui/material';

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

  const findDiagnose = (codeArg: string) => {
    const code = diagnoses?.find((diagnose) => diagnose.code === codeArg);
    if (code === null) return;
    return <span>{code?.name}</span>;
  };

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
                <li key={code}>
                  <p>
                    {code} {findDiagnose(code)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default OnePatientPage;

const EntryDetails = (entry: Entry, diagnoses: Diagnosis[]) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;

    case 'HealthCheck':
      return <h1>hospital</h1>;

    case 'OccupationalHealthcare':
      return <h1>hospital</h1>;

    default:
      return;
  }
};

// const HospitalEntry = (entry: Entry, diagnoses: Diagnosis[]) => {
//   const findDiagnose = (codeArg: string) => {
//     const code = diagnoses?.find((diagnose) => diagnose.code === codeArg);
//     if (code === null) return;
//     return <span>{code?.name}</span>;
//   };
//   return (
//     <div style={{ border: '1px solid black', borderRadius: '10px' }}>
//       <p>
//         {entry.date} {entry.description} <Icon>LocalHospitalIcon</Icon>
//       </p>
//       <ul>
//         {entry.diagnosisCodes?.map((code) => (
//           <li key={code}>
//             <p>
//               {code} {findDiagnose(code)}
//             </p>
//           </li>
//         ))}
//       </ul>
//       <p>diagnose by {entry.specialist}</p>
//     </div>
//   );
// };

// const OccupationEntry = (entry: Entry, diagnoses: Diagnosis[]) => {
//   const findDiagnose = (codeArg: string) => {
//     const code = diagnoses?.find((diagnose) => diagnose.code === codeArg);
//     if (code === null) return;
//     return <span>{code?.name}</span>;
//   };
//   return (
//     <div style={{ border: '1px solid black', borderRadius: '10px' }}>
//       <p>
//         {entry.date} {entry.description} <Icon>{CottageIcon}</Icon>
//       </p>
//       <ul>
//         {entry.diagnosisCodes?.map((code) => (
//           <li key={code}>
//             <p>
//               {code} {findDiagnose(code)}
//             </p>
//           </li>
//         ))}
//       </ul>
//       <p>diagnose by {entry.specialist}</p>
//     </div>
//   );
// };
