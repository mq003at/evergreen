import BreadCrumbs from "../Others/Breadcrumbs"

const FrontPage: React.FC = () => {
    return(
        <div className="front">
            <div className="front hero h-[450px]">
                <div className="hero-message">
                    <h1 className="">Borrowing</h1>
                </div>
            </div>
            <div className="front main-page">
                {/* Routing banner here */}
                <div className="routing-banner">
                    <BreadCrumbs />
                </div>
            </div>
        </div>
    )
}

export default FrontPage;