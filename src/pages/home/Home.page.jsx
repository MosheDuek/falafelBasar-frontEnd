import { Fragment } from "react";
import PageTitle from "../../components/pageTitle/PageTitle.component";
import Menu from "../../components/menu/Menu.component";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <PageTitle title={"פלאפל בשר"} />
      <div className="container">
        <div className="mt-4 text-center">
          <article>
            <div className="h1">
              הראשון בארץ וכנראה גם בעולם{" "}
              <h1 className="h1 d-inline">פלאפל בשר</h1>
            </div>
            <div className="mt-1 fs-5 pt-0 p-4">
              <p>
                לא תאמינו מה עשו לפלאפל: קבלן בניין מראשון לציון עבד במשך שש
                שנים על ההמצאה הזאת - כדור פלאפל שבתוכו בשר; <br />
                <b>"אין בנאדם שאוכל פה ולא אומר 'וואוו'"</b>
              </p>
            </div>
          </article>
          <div className="mt-5">
            <div className="h3">קצת שתבינו עלינו</div>
            <div className="my-3">
              <div className="row row-cols-2 row-cols-lg-3 g-3">
                <Menu />
                <div className="col mt-auto text-end p-3">
                  <Link to="/תפריט">הצג עוד{">>"}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
