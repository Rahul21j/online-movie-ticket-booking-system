import React from 'react';

export default function Calendar() {
  // Dummy data for days in a month
  const daysInMonth = Array.from({ length: 31 }, (_, index) => index + 1); // Replace with actual logic to get days in current month

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-4">
        <button className="text-lg font-bold">&lt;</button>
        <h2 className="text-lg font-bold">June 2024</h2> {/* Replace with current month and year */}
        <button className="text-lg font-bold">&gt;</button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Weekday names */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-semibold py-2">
            {day}
          </div>
        ))}

        {/* Days */}
        {daysInMonth.map(day => (
          <div key={day} className="text-center py-2">
            <button className="w-8 h-8 rounded-full flex items-center justify-center">
              {day}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
