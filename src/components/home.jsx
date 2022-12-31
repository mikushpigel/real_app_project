import PageHeader from "./common/pageHeader";

const Home = () => {
    return (
        <PageHeader 
        title={
            <>
            Real<i className="bi bi-geo-fill"></i>App
            </>
        }
            description='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio molestias quisquam ex quas voluptate quibusdam sed. Molestiae tenetur doloremque et.'
        />

    );
};

export default Home;