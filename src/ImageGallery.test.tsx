// ImageGallery.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ImageGallery from './components/ImageGallery';
import { fetchCharacters, Character } from './components/apiService';

jest.mock('./components/apiService'); // Mock the API service

const mockCharactersPage1: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    created: '2017-11-04T18:48:46.250Z',
    image: 'https://example.com/rick.jpg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    created: '2017-11-04T18:50:21.651Z',
    image: 'https://example.com/morty.jpg',
  },
];

const mockCharactersPage2: Character[] = [
  {
    id: 3,
    name: 'Summer Smith',
    species: 'Human',
    gender: 'Female',
    status: 'Alive',
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    created: '2017-11-04T18:51:16.151Z',
    image: 'https://example.com/summer.jpg',
  },
  {
    id: 4,
    name: 'Beth Smith',
    species: 'Human',
    gender: 'Female',
    status: 'Alive',
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    created: '2017-11-04T18:53:21.951Z',
    image: 'https://example.com/beth.jpg',
  },
];

describe('ImageGallery', () => {
  beforeEach(() => {
    // Reset the mocked fetchCharacters implementation before each test
    (fetchCharacters as jest.Mock)
      .mockResolvedValueOnce(mockCharactersPage1)
      .mockResolvedValueOnce(mockCharactersPage2);
  });

  it('renders loader initially and then renders characters', async () => {
    render(<ImageGallery />);

    // Expect loader to be present initially
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    // Wait for loading to finish and characters to render
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    // Loader should disappear after characters are loaded
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('handles search and filters characters', async () => {
    render(<ImageGallery />);

    // Wait for loading to finish and characters to render
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    // Perform search
    const searchInput = screen.getByPlaceholderText('Search by name');
    fireEvent.change(searchInput, { target: { value: 'Morty' } });

    // Wait for filtered character to appear
    await waitFor(() => {
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
      // expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
    });
  });

  it('handles pagination and page change', async () => {
    render(<ImageGallery />);

    // Wait for loading to finish and characters to render
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    // Navigate to next page
    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);

    // Wait for next page to load
    await waitFor(() => {
      expect(screen.getByText('Fart')).toBeInTheDocument();
      expect(screen.getByText('Cousin Nicky')).toBeInTheDocument();
    });

    // Ensure previous characters are not present
    await waitFor(() => {
      expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
      expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument();
    });

    // Simulate back to the first page
    const prevPageButton = screen.getByText('Previous');
    fireEvent.click(prevPageButton);

    // Wait for first page to load again
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  it('resets filters and search on reset', async () => {
    render(<ImageGallery />);

    // Wait for loading to finish and characters to render
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    // Perform search
    const searchInput = screen.getByPlaceholderText('Search by name');
    fireEvent.change(searchInput, { target: { value: 'Eyehole' } });

    // Wait for filtered character to appear
    await waitFor(() => {
      expect(screen.getByText('Eyehole Man')).toBeInTheDocument();
      
    });
    await waitFor(() =>{
      expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();});
    // Perform reset
    const resetButton = screen.getByText('Reset Filter');
    fireEvent.click(resetButton);

    // Expect characters to reset to initial state
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
    
  });
});
