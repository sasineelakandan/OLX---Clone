import {  useState } from "react"
import Home from "./Home"
import Menubar from "./Menubar"
import Navabr from "./Navabr"
import Footer from "./Footer"

const Main = () => {
 const [prod]=useState([])
   
  return (
    <div>
    <Navabr />
    <Menubar/>
    <Home prod={prod}/>
    <Footer/>
    </div>
  )
}

export default Main