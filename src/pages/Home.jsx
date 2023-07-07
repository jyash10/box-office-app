import { useState } from 'react';
import { searchforShows } from '../api/tvmaze';
import { searchforPeople } from '../api/tvmaze';
const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  const [searchOption,setSearchOption]=useState('shows')
  console.log(searchOption);
  
  const onSearchInputChange = ev => {
    setSearchStr(ev.target.value);
  };

  const onRadioChange=ev=>{
    setSearchOption(ev.target.value)
  }

  const onSearch = async ev => {
    ev.preventDefault();
    try {
      if(searchOption==="shows"){
      setApiDataError(null);
      const result = await searchforShows(searchStr);
      setApiData(result);
      }
      else{
        const result = await searchforPeople(searchStr);
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
      Home
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />
        
        <label>
            Shows
            <input type="radio" name="search-option" value="shows" checked={searchOption==="shows"} onChange={onRadioChange}/>
        </label>

        <label>
            Actors
            <input type="radio" name="search-option" value="actors" checked={searchOption==="actors"} onChange={onRadioChange}/>
        </label>
        
        <button type="submit">Search</button>
      </form>
      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
