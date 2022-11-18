import axios from "axios";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import AdminLeadsTable from "../adminLeadsTable/AdminLeadsTable.component";
import ConfirmDelete from "../confirmDelete/ConfirmDelete.component";

const AdminLeads = () => {
  const [data, setData] = useState([]);
  const [confirmDelete,setConfirmDelete] = useState(null)
  useEffect(() => {
    axios
      .get("/leads")
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => {
        toast.error("משהו השתבש");
      });
  },[]);

  const confirmDeleteLead = (obj)=>{
    setConfirmDelete(obj)
  }
  const cancelDelete = ()=>{
    setConfirmDelete(null)
  }
  const deleteLead = (id)=>{
    axios.delete(`/leads/${id}`)
    .then(()=>{
        setConfirmDelete(null)
        toast.done("נמחק בהצלחה")
        let d = [...data]
        d = d.filter((lead) => lead.idleads !== id);
        setData(d)
    })
    .catch(()=>{
        setConfirmDelete(null)
        toast.error("משהו השתבש")
    })
  }
  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center">לידים</h1>

        <div className="mt-4 overflow-auto">
          {data && (
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">שם</th>
                  <th scope="col">מייל</th>
                  <th scope="col">טלפון</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((lead, idx) => (
                  <AdminLeadsTable
                    key={idx}
                    {...lead}
                    onDelete={confirmDeleteLead}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
        {confirmDelete && (
          <ConfirmDelete
            onCancel={cancelDelete}
            onDelete={deleteLead}
            {...confirmDelete}
          />
        )}
      </div>
    </Fragment>
  );
};

export default AdminLeads;
