import { renderHook, waitFor } from '@testing-library/react';
import useFetchData from './useFetchData';
import { describe, it, expect, vi } from 'vitest';

describe('useFetchData', () => {
  it('should fetch data from the API endpoint', async () => {
    const mockedResponseData = {
      monday: ['John', 'William', 'James', 'Charles'],
    };
    // Mock fetch API response

    // eslint-disable-next-line no-undef
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockedResponseData),
    });

    const endpoint = 'waiters';
    const { result } = renderHook(() => useFetchData(endpoint));

    // At first, data should be null
    expect(result.current.data).toBe(null);

    // Wait for the data to be fetched
    await waitFor(() =>
      expect(result.current.data).toEqual(mockedResponseData)
    );
  });
});
