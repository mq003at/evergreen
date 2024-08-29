import BreadCrumbs from "../Others/Breadcrumbs";
import BorrowImage from "../../assets/img/borrow-background.svg";

const FrontPage: React.FC = () => {
  return (
    <div className="front">
      <div className="front hero h-[450px]">
        <div className="hero-message relative">
          <img className="d-block z-0" src={BorrowImage} />
          <div className="absolute inset-0 flex items-center">
            <h1 className="">Borrowing</h1>
          </div>
        </div>
      </div>
      <div className="front main-page">
        {/* Routing banner here */}
        <div className="routing-banner">
          <BreadCrumbs />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
