const AdminLeadsTable = ({ idleads,name, email, phone_number, onDelete }) => {

  const deleteLead = () => {
    onDelete({id:idleads,name:name});
  };

  return (
    <tr>
      <th>{name}</th>
      <th>{email}</th>
      <th>{phone_number}</th>
      <th>
        <button className="btn btn-danger" onClick={deleteLead}>
          מחק
        </button>
      </th>
    </tr>
  );
};

export default AdminLeadsTable