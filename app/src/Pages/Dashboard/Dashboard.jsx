import "./Dashboard.css";
import { Link, Outlet } from "react-router-dom";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useJwt } from "react-jwt";
import { isExpired } from "react-jwt";
import Cookies from 'js-cookie';


import RingLoader from "react-spinners/RingLoader";


import dashboard_icon from "../../utils/img/dashboard.png";
import orders_icon from "../../utils/img/orders.png";
import reports_icon from "../../utils/img/reports.png";
import products_icon from "../../utils/img/products.png";
import customers_icon from "../../utils/img/customers.png";
import integrations_icon from "../../utils/img/integrations.png";


const Dashboard = () => {
    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);
    const [time, setTime] = useState(new Date());

    /**
     * Hook che permette di vedere lo spinner e controlla 
     * se all'avvio del componente sono autenticato
     */
    useEffect(() => {
        setTimeout(() => {
            setLoaded("true");
        }, 3000);
        checkAuth();
    });

    /**
     * Hook che controlla ogni 30 secondi se sono autenticato
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
            checkAuth();
        }, 30000);

        return () => clearInterval(interval);
    });

    


    /**
     * Funzione che mi permette di eliminare dei cookie quando il token scade
     * Al momento nei cookie ho solo il token
     */
    const checkAuth = async () => {
        const token = Cookies.get("token");
        const token_is_expired = isExpired(token);
        // Non sei autenticato
        if (token_is_expired == true) {
            navigate('/login');
            Cookies.remove("token");
        }
    }

    


    return (
        
        <>
            {loaded === false &&
                <div className="spinner-wrapper">
                    <RingLoader
                        color="#222"
                        loading
                        size={200}
                    />
                </div>
            }
            <div className="dashboard-content">
                <header className="p-1 stiky-top">
                    <nav className="navbar navbar-expand-lg ">
                        <div className="container-fluid">
                            <a className="navbar-brand text-light" href="#">
                                <svg width="64px" height="64px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>logo--medium</title><path className="cls-1" d="M4,4V28H28V4ZM23.9385,9.6865,22.6514,10.92a.3766.3766,0,0,0-.1431.3613v9.0674a.3765.3765,0,0,0,.1431.3613l1.257,1.2339v.271h-6.323v-.271L18.8877,20.68c.1279-.128.1279-.1656.1279-.3609V12.99l-3.62,9.1958H14.906L10.6907,12.99v6.1631a.8505.8505,0,0,0,.2334.7071l1.6936,2.0547v.2709H7.8154v-.2709L9.509,19.86a.82.82,0,0,0,.2183-.7071V12.0264A.6231.6231,0,0,0,9.5239,11.5L8.0186,9.6865v-.271h4.6743l3.613,7.9239,3.1765-7.9239h4.4561Z"></path><path id="inner-path" className="cls-2" d="M9.7273,12.0266A.6246.6246,0,0,0,9.524,11.5L8.0186,9.6863V9.4154H12.693l3.613,7.9238,3.1764-7.9238h4.4561v.2709L22.6513,10.92a.3763.3763,0,0,0-.143.3612v9.0676a.3763.3763,0,0,0,.143.3612l1.2571,1.2341v.2709H17.5856v-.2709L18.8878,20.68c.1279-.1279.1279-.1656.1279-.3612V12.99l-3.62,9.1955h-.4893L10.6907,12.99v6.1629a.8506.8506,0,0,0,.2334.7074l1.6936,2.0543v.2709H7.8154v-.2709L9.509,19.86a.82.82,0,0,0,.2183-.7074Z"></path><rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" className="cls-2" width="32" height="32"></rect></g></svg>
                                Logo Aziendale
                            </a>
                        </div>
                    </nav>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <nav id="sidebarMenu" className="position-sticky sidebar-sticky px-md-4 pt-3 col-md-3 col-lg-2 d-md-block sidebar collapse">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                                <h1 className="ps-1 h2">Menu</h1>
                            </div>

                            <div>
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to={''}>
                                            <img src={dashboard_icon} className="feather feather-file align-text-center me-2"></img>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <img src={orders_icon} className="feather feather-file align-text-center me-2"></img>
                                            Ordini
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to={'/dashboard/products'}>
                                            <img src={products_icon} className="feather feather-file align-text-center me-2"></img>
                                            Prodotti
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <img src={customers_icon} className="feather feather-file align-text-center me-2"></img>
                                            Clienti
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <img src={reports_icon} className="feather feather-file align-text-center me-2"></img>
                                            Reports
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <img src={integrations_icon} className="feather feather-file align-text-center me-2"></img>
                                            Integrazioni
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                            


                            <Outlet />
                            
                        
                            
                        </main>
                    </div>
                </div>
                <svg width="255" height="29" viewBox="0 0 255 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4 28.52C8.32 28.52 6.32 28.1867 4.4 27.52C2.50667 26.8267 1.04 25.9467 0 24.88L1.16 22.6C2.14667 23.56 3.46667 24.3733 5.12 25.04C6.8 25.68 8.56 26 10.4 26C12.16 26 13.5867 25.7867 14.68 25.36C15.8 24.9067 16.6133 24.3067 17.12 23.56C17.6533 22.8133 17.92 21.9867 17.92 21.08C17.92 19.9867 17.6 19.1067 16.96 18.44C16.3467 17.7733 15.5333 17.2533 14.52 16.88C13.5067 16.48 12.3867 16.1333 11.16 15.84C9.93334 15.5467 8.70667 15.24 7.48 14.92C6.25334 14.5733 5.12 14.12 4.08 13.56C3.06667 13 2.24001 12.2667 1.60001 11.36C0.986673 10.4267 0.68 9.21333 0.68 7.72C0.68 6.33333 1.04 5.06667 1.76 3.92C2.50667 2.74667 3.64 1.81334 5.16 1.12C6.68 0.400002 8.62667 0.0400009 11 0.0400009C12.5733 0.0400009 14.1333 0.266667 15.68 0.720001C17.2267 1.14667 18.56 1.74667 19.68 2.52L18.68 4.88C17.48 4.08 16.2 3.49334 14.84 3.12C13.5067 2.74667 12.2133 2.56 10.96 2.56C9.28001 2.56 7.89334 2.78667 6.8 3.24C5.70667 3.69334 4.89333 4.30667 4.36 5.08C3.85333 5.82667 3.60001 6.68 3.60001 7.64C3.60001 8.73334 3.90667 9.61334 4.52 10.28C5.16 10.9467 5.98667 11.4667 7 11.84C8.04 12.2133 9.17333 12.5467 10.4 12.84C11.6267 13.1333 12.84 13.4533 14.04 13.8C15.2667 14.1467 16.3867 14.6 17.4 15.16C18.44 15.6933 19.2667 16.4133 19.88 17.32C20.52 18.2267 20.84 19.4133 20.84 20.88C20.84 22.24 20.4667 23.5067 19.72 24.68C18.9733 25.8267 17.8267 26.76 16.28 27.48C14.76 28.1733 12.8 28.52 10.4 28.52Z" fill="#222222"/>
<path d="M32.3388 28.28V2.84H22.4988V0.280003H45.1388V2.84H35.2988V28.28H32.3388Z" fill="#222222"/>
<path d="M43.9813 28.28L56.7813 0.280003H59.7013L72.5013 28.28H69.3812L57.6213 2H58.8213L47.0613 28.28H43.9813Z" fill="#222222"/>
<path d="M88.9025 28.52C86.7958 28.52 84.8492 28.1733 83.0625 27.48C81.2758 26.76 79.7292 25.76 78.4225 24.48C77.1158 23.2 76.0892 21.6933 75.3425 19.96C74.6225 18.2267 74.2625 16.3333 74.2625 14.28C74.2625 12.2267 74.6225 10.3333 75.3425 8.6C76.0892 6.86667 77.1158 5.36 78.4225 4.08C79.7558 2.8 81.3158 1.81334 83.1025 1.12C84.8892 0.400002 86.8358 0.0400009 88.9425 0.0400009C90.9692 0.0400009 92.8758 0.386668 94.6625 1.08C96.4492 1.74667 97.9558 2.76 99.1825 4.12L97.3025 6C96.1558 4.82667 94.8892 3.98667 93.5025 3.48C92.1158 2.94667 90.6225 2.68 89.0225 2.68C87.3425 2.68 85.7825 2.97333 84.3425 3.56C82.9025 4.12 81.6492 4.93333 80.5825 6C79.5158 7.04 78.6758 8.26667 78.0625 9.68C77.4758 11.0667 77.1825 12.6 77.1825 14.28C77.1825 15.96 77.4758 17.5067 78.0625 18.92C78.6758 20.3067 79.5158 21.5333 80.5825 22.6C81.6492 23.64 82.9025 24.4533 84.3425 25.04C85.7825 25.6 87.3425 25.88 89.0225 25.88C90.6225 25.88 92.1158 25.6133 93.5025 25.08C94.8892 24.5467 96.1558 23.6933 97.3025 22.52L99.1825 24.4C97.9558 25.76 96.4492 26.7867 94.6625 27.48C92.8758 28.1733 90.9558 28.52 88.9025 28.52Z" fill="#222222"/>
<path d="M108.052 21.32L107.933 17.72L124.893 0.280003H128.293L115.933 13.24L114.253 15.04L108.052 21.32ZM105.493 28.28V0.280003H108.453V28.28H105.493ZM125.613 28.28L113.533 14.36L115.533 12.2L129.133 28.28H125.613Z" fill="#222222"/>
<path d="M136.57 12.8H151.37V15.32H136.57V12.8Z" fill="#222222"/>
<path d="M156.456 28.28L167.936 12.76V15.04L157.136 0.280003H160.536L169.616 12.6L168.296 12.64L177.376 0.280003H180.576L169.896 14.84V12.76L181.336 28.28H177.896L168.216 15.12H169.456L159.856 28.28H156.456Z" fill="#222222"/>
<path d="M180.817 28.28L193.617 0.280003H196.537L209.337 28.28H206.217L194.457 2H195.657L183.897 28.28H180.817Z" fill="#222222"/>
<path d="M213.969 28.28V0.280003H216.929V25.72H232.609V28.28H213.969Z" fill="#222222"/>
<path d="M136.57 25.76H152.921V28.28H136.57V25.76Z" fill="#222222"/>
<path d="M136.57 0H152.921V2.52H136.57V0Z" fill="#222222"/>
<path d="M237.921 13.04H252.721V15.56H237.921V13.04Z" fill="#222222"/>
<path d="M237.921 26H254.272V28.52H237.921V26Z" fill="#222222"/>
<path d="M237.921 0.239998H254.272V2.76H237.921V0.239998Z" fill="#222222"/>
</svg>
            </div>
        </>
    );
}

export default Dashboard;