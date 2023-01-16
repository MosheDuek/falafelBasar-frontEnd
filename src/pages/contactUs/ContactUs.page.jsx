import "./contuctUs.css";
import { Fragment } from "react";
import ContuctUsForm from "../../components/contuctUsForm/ContuctUsForm.component";
import PageTitle from "../../components/pageTitle/PageTitle.component";

const ContactUs = () => {
  return (
    <Fragment>
      <PageTitle title="צור קשר" />
      <div className="container mt-4">
        <ContuctUsForm />
      </div>
    </Fragment>
  );
};

export default ContactUs;
