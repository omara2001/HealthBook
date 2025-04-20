
import React from 'react';
import { Doctor } from '../types/types';
import { Star, MapPin, Calendar, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
  return (
    <div className="doctor-card overflow-hidden group relative" data-testid="doctor-card">
      <div className="flex flex-col p-5 space-y-4">
        {/* Doctor Info Section with Integrated Availability */}
        <div className="flex items-start space-x-4 relative">
          <img
            src={doctor.photoUrl}
            alt={`Dr. ${doctor.name}`}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">{doctor.name}</h3>
              {doctor.availableToday && (
                <Badge 
                  variant="default" 
                  className="bg-green-100 text-green-800 border border-green-200 
                             flex items-center gap-1 
                             transform transition-all duration-300 
                             hover:scale-105"
                >
                  <Sun className="h-3 w-3 mr-1 text-green-600" />
                  <span className="font-semibold text-[0.65rem]">Available</span>
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            <div className="mt-1 flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">{doctor.rating}</span>
              <span className="text-xs text-muted-foreground">({doctor.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{doctor.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Next Available: <span className="font-medium">{doctor.nextAvailable}</span></span>
          </div>
        </div>
        
        <Button
          onClick={() => onBookAppointment(doctor)}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white"
          data-testid="book-button"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;
