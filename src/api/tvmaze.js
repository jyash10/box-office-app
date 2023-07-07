const BASE_URL = `https://api.tvmaze.com`;
const apiGet = async queryString => {
  const response = await fetch(`${BASE_URL}${queryString}`);
  const body = await response.json();
  return body;
};

export const searchforShows = query => apiGet(`/search/shows?q=${query}`);
export const searchforPeople = query => apiGet(`/search/people?q=${query}`);
