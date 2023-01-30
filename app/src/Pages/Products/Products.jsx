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
    }, []);

    const addProduct = async (e) => {
        e.preventDefault();
        navigate('/dashboard/product/create');
    }

    return(
        <>
            <button onClick={addProduct} className="btn btn-success">Aggiungi</button>
            <BaseTable data={products}/>
        </>
    );
}

export default Products;