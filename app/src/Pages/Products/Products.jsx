import "./Products.css";

import React, {useEffect, useState} from "react";

import BaseTable from "../../Components/Reusable/Tables/BaseTable";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const loadData = async () => {

        try {
            const response = await axios.get('http://localhost:4001/products');
            const object = response;
            setProducts(object.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();
        window.localStorage.setItem("productsLoaded", "False");
    }, []);

    const addProduct = async (e) => {
        e.preventDefault();
        navigate('/dashboard/product/create');
    }

    return(
        <>
            <div className="container rounded-3 m-5 text-start">
                <h1 className="display-1 mb-3 fw-semibold">Opzioni</h1>
                <button onClick={addProduct} className="btn button-success">Aggiungi</button>
            </div>
            <div className="container rounded-3 m-5">
                <h1 className="display-1 text-start mb-3 fw-semibold">Tabella generale dei prodotti</h1>
                <BaseTable data={products}/>
            </div>
        </>
    );
}

export default Products;