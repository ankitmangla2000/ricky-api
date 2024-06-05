import React, { useState } from 'react';
import './Navbar.css';
import { FaSearch, FaTimes } from 'react-icons/fa';


interface NavbarProps {
  search:string;
  onSearch: (search: string) => void;
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onFilterChange, onReset }) => {
  const [search, setSearch] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
 
  };
  const handleSearchSubmit = () => {
    onSearch(search);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleClearSearch = () => {
    setSearch('');
    onSearch('');
  };
  

  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecies(e.target.value);
    onFilterChange({ species: e.target.value, gender, status, sortAscending });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    onFilterChange({ species, gender: e.target.value, status, sortAscending });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onFilterChange({ species, gender, status: e.target.value, sortAscending });
  };

  const handleSortToggle = () => {
    setSortAscending(!sortAscending);
    onFilterChange({ species, gender, status, sortAscending: !sortAscending });
  };

  const handleReset = () => {
    setSearch('');
    setSpecies('');
    setGender('');
    setStatus('');
    setSortAscending(true);
    onReset();
  };

  return (
    <div className="navbar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="search-bar"
        />
        {search && (
          <FaTimes className="clear-search-icon" onClick={handleClearSearch} />
        ) }
          <span className="search-divider">|</span>
       
        <FaSearch className="search-icon" onClick={handleSearchSubmit} />
      </div>
     <div className="filters-nav">
      <div className="filters-species">
      <select value={species} onChange={handleSpeciesChange} className="navbar-text" style={{width:"110px", marginLeft:"5px",outline:"none"}}>
        {species ? null: <option value="" disabled>Species</option>}
        <option value="">None</option>
        <option value="Human">Human</option>
        <option value="Alien">Alien</option>
        <option value="Humanoid">Humanoid</option>
        <option value="Mytholog">Mytholog</option>
        <option value="Unknown">Unknown</option>
      </select>
      </div>
      <div className="filters-gender">
      <select value={gender} onChange={handleGenderChange} className="navbar-text" style={{ width:"110px",outline:"none"}}>
        {gender ? null: <option value="" disabled>Gender</option>}
        <option value="">None</option>
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">GenderLess</option>
        <option value="unknown">Unknown</option>
      </select>
      </div>
      <div className="filters-status"></div>
      <select value={status} onChange={handleStateChange} className="navbar-text"style={{width:"110px",outline:"none"}}>
      {status ? null: <option value="" disabled>Status</option>}
        <option value="">None</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="Unknown">Unknown</option>
      </select>
      </div>
      <div className="switch-nav">
      <div className="toggle-container">
        <label className="switch" style={{overflow:"hidden"}}>
          <input type="checkbox" checked={sortAscending} onChange={handleSortToggle} />
          <span className="slider round"></span>
        </label>
        <span className="ascending-text">{sortAscending ? 'Ascending' : 'Descending'}</span>
      </div>
      <button className="reset-button" onClick={handleReset}>Reset Filter</button>
    </div>
    </div>
  );
};

export default Navbar;
