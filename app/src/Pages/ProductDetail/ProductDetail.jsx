import "./ProductDetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from 'axios';
import StarRating from "../../Components/Reusable/Rating/StarRating";



const ProductDetail = () => {

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products/' + productId);
                const object = response.data;
                setProduct(object);
                setRating(Math.round(object.rating));
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
        <div className="product-wrapper p-5 rounded-3">
            <div className="container text-center">
                <div className="row text-start">
                    <div className="col">
                        <img src={product.thumbnail} width={"auto"} height={"auto"} alt="thumbnail"></img>
                    </div>
                    <div className="col">
                        <h1>{product.title}</h1>
                        <div className="row mt-5">
                            <div className="col">
                                <span className="fw-bold">Categoria</span>: {product.category}
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col">
                                <p className="mb-0 fw-bold">Descrizione</p>
                                <p>{product.description}</p>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col">
                                <span className="fw-bold">Prezzo</span>: {product.price}
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col">
                                <span className="fw-bold">Quantità magazzino</span>: {product.stock}
                            </div>
                        </div>
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
    );
}

export default ProductDetail;