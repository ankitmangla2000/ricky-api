import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import ImageCard from './ImageCard';
import Loader from './Loader';
import Pagination from './Pagination';
import { fetchCharacters, Character } from './apiService';

const ImageGallery: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filters, setFilters] = useState<any>({
    species: '',
    gender: '',
    state: '',
    sortAscending: true,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const loadImages = async (search: string = '', newFilters: any = {}, page: number = 1) => {
    setLoading(true);
    try {
      const data = await fetchCharacters(search, { ...filters, ...newFilters }, page);
      setCharacters(data);
      setTotalPages(Math.ceil(data.length / 10)); // Adjust this if your API provides total pages
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleSearch = (search: string) => {
    setSearch(search);
    loadImages(search);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    loadImages(search, newFilters);
  };

  const handleReset = () => {
    setSearch('');
    setFilters({});
    loadImages();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadImages(search, filters, page);
  };

  const sortedCharacters = characters.sort((a, b) => {
    if (filters.sortAscending) {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="image-gallery">
      <Navbar 
       search={search}
       onSearch={handleSearch}
       onFilterChange={handleFilterChange} 
       onReset={handleReset}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="images">
          {characters.length === 0 ? (
            <div className="no-records">No records found</div>
          ) : (
            sortedCharacters.map((character) => (
              <ImageCard key={character.id} character={character} />
            ))
          )}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ImageGallery;
