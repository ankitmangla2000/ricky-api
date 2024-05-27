import React, { useState } from 'react';
import './Navbar.css';

interface NavbarProps {
  onSearch: (search: string) => void;
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onFilterChange, onReset }) => {
  const [search, setSearch] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecies(e.target.value);
    onFilterChange({ species: e.target.value, gender, state, sortAscending });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    onFilterChange({ species, gender: e.target.value, state, sortAscending });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
    onFilterChange({ species, gender, state: e.target.value, sortAscending });
  };

  const handleSortToggle = () => {
    setSortAscending(!sortAscending);
    onFilterChange({ species, gender, state, sortAscending: !sortAscending });
  };

  const handleReset = () => {
    setSearch('');
    setSpecies('');
    setGender('');
    setState('');
    setSortAscending(true);
    onReset();
  };

  return (
    <div className="navbar">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={handleSearchChange}
        className="navbar-text"
      />
      <select value={species} onChange={handleSpeciesChange} className="navbar-text">
        {species ? null: <option value="" disabled>Species</option>}
        <option value="None">None</option>
        <option value="Human">Human</option>
        <option value="Alien">Alien</option>
        <option value="Humanoid">Humanoid</option>
        <option value="Mytholog">Mytholog</option>
        <option value="Unknown">Unknown</option>
      </select>
      <select value={gender} onChange={handleGenderChange} className="navbar-text">
        {gender ? null: <option value="" disabled>Gender</option>}
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">GenderLess</option>
        <option value="unknown">Unknown</option>
      </select>
      <select value={state} onChange={handleStateChange} className="navbar-text">
      {state ? null: <option value="" disabled>State</option>}
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="Unknown">Unknown</option>
      </select>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={sortAscending} onChange={handleSortToggle} />
          <span className="slider round"></span>
        </label>
        <span className="ascending-text">Ascending</span>
      </div>
      <button className="reset-button" onClick={handleReset}>Reset Filter</button>
    </div>
  );
};

export default Navbar;
