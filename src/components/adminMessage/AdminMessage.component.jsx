import axios from "axios";
import { useEffect } from "react";
import { Fragment } from "react"

const AdminMessage = ({ idmessages, name, email, phone_number, subject, message, onclose,onRead }) => {
    const handleClick = ()=>{
        onclose()
    }
    useEffect(()=>{
      axios.put(`/messages/${idmessages}`)
      .then(()=>{onRead(idmessages)})
      .catch(()=>{})
    },[])
  return (
    <Fragment>
      <div className="custom-fixed bg-dark">
        <button
          className="btn btn-secondary align-self-start me-4"
          onClick={handleClick}
        >
          X סגור
        </button>
        <div className="w-75 bg-black p-3">
          <div className="card fs-4">
            <div className="card-body">
              <h5 className="card-title h1">{name}</h5>
              <h6 className="card-subtitle mb-2 text-muted h3">{subject}</h6>
              <p className="card-text">{message}</p>
              <a
                href={`tel:${phone_number}`}
                target="_blank"
                className="card-link"
              >
                {phone_number}
              </a>
              <a
                href={`mailto:${email}`}
                target="_blank"
                className="card-link"
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AdminMessage