import "./Homedashboard.css"

import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import SimpleTable from "../../Components/Reusable/Tables/SimpleTable";


import ApexBarChart from "../../Components/Reusable/Charts/ApexCharts/BarChart";
import ApexAreaChart from "../../Components/Reusable/Charts/ApexCharts/AreaChart";
import ApexDonutChart from "../../Components/Reusable/Charts/ApexCharts/DonutChart";


import { FacebookData } from "../../utils/ChartData.js/FacebookData";
import { InstagramData } from "../../utils/ChartData.js/InstagramData";
import { TwitterData } from "../../utils/ChartData.js/TwitterData";
import { UsersData } from "../../utils/ChartData.js/UsersData";
import { PlatformsData } from "../../utils/ChartData.js/PlatformsData";


import customers_icon from "../../utils/img/customers.png";
import products_icon from "../../utils/img/products.png";
import entrate_icon from "../../utils/img/entrate.png";
import perdite_icon from "../../utils/img/perdite.png";
import facebook_icon from "../../utils/img/facebook.png";
import instagram_icon from "../../utils/img/instagram.png";
import twitter_icon from "../../utils/img/twitter.png";


const HomeDashboard = () => {

    const [FblineChartData, setFbLineChartData] = useState({
        labels: FacebookData.map((data) => data.anno),
        datasets: [
            {
                label: "Followers",
                data: FacebookData.map((data) => data.followers),
                backgroundColor: [
                    "#222"
                ],
                borderColor: "#222",
                borderWidth: 3,
            }
        ],
    });

    const [IglineChartData, setIgLineChartData] = useState({
        labels: InstagramData.map((data) => data.anno),
        datasets: [
            {
                label: "Followers",
                data: InstagramData.map((data) => data.followers),
                backgroundColor: [
                    "#222"
                ],
                borderColor: "#222",
                borderWidth: 3,
            }
        ],
    });

    const [TwlineChartData, setTwLineChartData] = useState({
        labels: TwitterData.map((data) => data.anno),
        datasets: [
            {
                label: "Followers",
                data: TwitterData.map((data) => data.followers),
                backgroundColor: [
                    "#222"
                ],
                borderColor: "#222",
                borderWidth: 3,
            }
        ],
    });

    const [pieChartData, setPieChartData] = useState({
        labels: PlatformsData.map((data) => data.platform),
        datasets: [
            {
                label: "Numero utenti che utilizzano",
                data: PlatformsData.map((data) => data.number),
                backgroundColor: [
                    "#1A936F",
                    "#EA638C",
                    "#F6AE2D"
                ],
                borderColor: "#222",
                borderWidth: 0.1,
            }
        ],
    });

    const [barChartData, setBarChartData] = useState({
        labels: UsersData.map((data) => data.year),
        datasets: [
            {
                label: "Utenti ottenuti",
                data: UsersData.map((data) => data.userGain),
                backgroundColor: [
                    "#1A936F"
                ],
            },
            {
                label: "Utenti persi",
                data: UsersData.map((data) => data.userLost),
                backgroundColor: [
                    "#CA3C25"
                ],

            },
        ],
    });

    const [orders, setOrders] = useState([]);
    const loadData = async () => {
        
        axios.get('https://dummyjson.com/carts')
            .then(response => {
                setOrders(response.data.carts);
            });
        
            /*try {
                const response = await axios.get('http://localhost:4001/products');
                const object = response;
                setOrders(object.data);
                console.log(object.data[0])                

            } catch (err) {
                console.log(err);
            }*/
    }

    useEffect(() => {
        loadData();
    }, []);


    return (
        <>

            <div className="row align-items-md-stretch mt-3">

                <div className="col-md-9">
                    <div className="h-100 p-3 chart-wrapper rounded-3">
                        <h2 className="mb-5">Statistiche sugli utenti</h2>
                        <div className="chart-container container">
                            <ApexBarChart chartData={UsersData} />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="h-100 p-3 chart-wrapper rounded-3">
                        <h2 className="mt-4 mb-3">Statistiche generali</h2>
                        <div className="list-group w-auto nav flex-column">
                            <a href="#" className="rounded-3 mt-1 mb-1 list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <img src={entrate_icon} alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                <div className="d-flex gap-2 w-100 justify-content-between justify-content-center align-items-center">
                                    <div>
                                        <h6 className="mb-0">Entrate: 1300€</h6>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="rounded-3 mt-1 mb-1 list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <img src={perdite_icon} alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                <div className="d-flex gap-2 w-100 justify-content-between justify-content-center align-items-center">
                                    <div>
                                        <h6 className="mb-0">Perdite: 500€</h6>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="rounded-3 mt-1 mb-1 list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <img src={products_icon} alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                <div className="d-flex gap-2 w-100 justify-content-between justify-content-center align-items-center">
                                    <div>
                                        <h6 className="mb-0">Prodotti totali: 76</h6>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="rounded-3 mt-1 mb-1 list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <img src={customers_icon} alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                <div className="d-flex gap-2 w-100 justify-content-between justify-content-center align-items-center">
                                    <div>
                                        <h6 className="mb-0">Clienti totali: 12578</h6>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div >
            </div >

            <div className="start-charts-wrapper row mt-3">
                <div className="col chart-wrapper p-3 rounded-3">

                    <div className="card-header">
                        <span className="d-inline-block align-middle">
                            <img  width={32} height={32} src={facebook_icon} ></img>
                        </span>
                        <span className="d-inline-block align-middle fs-4">Followers di Facebook</span>
                    </div>
                    <ApexAreaChart chartData={FblineChartData} color="#226CE0"/>

                </div>
                <div className="col chart-wrapper  p-3 rounded-3 ">
                    <div className="card-header">
                        <span className="d-inline-block align-middle">
                            <img  width={32} height={32} src={instagram_icon} ></img>
                        </span>
                        <span className="d-inline-block align-middle fs-4">Followers di Instagram</span>
                    </div>
                    <ApexAreaChart chartData={IglineChartData} color="#EA638C"/>
                </div>
                <div className="col chart-wrapper p-3 rounded-3">
                    <div className="card-header">
                        <span className="d-inline-block align-middle">
                            <img  width={32} height={32} src={twitter_icon} ></img>
                        </span>
                        <span className="d-inline-block align-middle fs-4">Followers di Twitter</span>
                    </div>
                    <ApexAreaChart chartData={TwlineChartData} color="#2297E0"/>
                </div>
            </div>

            <div className="row align-items-md-stretch mt-3">
                <div className="col-md-6">
                    <div className="h-100 p-5 chart-wrapper rounded-3">
                        <h2 className="mb-5">Statistiche sui device utilizzati</h2>
                        <div className="chart-container container">
                            <ApexDonutChart chartData={pieChartData}/>
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