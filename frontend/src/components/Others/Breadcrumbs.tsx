import { useLocation, useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";
import BreadcrumbButton from "./BreadcrumbButton";

const BreadCrumbs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegs = location.pathname.split("/").filter(Boolean);

  return (
    <div className="routing-banner m-8 flex max-w-fit flex-row p-4">
      <div className="flex h-[35px] items-center">
        <div className="nav home-1 relative mr-[15px] flex h-[35px] w-[35px] items-center justify-center bg-white shadow-md">
          <a
            className="flex h-6 w-6 items-center justify-center"
            title="Go to Evergreen Library"
            onClick={() => navigate("/")}
          >
            <HomeIcon className="h-4 w-4 text-black" />
          </a>
          <div className="absolute right-[-14px] h-0 w-0 z-[1] border-b-[20px] border-l-[15px] border-t-[20px] border-b-transparent border-l-secondary border-t-transparent"></div>
        </div>

        {/* <div className="nav home-2 relative ml-[-15px] flex items-center bg-accent px-4 py-2 font-semibold text-white">
          Home
          <div className="absolute right-[-14px] h-0 w-0 border-b-[20px] border-l-[15px] border-t-[20px] border-b-transparent border-l-accent border-t-transparent"></div>
        </div> */}

        <BreadcrumbButton content="Home"/>
      </div>
    </div>
  );
};

export default BreadCrumbs;


