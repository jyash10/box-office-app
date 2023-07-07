import { useState } from "react";
import { searchforShows } from "../api/tvmaze";
const Home=()=>{
   const[searchStr,setSearchStr]=useState("");
   const [apiData,setApiData]=useState(null);
   const [apiDataError,setApiDataError]=useState(null)
   console.log(apiDataError)
   const onSearchInputChange=(ev)=>{
    setSearchStr(ev.target.value)
   }

   const onSearch= async (ev)=>{
     ev.preventDefault();
    try{
    setApiDataError(null)
    const result=await searchforShows(searchStr); 
    setApiData(result)
    }
    catch(error)
    {
       setApiDataError(error)
    }
}
//    https://api.tvmaze.com/search/shows?q=girls

  const renderApiData=()=>{
    if(apiDataError)
    {
        return <div>Error occured: {apiDataError.message}</div>
    }
    if(apiData) {
        return apiData.map((data)=>(<div key={data.show.id}>{data.show.name}</div>))
    }
    return null
  }

   return (<div>Home
   <form onSubmit={onSearch}>
   <input type="text" value={searchStr} onChange={onSearchInputChange}/>
   <button type="submit">
   Search
   </button>
   </form>
   <div>{renderApiData()}</div>
   </div>);
}

export default Home;