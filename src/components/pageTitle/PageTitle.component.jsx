import "./pageTitle.css"
const PageTitle = ({title})=>{
    return (
      <div className="bg-img">
        <div className="text-center custom-heading">
          <h1>{title}</h1>
        </div>
      </div>
    );
}

export default PageTitle