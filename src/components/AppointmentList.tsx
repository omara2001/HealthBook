
import React from 'react';
import { Appointment } from '../types/types';
import { useAppStore } from '../state/store';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

const AppointmentList: React.FC = () => {
  const { appointments, doctors, cancelAppointment } = useAppStore();
  const { toast } = useToast();
  
  // Sort appointments by date
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
  
  const getDoctorById = (id: string) => {
    return doctors.find(doc => doc.id === id) || null;
  };
  
  const handleCancelAppointment = (appointmentId: string) => {
    cancelAppointment(appointmentId);
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
  };
  
  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3">
          <Calendar className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No Appointments</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You don't have any appointments scheduled yet.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Appointments</h2>
      <div className="grid gap-4 animate-fade-in" style={{ '--stagger-delay': '100ms' } as React.CSSProperties}>
        {sortedAppointments.map((appointment, index) => {
          const doctor = getDoctorById(appointment.doctorId);
          if (!doctor) return null;
          
          return (
            <div 
              key={appointment.id}
              className="appointment-item"
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: 0,
                animation: 'fade-in 0.5s ease-out forwards',
              }}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{doctor.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <X className="mr-1 h-4 w-4" />
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel your appointment with {doctor.name} on {appointment.date} at {appointment.time}?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No, Keep It</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleCancelAppointment(appointment.id)}>
                        Yes, Cancel Appointment
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentList;
