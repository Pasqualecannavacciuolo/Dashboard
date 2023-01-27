import "./ProductDetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from 'axios';



const ProductDetail = () => {

    const { productId } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products/' + productId);
                const object = response.data;

                setProduct(object);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [productId]);




    /*const fetchData = () => {
        axios.get('https://dummyjson.com/products/'+orderId)
        .then(response => {
            const object = response.data;
            setOrder(object);
        });
    }*/

    return (
        <>
            <h1>Ciao da {productId}</h1>
        </>
    );
}

export default ProductDetail;