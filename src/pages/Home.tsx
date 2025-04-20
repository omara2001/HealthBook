
import React, { useEffect } from 'react';
import { useAppStore } from '../state/store';
import DoctorCard from '../components/DoctorCard';
import FilterBar from '../components/FilterBar';
import BookingModal from '../components/BookingModal';
import EmptyState from '../components/EmptyState';

const Home: React.FC = () => {
  const {
    filteredDoctors,
    filter,
    filterDoctors,
    openBookingModal,
    closeBookingModal,
    isBookingModalOpen,
    selectedDoctor,
    selectedDaySchedule,
    selectedTimeSlot,
    selectedDate,
    selectTimeSlot,
    confirmAppointment
  } = useAppStore();
  
  // Reset filters when component mounts
  useEffect(() => {
    filterDoctors({ specialty: 'All Specialties', availableToday: false });
  }, [filterDoctors]);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Find Doctor & Book Appointment</h1>
      
      <FilterBar filter={filter} onFilterChange={filterDoctors} />
      
      {filteredDoctors.length > 0 ? (
        <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={openBookingModal}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          type="doctors"
          message="Try adjusting your filters or search criteria"
        />
      )}
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        doctor={selectedDoctor}
        daySchedules={selectedDaySchedule}
        selectedTimeSlot={selectedTimeSlot}
        selectedDate={selectedDate}
        onSelectTimeSlot={selectTimeSlot}
        onConfirmBooking={confirmAppointment}
      />
    </div>
  );
};

export default Home;
