import { useState } from 'react';
import { searchforShows } from '../api/tvmaze';
import { searchforPeople } from '../api/tvmaze';
import SearchForm from '../Components/SerachForm';
const Home = () => {
 
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  
  
  
 

  const onSearch = async ({q,searchOption}) => {
    try {
      if(searchOption==="shows"){
      setApiDataError(null);
      const result = await searchforShows(q);
      setApiData(result);
      }
      else{
        const result = await searchforPeople(q);
        setApiData(result);
      }
    } catch (error) {
      setApiDataError(error);
    }
  };
  //    https://api.tvmaze.com/search/shows?q=girls

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occured: {apiDataError.message}</div>;
    }
    if (apiData) {
      return apiData[0].show ? apiData.map(data => (
        <div key={data.show.id}>{data.show.name}</div>
      )) : apiData.map(data => (
        <div key={data.person.id}>{data.person.name}</div>
      )) ;
    }
    return null;
  };

  return (
    <div>
    <SearchForm onSearch={onSearch}/>
      {/* Home
       */}
      <div>{renderApiData()}</div> 
    </div>
  );
};

export default Home;
