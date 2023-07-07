import ShowCard from "./ShowCard";

const ShowGrid=({shows})=>{
  return( <div>{
    shows.map(data =>(
        <ShowCard key={data.show .id} id={data.show.id} name={data.show.name} image={data.show.image?data.show.image.medium:"/not_found_image.png"} summary={data.show.summary}/>
    )
    )
  }</div>
  )

}

export default ShowGrid;