import React from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
    const {orderId} = useParams();
    
    return(
        <>
            <h1>Ciao da Order Detail #{orderId}</h1>
        </>
    );
} 

export default OrderDetail;