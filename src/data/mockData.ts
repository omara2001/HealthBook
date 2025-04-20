
import { Doctor, DaySchedule, Appointment } from '../types/types';

// Mock doctors data
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    specialty: 'Cardiology',
    location: 'Medical Center, New York',
    rating: 4.8,
    reviewCount: 124,
    availableToday: true,
    nextAvailable: 'Today',
    education: 'Harvard Medical School',
    languages: ['English', 'Spanish'],
    bio: 'Dr. Johnson is a board-certified cardiologist with over 15 years of experience treating heart conditions.'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    photoUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    specialty: 'Dermatology',
    location: 'Skin Institute, Boston',
    rating: 4.9,
    reviewCount: 89,
    availableToday: true,
    nextAvailable: 'Today',
    education: 'Johns Hopkins University',
    languages: ['English', 'Mandarin'],
    bio: 'Dr. Chen specializes in treating skin conditions and performing cosmetic procedures.'
  },
  {
    id: '3',
    name: 'Dr. Emily Wilson',
    photoUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    specialty: 'Pediatrics',
    location: 'Children\'s Hospital, Chicago',
    rating: 4.7,
    reviewCount: 156,
    availableToday: false,
    nextAvailable: 'Tomorrow',
    education: 'Northwestern University',
    languages: ['English'],
    bio: 'Dr. Wilson is passionate about children\'s health and has been practicing for over 10 years.'
  },
  {
    id: '4',
    name: 'Dr. James Rodriguez',
    photoUrl: 'https://randomuser.me/api/portraits/men/36.jpg',
    specialty: 'Orthopedics',
    location: 'Sports Medicine Clinic, Los Angeles',
    rating: 4.6,
    reviewCount: 73,
    availableToday: false,
    nextAvailable: 'In 2 days',
    education: 'UCLA Medical School',
    languages: ['English', 'Spanish'],
    bio: 'Dr. Rodriguez specializes in sports injuries and joint replacements.'
  },
  {
    id: '5',
    name: 'Dr. Lisa Patel',
    photoUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
    specialty: 'Neurology',
    location: 'Neuroscience Center, San Francisco',
    rating: 4.9,
    reviewCount: 112,
    availableToday: true,
    nextAvailable: 'Today',
    education: 'Stanford University',
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: 'Dr. Patel is an expert in diagnosing and treating neurological disorders.'
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    photoUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    specialty: 'Psychiatry',
    location: 'Behavioral Health Center, Seattle',
    rating: 4.7,
    reviewCount: 68,
    availableToday: false,
    nextAvailable: 'In 3 days',
    education: 'University of Washington',
    languages: ['English', 'Korean'],
    bio: 'Dr. Kim provides compassionate care for patients with mental health conditions.'
  },
  {
    id: '7',
    name: 'Dr. Maria Gonzalez',
    photoUrl: 'https://randomuser.me/api/portraits/women/90.jpg',
    specialty: 'Endocrinology',
    location: 'Diabetes Care Center, Miami',
    rating: 4.8,
    reviewCount: 94,
    availableToday: true,
    nextAvailable: 'Today',
    education: 'University of Miami',
    languages: ['English', 'Spanish'],
    bio: 'Dr. Gonzalez specializes in diabetes management and thyroid disorders.'
  },
  {
    id: '8',
    name: 'Dr. David Thompson',
    photoUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
    specialty: 'Ophthalmology',
    location: 'Vision Center, Denver',
    rating: 4.5,
    reviewCount: 62,
    availableToday: true,
    nextAvailable: 'Today',
    education: 'University of Colorado',
    languages: ['English'],
    bio: 'Dr. Thompson performs eye exams, LASIK surgery, and treats eye diseases.'
  }
];

// Mock time slots
export const generateTimeSlots = (doctorId: string): DaySchedule[] => {
  const today = new Date();
  const days: DaySchedule[] = [];
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Generate 5 days of schedules starting from today
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const dayName = dayNames[date.getDay()];
    
    // Generate time slots for the day
    const timeSlots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour <= endHour; hour++) {
      // Morning slot
      timeSlots.push({
        id: `${doctorId}-${formattedDate}-${hour}:00`,
        time: `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`,
        available: Math.random() > 0.3 // 70% chance of being available
      });
      
      // Afternoon slot
      timeSlots.push({
        id: `${doctorId}-${formattedDate}-${hour}:30`,
        time: `${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour < 12 ? 'AM' : 'PM'}`,
        available: Math.random() > 0.3 // 70% chance of being available
      });
    }
    
    days.push({
      date: formattedDate,
      dayName,
      timeSlots
    });
  }
  
  return days;
};

// Mock appointments data
export const mockAppointments: Appointment[] = [
  {
    id: 'appt-1',
    doctorId: '1',
    date: '4/18/2025',
    time: '10:00 AM',
    status: 'confirmed'
  },
  {
    id: 'appt-2',
    doctorId: '5',
    date: '4/20/2025',
    time: '2:30 PM',
    status: 'confirmed',
    notes: 'Follow-up appointment'
  },
  {
    id: 'appt-3',
    doctorId: '2',
    date: '4/22/2025',
    time: '11:00 AM',
    status: 'confirmed'
  }
];

// List of specialties for filter
export const specialties = [
  'All Specialties',
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Neurology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry'
];
