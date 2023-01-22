import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const OrderDetail = () => {
    const {orderId} = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products/'+orderId);
                const object = response.data;
                setOrder(object);
            }catch(err) {
                console.log(err);
            }
        }
        getData();
    }, []);

    /*const fetchData = () => {
        axios.get('https://dummyjson.com/products/'+orderId)
        .then(response => {
            const object = response.data;
            setOrder(object);
        });
    }*/
    
    return (
        <>
        
            <h1>Ciao da Order Detail #{orderId}</h1>
            <ul key={order.id}>
                <li >{order.id}</li>
                <li >{order.title}</li>
                <li >{order.price}</li>
            </ul>
        </>
    );
} 

export default OrderDetail;