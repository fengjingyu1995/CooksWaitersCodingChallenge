import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StaffList from './';

describe('<StaffList />', () => {
  it('should render "No staff found" when currentDayStaffsData is an empty array', () => {
    render(<StaffList currentDayStaffsData={[]} />);
    const noStaffFoundElement = screen.getByText('No staff found');
    expect(noStaffFoundElement).toBeInTheDocument();
  });

  it('should render staff names when currentDayStaffsData has items', () => {
    const currentDayStaffsData = ['Staff A', 'Staff B', 'Staff C'];
    render(<StaffList currentDayStaffsData={currentDayStaffsData} />);

    // Check if staff names are rendered correctly
    currentDayStaffsData.forEach((name) => {
      const staffElement = screen.getByText(name);
      expect(staffElement).toBeInTheDocument();
    });
  });
});
