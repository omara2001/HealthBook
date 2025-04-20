# HealthBook - Appointment Booking Platform

A modern, fully responsive, animated, and accessible appointment booking UI for a healthcare platform.

## Features

- Browse doctors with filtering capabilities by specialty and availability
- Book appointments with a doctor through an intuitive modal interface
- View and manage confirmed appointments
- Responsive design that works on all device sizes
- Smooth animations and transitions
- Accessible UI components following WCAG 2.1 guidelines
- **Dark/Light Theme Toggle** - Switch between light, dark, and system preference themes

## Technology Stack

- React
- TypeScript
- Vite
- TailwindCSS
- ShadcnUI Components
- React Router
- Zustand for State Management
- Lucide Icons

## Project Structure

```
/src
  /components          # Reusable UI components
    /ui                # Core UI components (shadcn)
    DoctorCard.tsx     # Card displaying doctor information
    FilterBar.tsx      # Filtering options for doctors
    BookingModal.tsx   # Modal for booking appointments
    AppointmentList.tsx # List of confirmed appointments
    Layout.tsx         # Main layout of the application
    EmptyState.tsx     # Component shown when no items are found
    theme-provider.tsx # Theme context provider for dark/light mode
  /data
    mockData.ts        # Mock data for the application
  /pages
    Home.tsx           # Doctor directory page
    Appointments.tsx   # Appointments summary page
    NotFound.tsx       # 404 page
  /state
    store.ts           # Zustand store for state management
  /types
    types.ts           # TypeScript interfaces
```

## Theme Support

HealthBook includes a built-in theme system with support for:

- **Light mode**: Default bright theme optimized for daylight viewing
- **Dark mode**: Eye-friendly dark theme for night-time use
- **System preference**: Automatically matches your device's theme setting

You can toggle between themes using the theme button in the top-right corner of the app. Your preference is saved locally and will persist between visits.

## Setup and Running Locally

1. Clone the repository
```sh
git clone https://github.com/omara2001/HealthBook.git
```

2. Navigate to the project directory
```sh
cd HealthBook
```

3. Install dependencies
```sh
npm install
```

4. Start the development server
```sh
npm run dev
```

5. Open your browser to the local URL shown in the terminal (typically http://localhost:5173)

## Deployment Instructions

### Steps of Deploying to GitHub Pages

1. Install the gh-pages package:
```sh
npm install gh-pages --save-dev
```

2. Add the following scripts to your package.json file:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Add a homepage field to your package.json:
```json
"homepage": "https://omara2001.github.io/HealthBook"
```

4. Deploy the application:
```sh
npm run deploy
```


## Accessibility Considerations

- Keyboard navigation is fully supported for all interactive elements
- ARIA attributes are implemented for better screen reader support
- Focus management for modals and interactive elements
- Sufficient color contrast for readability in both light and dark themes
- Responsive design with appropriate touch targets for mobile
- Error messages are clearly communicated and associated with form controls

## AI-Assisted Development

This project was developed with AI assistance using modern Ai tool like Loveble and Cursor AI models, which helped with:

- Project structure and architecture
- Component design and implementation
- Styling with Tailwind CSS
- Accessibility enhancements
- Animation implementations

## Project Requirements Implementation

This project meets all the requirements specified :

1. **Doctor Directory View**
   - Mock list of doctors with photos, names, specialties, availability, and location
   - Filter by specialty and availability
   - "Book Appointment" button on each card

2. **Booking Modal**
   - Opens when a user clicks "Book Appointment"
   - Shows doctor name and available time slots
   - Allows user to select time slot and confirm

3. **Appointments Summary View**
   - View that shows booked appointments
   - Displays doctor name, date/time, specialty, and location

## Next Steps

To extend this project, consider the following enhancements:

- Integration with a backend API
- Authentication system for user accounts
- Advanced filtering and search capabilities
- Calendar view for appointments
- Email/SMS notifications for appointment reminders
- Online payment integration "eg:stripe"
- Video consultation features
