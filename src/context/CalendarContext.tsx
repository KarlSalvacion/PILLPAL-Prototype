import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CalendarContextType {
  date: Date;
  selectedDay: Date | null;
  handleNextDay: () => void;
  handlePrevDay: () => void;
  handleDayClick: (day: Date) => void;
  formatSelectedDate: (date: Date | null) => string;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());

  const handleNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  };

  const handlePrevDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
  };

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
  };

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <CalendarContext.Provider
      value={{
        date,
        selectedDay,
        handleNextDay,
        handlePrevDay,
        handleDayClick,
        formatSelectedDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}; 