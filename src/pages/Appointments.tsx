
import React from 'react';
import AppointmentList from '../components/AppointmentList';

const Appointments: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>
      <AppointmentList />
    </div>
  );
};

export default Appointments;
