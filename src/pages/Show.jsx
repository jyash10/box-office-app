import { useParams } from "react-router-dom";

const Show=()=>{
   const {showId} =useParams();
   console.log(showId)

    return <div>
        Show Page
    </div>
}

export default Show;