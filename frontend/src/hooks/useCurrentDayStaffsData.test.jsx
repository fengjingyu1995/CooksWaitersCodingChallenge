import { renderHook, act } from '@testing-library/react';
import useCurrentDayStaffsData from './useCurrentDayStaffsData';
import { AppContextProvider } from '../contexts/AppContext';
import { describe, it, expect } from 'vitest';

describe('useCurrentDayStaffsData', () => {
  // Mock the context provider for the tests
  const wrapper = ({ children }) => (
    <AppContextProvider>{children}</AppContextProvider>
  );

  // Mock your StaffsData here
  const mockStaffsData = {
    monday: ['John', 'William'],
    tuesday: ['George', 'Frank'],
    wednesday: ['Thomas', 'Henry'],
    thursday: ['Albert', 'Samuel'],
    friday: ['Clarence', 'Richard'],
  };

  it('should return the correct initial state', () => {
    const { result } = renderHook(
      () => useCurrentDayStaffsData(mockStaffsData),
      {
        wrapper,
      }
    );

    expect(result.current.currentDayStaffsData).toEqual(mockStaffsData.monday);
    expect(result.current.currentDay).toEqual('monday');
    expect(result.current.isPrevDisabled).toBe(true);
    expect(result.current.isNextDisabled).toBe(false);
  });

  it('should switch to the next day correctly', () => {
    const { result } = renderHook(
      () => useCurrentDayStaffsData(mockStaffsData),
      {
        wrapper,
      }
    );

    act(() => {
      result.current.handleNextDay();
    });

    expect(result.current.currentDayStaffsData).toEqual(mockStaffsData.tuesday);
    expect(result.current.currentDay).toEqual('tuesday');
    expect(result.current.isPrevDisabled).toBe(false);
    expect(result.current.isNextDisabled).toBe(false);
  });

  it('should switch to the previous day correctly', () => {
    const { result } = renderHook(
      () => useCurrentDayStaffsData(mockStaffsData),
      {
        wrapper,
      }
    );

    // Switch to Tuesday first
    act(() => {
      result.current.handleNextDay();
    });

    // Switch back to Monday
    act(() => {
      result.current.handlePrevDay();
    });

    expect(result.current.currentDayStaffsData).toEqual(mockStaffsData.monday);
    expect(result.current.currentDay).toEqual('monday');
    expect(result.current.isPrevDisabled).toBe(true);
    expect(result.current.isNextDisabled).toBe(false);
  });

  it('should disable "Next Day" button on Friday', () => {
    const { result } = renderHook(
      () => useCurrentDayStaffsData(mockStaffsData),
      {
        wrapper,
      }
    );

    // Switch to Friday
    [...Array(4)].forEach(() => {
      act(() => {
        result.current.handleNextDay();
      });
    });

    expect(result.current.currentDayStaffsData).toEqual(mockStaffsData.friday);
    expect(result.current.currentDay).toEqual('friday');
    expect(result.current.isPrevDisabled).toBe(false);
    expect(result.current.isNextDisabled).toBe(true);
  });

  it('should not go previous day if isPrevDisabled is true', () => {
    const { result } = renderHook(
      () => useCurrentDayStaffsData(mockStaffsData),
      {
        wrapper,
      }
    );

    act(() => {
      result.current.handlePrevDay();
    });

    expect(result.current.currentDayStaffsData).toEqual(mockStaffsData.monday);
    expect(result.current.currentDay).toEqual('monday');
    expect(result.current.isPrevDisabled).toBe(true);
    expect(result.current.isNextDisabled).toBe(false);
  });

  it('should not go previous day if isPrevDisabled is true', () => {
    const { result } = renderHook(
      () => useCurrentDayStaffsData(mockStaffsData),
      {
        wrapper,
      }
    );

    // Switch to Friday first
    [...Array(4)].forEach(() => {
      act(() => {
        result.current.handleNextDay();
      });
    });

    act(() => {
      result.current.handleNextDay();
    });

    expect(result.current.currentDayStaffsData).toEqual(mockStaffsData.friday);
    expect(result.current.currentDay).toEqual('friday');
    expect(result.current.isPrevDisabled).toBe(false);
    expect(result.current.isNextDisabled).toBe(true);
  });
});
