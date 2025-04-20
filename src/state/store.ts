import { create } from 'zustand';
import { doctors, generateTimeSlots } from '../data/mockData';
import { Appointment, Doctor, DaySchedule, Filter } from '../types/types';

interface AppState {
  // Doctors
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  selectedDoctor: Doctor | null;
  
  // Filters
  filter: Filter;
  
  // Appointments
  appointments: Appointment[];
  
  // Booking modal
  isBookingModalOpen: boolean;
  selectedDaySchedule: DaySchedule[];
  selectedTimeSlot: string | null;
  selectedDate: string | null;
  
  // Actions
  setSelectedDoctor: (doctor: Doctor | null) => void;
  filterDoctors: (filter: Partial<Filter>) => void;
  openBookingModal: (doctor: Doctor) => void;
  closeBookingModal: () => void;
  selectTimeSlot: (date: string, timeSlotId: string) => void;
  confirmAppointment: () => void;
  cancelAppointment: (appointmentId: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  doctors: doctors,
  filteredDoctors: doctors,
  selectedDoctor: null,
  
  filter: {
    specialty: 'All Specialties',
    availableToday: false
  },
  
  appointments: [],
  
  isBookingModalOpen: false,
  selectedDaySchedule: [],
  selectedTimeSlot: null,
  selectedDate: null,
  
  // Actions
  setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),
  
  filterDoctors: (filter) => {
    set((state) => {
      const newFilter = { ...state.filter, ...filter };
      
      let filtered = doctors;
      
      // Filter by specialty
      if (newFilter.specialty !== 'All Specialties') {
        filtered = filtered.filter(doctor => doctor.specialty === newFilter.specialty);
      }
      
      // Filter by availability
      if (newFilter.availableToday) {
        filtered = filtered.filter(doctor => doctor.availableToday);
      }
      
      return {
        filter: newFilter,
        filteredDoctors: filtered
      };
    });
  },
  
  openBookingModal: (doctor) => {
    const schedules = generateTimeSlots(doctor.id);
    set({
      selectedDoctor: doctor,
      isBookingModalOpen: true,
      selectedDaySchedule: schedules,
      selectedTimeSlot: null,
      selectedDate: null
    });
  },
  
  closeBookingModal: () => set({
    isBookingModalOpen: false,
    selectedDoctor: null,
    selectedTimeSlot: null,
    selectedDate: null
  }),
  
  selectTimeSlot: (date, timeSlotId) => {
    set({
      selectedTimeSlot: timeSlotId,
      selectedDate: date
    });
  },
  
  confirmAppointment: () => {
    const { selectedDoctor, selectedTimeSlot, selectedDate, selectedDaySchedule, appointments } = get();
    
    if (selectedDoctor && selectedTimeSlot && selectedDate) {
      // Find the selected time slot
      const flatTimeSlots = selectedDaySchedule.flatMap(day => day.timeSlots);
      const timeSlot = flatTimeSlots.find(slot => slot.id === selectedTimeSlot);
      
      if (timeSlot) {
        // Create a new appointment
        const newAppointment: Appointment = {
          id: `appt-${Date.now()}`,
          doctorId: selectedDoctor.id,
          date: selectedDate,
          time: timeSlot.time,
          status: 'confirmed'
        };
        
        // Add the appointment to the list
        set({
          appointments: [...appointments, newAppointment],
          isBookingModalOpen: false,
          selectedDoctor: null,
          selectedTimeSlot: null,
          selectedDate: null
        });
      }
    }
  },
  
  cancelAppointment: (appointmentId) => {
    set((state) => ({
      appointments: state.appointments.filter(appt => appt.id !== appointmentId)
    }));
  }
}));
