const AdminMessageTable = ({
  idmessages,
  name,
  email,
  phone_number,
  subject,
  message,
  onShow,
  watched,
}) => {
  const showMessage = () => {
    onShow({ idmessages, name, email, phone_number, subject, message });
  };

  return (
    <tr>
      <th>{name}</th>
      <th>{email}</th>
      <th>{phone_number}</th>
      <th>{subject}</th>
      <th>
        <button className="btn btn-warning" onClick={showMessage}>
          הצג
        </button>
      </th>
      <th>{watched === 1 ? "נקרא" : "לא נקרא"}</th>
    </tr>
  );
};

export default AdminMessageTable;
