
type Prod={
    prod:any
}

const Home = (props:Prod) => {
    
  return (
    <div className="grid grid-cols-4 p-5">
      { props.prod.map(()=>{
        return <div className="border border-spacing-1 p-2 mt-3 ml-3 " >
            <img  className="w-60 h-48" />
            <h1 className="font-bold text-xl"> </h1>
            <h1 >  </h1>
            <h1 > </h1>
        </div>
      })}
    </div>
  )
}

export default Home
  
  