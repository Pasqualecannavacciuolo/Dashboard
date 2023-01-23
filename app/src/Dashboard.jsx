import "./Dashboard.css";
import { Link, Outlet } from "react-router-dom";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useJwt } from "react-jwt";
import { isExpired } from "react-jwt";
import Cookies from 'js-cookie';


import RingLoader from "react-spinners/RingLoader";


import dashboard_icon from "./utils/img/dashboard.png";
import orders_icon from "./utils/img/orders.png";
import reports_icon from "./utils/img/reports.png";
import products_icon from "./utils/img/products.png";
import customers_icon from "./utils/img/customers.png";
import integrations_icon from "./utils/img/integrations.png";


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
    }, []);

    /**
     * Hook che controlla ogni 30 secondi se sono autenticato
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
            checkAuth();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    


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
            {loaded == false &&
                <div className="spinner-wrapper">
                    <RingLoader
                        color="#0E79B2"
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
                        <nav id="sidebarMenu" className="px-md-4 pt-3 col-md-3 col-lg-2 d-md-block sidebar collapse">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                                <h1 className="ps-1 h2">Menu</h1>
                            </div>

                            <div className="position-sticky sidebar-sticky">
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
                                        <a className="nav-link" href="#">
                                            <img src={products_icon} className="feather feather-file align-text-center me-2"></img>
                                            Prodotti
                                        </a>
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
            </div>
        </>
    );
}

export default Dashboard;