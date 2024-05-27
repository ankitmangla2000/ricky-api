import axios from 'axios';

export interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  status: string;
  image: string;
  origin: string;
  location: string;
  created: string;
}

const API_URL = 'https://rickandmortyapi.com/api/character/';

export const fetchCharacters = async (
  search: string = '',
  filters: any = {},
  page: number = 1,
  limit: number = 10
) => {
  const { species, gender, status } = filters;
  let query = `?page=${page}&limit=${limit}`;
  
  if (search) query += `&name=${search}`;
  if (species) query += `&species=${species}`;
  if (gender) query += `&gender=${gender}`;
  if (status) query += `&status=${status}`;

  const response = await axios.get(API_URL + query);
  return response.data.results;
};
