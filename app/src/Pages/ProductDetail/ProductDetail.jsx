import "./ProductDetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from 'axios';
import StarRating from "../../Components/Reusable/Rating/StarRating";


import modifica from "../../utils/img/modifica.png";
import elimina_white from "../../utils/img/elimina-white.png";


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
        
            <div className="container rounded-3">
                <div className="d-flex gap-3 mb-5">
                    <button className="btn btn-warning">
                        <span className="d-inline-block align-middle">
                        <img src={modifica} alt="modifica" width={32} height={32}></img>
                        </span>
                        <span className="ms-1 d-inline-block align-middle fw-bold">Modifica</span>
                    </button>
                    
                    <button className="btn btn-danger">
                        <span className="d-inline-block align-middle">
                        <img src={elimina_white} alt="modifica" width={32} height={32}></img>
                        </span>
                        <span className="ms-1 d-inline-block align-middle fw-bold">Elimina</span>
                    </button>
                </div>

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
                                <span className="fw-bold">Prezzo</span>: {product.price}€
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col">
                                <span className="fw-bold">Quantità magazzino</span>: {product.stock}
                            </div>
                        </div>
                        <div>
                            <span className="d-inline-block align-middle fw-bold">Rating: </span>
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