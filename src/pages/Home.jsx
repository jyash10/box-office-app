import { useState} from 'react';
import { searchforShows } from '../api/tvmaze';
import { searchforPeople } from '../api/tvmaze';
import SearchForm from '../Components/SerachForm';
import ShowGrid from '../Components/shows/ShowGrid';
import ActorGrid from '../Components/actors/ActorGrid';
import { useQuery } from '@tanstack/react-query';


const Home = () => {
 
  // const [apiData, setApiData] = useState(null);
  // const [apiDataError, setApiDataError] = useState(null);
  
  const [filter, setFilter] =useState(null)


  


  const { data:apiData,error:apiDataError } = useQuery({
      queryKey: ['search', filter],
      queryFn: () => filter.searchOption === 'shows'?searchforShows(filter.q):searchforPeople(filter.q),
      // ⬇️ disabled as long as the filter is empty
      enabled: !!filter,
      refetchOnWindowFocus:false
  })
  
 

  const onSearch = async ({q,searchOption}) => {
    
    setFilter({q,searchOption})
    // try {
    //   if(searchOption==="shows"){
    //   setApiDataError(null);
    //   const result = await searchforShows(q);
    //   setApiData(result);
    //   }
    //   else{
    //     const result = await searchforPeople(q);
    //     setApiData(result);
    //   }
    // } catch (error) {
    //   setApiDataError(error);
    // }
  };
  //    https://api.tvmaze.com/search/shows?q=girls

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occured: {apiDataError.message}</div>;
    }

    if(apiData?.length === 0){
        return <div>No Results</div>
    }

    if (apiData) {
      return apiData[0].show ? <ShowGrid shows={apiData}/> : <ActorGrid actors={apiData}/>;
    }
    return null;
  };

  return (
    <div>
    <SearchForm onSearch={onSearch}/>
      
      <div>{renderApiData()}</div> 
    </div>
  );
};

export default Home;
