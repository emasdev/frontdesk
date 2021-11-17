import { useState } from 'react';
import { Flex, Text, Button, Heading, Center } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import AgendarPaciente from './Forms/AgendarPaciente';
import AgendarDoctor from './Forms/AgendarDoctor';
import AgendaContext from '../context/AgendaContext';
import AgendarEstudios from './Forms/AgendarEstudios';
import AgendarHorario from './Forms/AgendarHorario';

const steps = [
  { label: 'Paciente', content: <AgendarPaciente /> },
  { label: 'Doctor' },
  { label: 'Estudios' },
  { label: 'Horario' },
];

export const Vertical = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [paciente, setPaciente] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [estudios, setEstudios] = useState(null);
  const [horario, setHorario] = useState(null);

  const value = {
    nextStep,
    prevStep,
    reset,
    activeStep,
    steps,
    paciente,
    setPaciente,
    doctor,
    setDoctor,
    estudios,
    setEstudios,
    horario,
    setHorario,
  };

  return (
    <AgendaContext.Provider value={value}>
      <Steps orientation="vertical" activeStep={activeStep}>
        <Step
          width="100%"
          label={
            paciente
              ? `Paciente: ${paciente.nombre} ${paciente.apellidos}`
              : 'Paciente'
          }
        >
          <AgendarPaciente />
        </Step>
        <Step
          width="100%"
          label={
            doctor
              ? `Doctor: ${doctor.nombre} ${doctor.apellido_paterno} ${doctor.apellido_materno}`
              : 'Doctor'
          }
        >
          <AgendarDoctor />
        </Step>
        <Step width="100%" label={'Estudios'}>
          <AgendarEstudios />
        </Step>
        <Step width="100%" label={'Horario'}>
          <AgendarHorario />
        </Step>
      </Steps>
      {activeStep === 4 && (
        <>
          <Button onClick={prevStep}>Regresar</Button>
          <Button>Agendar cita</Button>
        </>
      )}
    </AgendaContext.Provider>
  );
};

export default Vertical;
