import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getShowById } from "../api/tvmaze";
const Show=()=>{
   const {showId} =useParams();
   console.log(showId)
   
   const [showData,setShowData]=useState(null)
   const [showError,setShowError]=useState(null)

    useEffect(()=>{
        

        async function fetchData(){
            try{
            const data=await getShowById(showId)
            console.log(data);
            setShowData(data)
            }
            catch(err){
                setShowError(err)
            }
        }

        fetchData()
    },[showId]);

    if(showError)
    {
        return <div>
            we have an Error: {showError.message}
        </div>
    }

    if(showData)
    {
        return <div>
            Got show data: {showData.name}
        </div>
    }
    return <div>
       Data is Loading
    </div>
}

export default Show;