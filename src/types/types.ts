
export interface Doctor {
  id: string;
  name: string;
  photoUrl: string;
  specialty: string;
  location: string;
  rating: number;
  reviewCount: number;
  availableToday: boolean;
  nextAvailable: string;
  education: string;
  languages: string[];
  bio: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface DaySchedule {
  date: string;
  dayName: string;
  timeSlots: TimeSlot[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
}

export interface Filter {
  specialty: string;
  availableToday: boolean;
}
