
import React, { useState } from 'react';
import { X, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Doctor, DaySchedule } from '../types/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from "@/components/ui/use-toast";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  daySchedules: DaySchedule[];
  selectedTimeSlot: string | null;
  selectedDate: string | null;
  onSelectTimeSlot: (date: string, timeSlotId: string) => void;
  onConfirmBooking: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  doctor,
  daySchedules,
  selectedTimeSlot,
  selectedDate,
  onSelectTimeSlot,
  onConfirmBooking,
}) => {
  const { toast } = useToast();
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  
  if (!doctor) return null;
  
  const handleConfirm = () => {
    if (!selectedTimeSlot || !selectedDate) {
      toast({
        title: "Please select a time slot",
        description: "You need to select a time slot to book an appointment",
        variant: "destructive",
      });
      return;
    }
    
    onConfirmBooking();
    toast({
      title: "Appointment Confirmed!",
      description: `Your appointment with ${doctor.name} has been scheduled successfully.`,
    });
  };
  
  const currentDay = daySchedules[currentDayIndex];
  
  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => Math.max(0, prev - 1));
  };
  
  const handleNextDay = () => {
    setCurrentDayIndex((prev) => Math.min(daySchedules.length - 1, prev + 1));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[525px]" aria-labelledby="booking-dialog-title">
        <DialogHeader>
          <DialogTitle id="booking-dialog-title" className="text-xl font-semibold">
            Book Appointment
          </DialogTitle>
          <DialogDescription>
            Select a date and time for your appointment with {doctor.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Doctor info */}
          <div className="flex items-center space-x-4">
            <img
              src={doctor.photoUrl}
              alt={doctor.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
              <p className="text-sm text-muted-foreground">{doctor.location}</p>
            </div>
          </div>
          
          {/* Date navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevDay}
              disabled={currentDayIndex === 0}
              aria-label="Previous day"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
                {currentDay.dayName}, {currentDay.date}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextDay}
              disabled={currentDayIndex === daySchedules.length - 1}
              aria-label="Next day"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Time slots */}
          <div aria-label="Available time slots">
            <h4 className="mb-3 flex items-center font-medium">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              Available Time Slots
            </h4>
            
            {currentDay.timeSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {currentDay.timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && onSelectTimeSlot(currentDay.date, slot.id)}
                    disabled={!slot.available}
                    className={`
                      booking-timeslot
                      ${!slot.available ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      ${selectedTimeSlot === slot.id ? 'selected' : ''}
                    `}
                    aria-selected={selectedTimeSlot === slot.id}
                    aria-disabled={!slot.available}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No available slots for this day</p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedTimeSlot}>
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
