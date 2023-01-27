import "./OrderDetails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import StarRating from "../../Components/Reusable/Rating/StarRating";

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products/' + orderId);
                const object = response.data;
                setOrder(object);
                setRating(Math.round(object.rating));
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [orderId]);

    /*const fetchData = () => {
        axios.get('https://dummyjson.com/products/'+orderId)
        .then(response => {
            const object = response.data;
            setOrder(object);
        });
    }*/

    return (
        <>
            <div className="order-wrapper d-flex flex-row justify-content-around card">
                <div className=" text-start" key={order.id}>
                    <div className="card-body">
                        <h1 className="card-title mt-3">Dettagli dell'ordine</h1>
                        <img src={order.thumbnail} className="mt-3 bd-placeholder-img figure-img img-fluid rounded" width="400" height="300" alt="product_image"></img>
                        <div className="card-text mt-3">
                            <p>Numero ordine: #{order.id}</p>
                            <p>Prodotto acquistato: {order.title}</p>
                            <p>Prezzo: {order.price}€</p>
                            <p>Quantità in magazzino: {order.stock}</p>
                            <div>
                                <span className="d-inline-block align-middle">Rating: </span>
                                <span className="d-inline-block align-middle">
                                    <StarRating rating={rating} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" text-start" key={order.id}>
                    <div className="card-body">
                        <h1 className="card-title mt-3">Dettagli dell'acquirente</h1>
                        <div className="card-text mt-3">
                            <p>Numero ordine: #{order.id}</p>
                            <p>Prodotto acquistato: {order.title}</p>
                            <p>Prezzo: {order.price}€</p>
                            <p>Quantità in magazzino: {order.stock}</p>
                            <div>
                                <span className="d-inline-block align-middle">Rating: </span>
                                <span className="d-inline-block align-middle">
                                    <StarRating rating={rating} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetail;