import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import SimpleTable from "../Components/Reusable/Tables/SimpleTable";
import LineChart from "../Components/Reusable/Charts/LineChart";
import PieChart from "../Components/Reusable/Charts/PieChart";

import { UsersData } from "../utils/ChartData.js/UsersData";
import { PlatformsData } from "../utils/ChartData.js/PlatformsData";

import dashboard_icon from "../utils/img/dashboard.png";
import orders_icon from "../utils/img/orders.png";
import reports_icon from "../utils/img/reports.png";
import products_icon from "../utils/img/products.png";
import customers_icon from "../utils/img/customers.png";
import integrations_icon from "../utils/img/integrations.png";
import entrate_icon from "../utils/img/entrate.png";
import perdite_icon from "../utils/img/perdite.png";


const HomeDashboard = () => {

    const [lineChartData, setLineChartData] = useState({
        labels: UsersData.map((data) => data.year),
        datasets: [
            {
                label: "Utenti ottenuti",
                data: UsersData.map((data) => data.userGain),
                backgroundColor: [
                    "#0E79B2"
                ],
                borderColor: "#0E79B2",
                borderWidth: 1,
            },
            {
                label: "Utenti persi",
                data: UsersData.map((data) => data.userLost),
                backgroundColor: [
                    "#F39237"
                ],
                borderColor: "#F39237",
                borderWidth: 1,
            },
        ],
    });

    const [pieChartData, setPieChartData] = useState({
        labels: PlatformsData.map((data) => data.platform),
        datasets: [
            {
                label: "Numero utenti che utilizzano",
                data: PlatformsData.map((data) => data.number),
                backgroundColor: [
                    "#0E79B2",
                    "#F39237",
                    "#BF1363"
                ],
                //borderColor: "#00AB84",
                borderWidth: 1,
            }
        ],
    });

    const [orders, setOrders] = useState([]);
    const loadData = async () => {
        axios.get('https://dummyjson.com/products')
            .then(response => {
                setOrders(response.data.products);
            });
    }

    useEffect(() => {
        loadData();
    }, []);


    return (
        <>
            <div className="content row align-items-md-stretch">
                <div className="col-md-9">
                    <div className="h-100 p-5 chart-wrapper rounded-3">
                        <h2 className="mb-5">Statistiche sugli utenti</h2>
                        <div className="chart-container container">
                            <LineChart chartData={lineChartData} />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="h-100 p-3 chart-wrapper rounded-3">
                        <h2 className="mt-4">Statistiche generali</h2>
                        <div className="list-group w-auto nav flex-column">
                            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <img src={entrate_icon} alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                <div className="d-flex gap-2 w-100 justify-content-between justify-content-center align-items-center">
                                    <div>
                                        <h6 className="mb-0">Entrate: 1300€</h6>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <img src={perdite_icon} alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                <div className="d-flex gap-2 w-100 justify-content-between justify-content-center align-items-center">
                                    <div>
                                        <h6 className="mb-0">Perdite: 500€</h6>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <img src={products_icon} alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                <div className="d-flex gap-2 w-100 justify-content-between justify-content-center align-items-center">
                                    <div>
                                        <h6 className="mb-0">Prodotti totali: 76</h6>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <img src={customers_icon} alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                <div className="d-flex gap-2 w-100 justify-content-between justify-content-center align-items-center">
                                    <div>
                                        <h6 className="mb-0">Clienti totali: 12578</h6>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row align-items-md-stretch mt-3">
                <div className="col-md-6">
                    <div className="h-100 p-5 chart-wrapper rounded-3">
                        <h2 className="mb-5">Statistiche sui device utilizzati</h2>
                        <div className="chart-container container">
                            <PieChart chartData={pieChartData} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 chart-wrapper rounded-3">
                        <h2 className="mb-5">Ultimi ordini</h2>
                        <div className="chart-container container">
                            <SimpleTable data={orders} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeDashboard;