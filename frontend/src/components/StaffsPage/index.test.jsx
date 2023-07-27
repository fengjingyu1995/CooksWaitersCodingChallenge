import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StaffsPage from '.';
import useCurrentDayStaffsData from '../../hooks/useCurrentDayStaffsData';

const mockStaffsData = {
  monday: ['Staff A', 'Staff B'],
  tuesday: ['Staff C', 'Staff D'],
  wednesday: ['Staff E', 'Staff F'],
  thursday: ['Staff G', 'Staff H'],
  friday: ['Staff I', 'Staff J'],
};

const mockedReturnedUseCurrentDayStaffsData = {
  currentDayStaffsData: mockStaffsData.monday,
  currentDay: 'monday',
  handlePrevDay: vi.fn(),
  handleNextDay: vi.fn(),
  isPrevDisabled: true,
  isNextDisabled: false,
};

// Mock the custom hook to provide mock values for testing

vi.mock('../../hooks/useCurrentDayStaffsData', () => {
  return {
    default: vi.fn(),
  };
});

describe('<StaffsPage />', () => {
  beforeEach(() => {
    useCurrentDayStaffsData.mockReturnValue(
      mockedReturnedUseCurrentDayStaffsData
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should show Loading component when currentDayStaffsData is null', () => {
    useCurrentDayStaffsData.mockReturnValue({
      ...mockedReturnedUseCurrentDayStaffsData,
      currentDayStaffsData: null,
    });
    render(<StaffsPage staffsType='waiters' StaffsData={mockStaffsData} />);
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should render StaffsPage correctly once currentDayStaffsData is available', () => {
    render(<StaffsPage staffsType='waiters' StaffsData={mockStaffsData} />);

    expect(screen.getByText('Prev Day')).toBeInTheDocument();
    expect(screen.getByText('Next Day')).toBeInTheDocument();
    expect(screen.getByText('waiters')).toBeInTheDocument();
    expect(screen.getByText('monday')).toBeInTheDocument();
    expect(screen.getByText('Staff A')).toBeInTheDocument();
    expect(screen.getByText('Staff B')).toBeInTheDocument();
  });
  it('should display "cooks" when staffsType = "cooks"', () => {
    render(<StaffsPage staffsType='cooks' StaffsData={mockStaffsData} />);
    expect(screen.getByText('cooks')).toBeInTheDocument();
  });

  it('should not call handlePrevDay when button is disabled', () => {
    render(<StaffsPage staffsType='waiters' StaffsData={mockStaffsData} />);
    const prevDayButton = screen.getByText('Prev Day');
    expect(prevDayButton).toBeDisabled();

    fireEvent.click(screen.getByText('Prev Day'));
    expect(useCurrentDayStaffsData().handlePrevDay).not.toHaveBeenCalled();
  });

  it('should call handlePrevDay when clicking "Next Day" button', () => {
    render(<StaffsPage staffsType='waiters' StaffsData={mockStaffsData} />);
    fireEvent.click(screen.getByText('Next Day'));
    expect(
      mockedReturnedUseCurrentDayStaffsData.handleNextDay
    ).toHaveBeenCalled();
  });

  it('should call handlePrevDay when clicking "Prev Day" button', () => {
    useCurrentDayStaffsData.mockReturnValue({
      ...mockedReturnedUseCurrentDayStaffsData,
      isPrevDisabled: false,
    });
    render(<StaffsPage staffsType='waiters' StaffsData={mockStaffsData} />);
    fireEvent.click(screen.getByText('Prev Day'));
    expect(useCurrentDayStaffsData().handlePrevDay).toHaveBeenCalledOnce();
  });
});
