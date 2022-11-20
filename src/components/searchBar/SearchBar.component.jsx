import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect } from "react"
const { Fragment } = require("react")

const SearchBar = ({onSearch})=>{
  useEffect(()=>{
    axios.get("/products/names")
    .then(({data})=>{
      console.log(data)
    })
    .catch((e)=>{
      console.log(e);
    })
  },[])
    return <Fragment>
        <form className="d-flex" role="search">
        <input className="form-control ms-2" type="search" placeholder="חיפוש" aria-label="Search"/>
        <button className="btn btn-outline-warning" type="submit"><FontAwesomeIcon icon={faSearch}/></button>
      </form>
    </Fragment>
}

export default SearchBar