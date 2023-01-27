import "./OrderDetails.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import axios from 'axios';

import linea from "../../utils/img/linea.png";

import ordine_ricevuto from "../../utils/img/ordine_ricevuto.png";
import pagamento_ricevuto from "../../utils/img/pagamento_ricevuto.png";
import ordine_spedito from "../../utils/img/ordine_spedito.png";
import ordine_consegnato from "../../utils/img/ordine_consegnato.png";
import code from "../../utils/img/code.png";
import email from "../../utils/img/email.png";
import phone from "../../utils/img/phone.png";
import euro from "../../utils/img/euro.png";
import carrello from "../../utils/img/carrello.png";
import quantita from "../../utils/img/quantita.png";
import magazzino from "../../utils/img/magazzino.png";

const OrderDetail = () => {
    const navigate = useNavigate();

    const { orderId } = useParams();
    // Momentaneo con il DB non potrà essere manipolato
    const { orderStatus } = useParams();
    
    const [order, setOrder] = useState({});
    const [cartContent, setCartContent] = useState([{}]);
    const [cartTotal, setCartTotal] = useState(0);

    

    // Ottengo i dati del carrello
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/carts/' + orderId);
                const object = response.data;

                setOrder(object);
                setCartContent(object.products)

                let somma = 0;
                object.products.forEach(element => {
                    somma = somma+element.price;
                    setCartTotal(somma);
                });

            } catch (err) {
                console.log(err);
            }
        }
        getData();
        const shipping_timeline_elements = document.getElementsByClassName("child-element")
        const array = [...shipping_timeline_elements];
        array.forEach(element => {
            const element_status = element.className.split("child-element").pop();
            const element_status_without_space = element_status.trim()
           
            if(element_status_without_space === orderStatus) {
                element.className="child-element status";
                console.log(element.className)
            }
        });
    }, [orderId]);


    // Navigo alla paginad el prodotto
    const handleClick = (e) => {
        navigate('/dashboard/product/'+e.target.value);
    }



    /*const fetchData = () => {
        axios.get('https://dummyjson.com/products/'+orderId)
        .then(response => {
            const object = response.data;
            setOrder(object);
        });
    }*/

    return (
        <>
            <div className="order-wrapper d-flex flex-row justify-content-around card p-5">
                <div className="order-wrapper-child text-start" key={order.id}>
                    <div className="card-body">
                        <h1 className="card-title mt-3">Dettagli dell'ordine</h1>
                        <div className="card-text mt-3">
                            <div className="mt-3 mb-3">
                                <span className="d-inline-block align-middle">
                                    <img width={32} height={32} src={code} alt="id"></img>
                                </span>
                                <span className="d-inline-block align-middle">ID Acquirente: #{order.id}</span>
                            </div>
                            <div className="mt-3 mb-3">

                                <span className="accordion accordion-flush d-inline-block align-middle" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <span className="d-inline-block align-middle">
                                                <img width={32} height={32} src={carrello} alt="id"></img>
                                            </span>
                                            <span className="d-inline-block align-middle">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Contenuto carrello
                                                </button>
                                            </span>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                {cartContent.map((item) => (

                                                    <div key={item.id} className="list-group list-group-checkable d-grid gap-2 border-0 w-auto mt-1 mb-1">
                                                        <input className="list-group-item-check pe-none" onClick={handleClick} type="radio" name="listGroupCheckableRadios" id={item.id} value={item.id} />
                                                        <label className="list-group-item rounded-3 py-3" htmlFor={item.title}>
                                                            {item.title}
                                                            <span className="d-block small opacity-50">{item.price}€</span>
                                                        </label>
                                                    </div>

                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            </div>
                            
                            <div className="mt-3 mb-3">
                                <span className="d-inline-block align-middle">
                                    <img width={32} height={32} src={euro} alt="id"></img>
                                </span>
                                <span className="d-inline-block align-middle">Totale: {cartTotal}€</span>
                            </div>
                            <div className="mt-3 mb-3">
                                <span className="d-inline-block align-middle">
                                    <img width={32} height={32} src={quantita} alt="id"></img>
                                </span>
                                <span className="d-inline-block align-middle">Quantità acquistata: {order.totalProducts}</span>
                            </div>
                            <div className="mt-3 mb-3">
                                <span className="d-inline-block align-middle">
                                    <img width={32} height={32} src={magazzino} alt="id"></img>
                                </span>
                                <span className="d-inline-block align-middle">Quantità magazzino: {order.totalQuantity}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-wrapper-child text-start">
                    <div className="client card-body">
                        <h1 className="card-title mt-3">Dettagli Acquirente</h1>
                        <div className="card-text mt-3">
                            <div className="mt-3 mb-3">
                                <span className="d-inline-block align-middle">
                                    <img width={32} height={32} src={code} alt="id"></img>
                                </span>
                                <span className="d-inline-block align-middle">ID Acquirente: #{order.userId}</span>
                            </div>
                            <div className="mt-3 mb-3">
                                <span className="d-inline-block align-middle">
                                    <img width={32} height={32} src={email} alt="id"></img>
                                </span>
                                <span className="d-inline-block align-middle">Email: acquirente@mail.it</span>
                            </div>
                            <div className="mt-3 mb-3">
                                <span className="d-inline-block align-middle">
                                    <img width={32} height={32} src={phone} alt="id"></img>
                                </span>
                                <span className="d-inline-block align-middle">Telefono: 3331122345</span>
                            </div>
                            <div className="mt-3 mb-3">
                                <span className="d-inline-block align-middle">
                                    <img width={32} height={32} src={pagamento_ricevuto} alt="id"></img>
                                </span>
                                <span className="d-inline-block align-middle">Metodo di pagamento: carta</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-wrapper-child text-start" >
                    <div className="card-body">
                        <h1 className="card-title mt-3">Stato spedizione</h1>
                        <div className="card-text mt-3">

                            <div className="box">
                                <div className="child">
                                    <div className="dot-line-wrapper">
                                        <div className="dot"><img src={ordine_ricevuto} alt="ordine_ricevuto" width={32} height={32}></img></div>
                                        <div className="line"><img src={linea} alt="linea"></img></div>
                                    </div>
                                    <div className="child-element ricevuto">
                                        Ricevuto
                                        <div><small className="text-muted">01/02/2023 17:45</small></div>
                                    </div>
                                </div>
                                <div className="child">
                                    <div className="dot-line-wrapper">
                                        <div className="dot"><img src={pagamento_ricevuto} alt="pagamento_ricevuto" width={32} height={32}></img></div>
                                        <div className="line"><img src={linea} alt="linea"></img></div>
                                    </div>
                                    <div className="child-element pagato">
                                        Pagato
                                        <div><small className="text-muted">01/02/2023 17:47</small></div>
                                    </div>
                                </div>
                                <div className="child">
                                    <div className="dot-line-wrapper">
                                        <div className="dot"><img src={ordine_spedito} alt="ordine_spedito" width={32} height={32}></img></div>
                                        <div className="line"><img src={linea} alt="linea"></img></div>
                                    </div>
                                    <div className="child-element spedito">
                                        Spedito
                                        <div><small className="text-muted">04/02/2023 09:12</small></div>
                                    </div>
                                </div>
                                <div className="child">
                                    <div className="dot-line-wrapper">
                                        <div className="dot"><img src={ordine_consegnato} alt="ordine_consegnato" width={32} height={32}></img></div>
                                        <div className="spacer"></div>
                                    </div>
                                    <div className="child-element consegnato">
                                        Consegnato
                                        <div><small className="text-muted">07/02/2023 11:57</small></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetail;