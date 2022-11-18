import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const GoBackButton = () => {
    const handleClick = ()=>{
        window.history.back()
    }

  return <button onClick={handleClick} className="d-block btn btn-outline-secondary mb-1">
    <span>
      <FontAwesomeIcon icon={faArrowRight} />
    </span>{" "}
    חזור
  </button>;
};

export default GoBackButton
