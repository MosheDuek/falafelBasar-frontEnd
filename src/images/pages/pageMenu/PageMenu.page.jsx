import { Fragment } from "react"
import Menu from "../../components/menu/Menu.component";
import PageTitle from "../../components/pageTitle/PageTitle.component"

const PageMenu = ()=>{
    return (
      <Fragment>
        <PageTitle title="תפריט" />
        <div className="container mt-3">
          <div className="row row-cols-1 row-cols-lg-3 row-cols-sm-2 g-3">
            <Menu/>
          </div>
        </div>
      </Fragment>
    );
}

export default PageMenu