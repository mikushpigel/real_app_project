const Footer = () => {
    return (
        <footer className="border-top py-2 text-center">
            <span>
                Real <i className="bi bi-geo-fill"></i>App
            </span>
            <span className="mx-2">&copy;</span>
            <span className="mx-1">Rotem Shpigel</span>
            <span className="mx-1">{new Date().getFullYear()}</span>
        </footer>
    );
};

export default Footer;