import { useState} from 'react';
import { searchforShows } from '../api/tvmaze';
import { searchforPeople } from '../api/tvmaze';
import SearchForm from '../Components/SerachForm';
import ShowGrid from '../Components/shows/ShowGrid';
import ActorGrid from '../Components/actors/ActorGrid';
import { useQuery } from '@tanstack/react-query';
import styled,{css,ThemeProvider} from 'styled-components'
import { TextCenter } from '../Components/common/TextCenter';
const theme={
  colors:{
    main:'blue',
},
};

const Container=styled.div`
 text-align: center;
`

const Button=styled.button`
 background: transparent;
 border-radius: 3px;
 border: 2px solid palevioletred;
 color: ${(props)=>props.theme.colors.main};
 margin: 0 1em;
 padding: 0.25em 1em;
 
 ${props =>
   props.primary &&
   css`
   background: "palevioletred";
   color : "white";
   `}


`;

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
  
  };
  //    https://api.tvmaze.com/search/shows?q=girls

  const renderApiData = () => {
    if (apiDataError) {
      return <TextCenter>Error occured: {apiDataError.message}</TextCenter>;
    }

    if(apiData?.length === 0){
        return <TextCenter>No Results</TextCenter>
    }

    if (apiData) {
      return apiData[0].show ? <ShowGrid shows={apiData}/> : <ActorGrid actors={apiData}/>;
    }
    return null;
  };

  return (
    <div>
    <ThemeProvider theme={theme}>
    <Container>
    </Container>
    </ThemeProvider>
    <SearchForm onSearch={onSearch}/>
      
      <div>{renderApiData()}</div> 
    </div>
  );
};

export default Home;
