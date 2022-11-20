import { Fragment } from "react"
import PageTitle from "../../components/pageTitle/PageTitle.component"
import Menu from "../../components/menu/Menu.component"
import { Link } from "react-router-dom";

const Home = ()=>{
  
  
    return (
      <Fragment>
        <PageTitle title={"פלאפל בשר"} />
        <div className="container">
          <div className="mt-4 text-center">
            <article>
              <div className="h1">
                אז מי אנחנו <h2 className="h1 d-inline">פלאפל בשר</h2>
              </div>
              <div className="mt-1 fs-5 pt-0 p-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
                excepturi dignissimos dolorum quia numquam esse, aliquam
                recusandae sunt nisi quod nostrum, exercitationem odit autem
                soluta id laudantium accusamus maiores aliquid sed architecto
                ipsum? Minus illum asperiores ea enim. Aspernatur, quis corrupti
                eius velit beatae earum dolores vero deleniti eum nesciunt eaque
                dignissimos.
              </div>
            </article>
            <div className="mt-5">
              <div className="h3">קצת שתבינו עלינו</div>
              <div className="my-3">
                <div className="row row-cols-1 row-cols-lg-3 row-cols-sm-2 g-3">
                  <Menu />
                  <div className="col mt-auto text-end p-3">
                    <Link to="/תפריט">
                      הצג עוד{'>>'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
}

export default Home