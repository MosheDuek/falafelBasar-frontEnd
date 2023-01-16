import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AdminMessage from "../adminMessage/AdminMessage.component";
import AdminMessageTable from "../adminMessageTable/AdminMessageTable.component";
const { Fragment } = require("react");

const AdminMessages = ({ onMessageRead }) => {
  let counter = 0;
  let amount;
  const [data, setData] = useState([]);
  const [readMessage, setReadMessage] = useState(null);

  useEffect(() => {
    getData(counter);
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e) => {
    if (
      counter < amount &&
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
        e.target.documentElement.scrollHeight - 500
    ) {
      getData();
    }
  };

  const getData = () => {
    axios
      .get(`/messages/${counter}`)
      .then(({ data }) => {
        amount = data.amount;
        let arr = [];
        data.messages.forEach((e) => arr.push(e));
        setData((oldData) => [...oldData, ...arr]);
        counter += 40;
      })
      .catch((e) => {});
  };

  const handleReadMessage = (messageData) => {
    setReadMessage(messageData);
  };
  const closeMessage = () => {
    setReadMessage(null);
  };

  const messageRead = (id) => {
    onMessageRead();
    let d = [...data];
    let arr = [];
    d.map((message) => {
      if (message.idmessages === id) {
        message.watched = 1;
      }
      arr.push(message);
    });
    setData(arr);
  };

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center">הודעות</h1>
        <div className="mt-4 overflow-auto">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">שם</th>
                <th scope="col">מייל</th>
                <th scope="col">מספר טלפון</th>
                <th scope="col">נושא ההודעה</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((mes, idx) => (
                  <AdminMessageTable
                    {...mes}
                    key={idx}
                    onShow={handleReadMessage}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {readMessage && (
        <AdminMessage
          {...readMessage}
          onclose={closeMessage}
          onRead={messageRead}
        />
      )}
    </Fragment>
  );
};

export default AdminMessages;
