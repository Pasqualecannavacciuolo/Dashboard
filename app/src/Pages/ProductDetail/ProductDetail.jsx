import "./ProductDetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from 'axios';
import StarRating from "../../Components/Reusable/Rating/StarRating";


import salva_white from "../../utils/img/salva-white.png";
import elimina_white from "../../utils/img/elimina-white.png";


const ProductDetail = (props) => {
    

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [rating, setRating] = useState(0);

    // Form input fields
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleChangeTitle = event => {
        setTitle(event.target.value);
    };

    const handleChangeCategory = event => {
        setCategory(event.target.value);
    };

    const handleChangeDescription = event => {
        setDescription(event.target.value);
    };

    const handleChangePrice = event => {
        setPrice(event.target.value);
    };

    useEffect(() => {
        /*
        const getData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products/' + productId);
                const object = response.data;
                setProduct(object);
                setRating(Math.round(object.rating));
            } catch (err) {
                console.log(err);
            }
        }*/
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:4001/product/'+productId);
                const object = response.data;
                
                setProduct(object[0]);
                //setRating(Math.round(object.rating));
            } catch (err) {
                console.log(err);
            }
        }
        getData();
        // Setto i valori iniziali del prodotto all'interno degli input
        setTitle(product.title);
        setCategory(product.category);
        setDescription(product.description);
        setPrice(product.price);
        
    }, [product.category, product.description, product.price, product.title, productId]);

    const update = async (e) => {
        e.preventDefault();
        
        const data = new FormData(e.target);
        /*
        console.log(data.get('descrizione'));
        fetch('https://dummyjson.com/products/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: data.get('titolo'),
                category: data.get('categoria'),
                description: data.get('descrizione'),
                price: data.get('prezzo'),
            })
        })
            .then(res => res.json())
            .then(console.log);
        */
            try {
                // SVILUPPO
                const response = await axios.post('http://localhost:4001/product/create',
                // PRODUZIONE
                //const response = await axios.post('https://dashboard-backend-la3z.onrender.com/login',
                    JSON.stringify({ 
                        title: data.get('titolo'),
                        category: data.get('categoria'),
                        description: data.get('descrizione'),
                        price: data.get('prezzo'),
                     }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true 
                    }
                );
                console.log(response)
                // Se c'è un riscontro positivo
                if(response.status === 201) {
                    console.log("Status -> ", response.status);
                }
                
            } catch (err) {
                if (!err?.response) {
                    console.log(err)
                } else if (err.response?.status === 401) {
                    console.log(err, " status -> ", err.response?.status)
                }
                 else {
                    console.log("Sei nell'else finale")
                }
            }
    }


    return (
        <div className="product-wrapper p-5 rounded-3">
        
            <div className="container rounded-3">

                <div className="d-flex gap-3 mb-5">
                    <button className="btn btn-success">
                        <span className="d-inline-block align-middle">
                        <img src={salva_white} alt="modifica" width={32} height={32}></img>
                        </span>
                        <span className="ms-1 d-inline-block align-middle">Salva</span>
                    </button>
                    
                    <button className="btn btn-danger">
                        <span className="d-inline-block align-middle">
                        <img src={elimina_white} alt="modifica" width={32} height={32}></img>
                        </span>
                        <span className="ms-1 d-inline-block align-middle">Elimina</span>
                    </button>
                </div>

                

                <div className="row text-start">

                    <div className="col">
                        <img src={product.thumbnail} width={"auto"} height={"auto"} alt="thumbnail"></img>
                    </div>
                    <div className="col">
                        <form onSubmit={update}>
                            <div className  ="mb-3">
                                <label htmlFor="titolo" className="form-label">Titolo</label>
                                <input name="titolo" type="text" className="form-control" id="titolo" aria-describedby="titolo" onChange={handleChangeTitle} defaultValue={title} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoria" className="form-label">Categoria</label>
                                <input name="categoria" type="text" className="form-control" id="categoria" onChange={handleChangeCategory} defaultValue={category}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descrizione" className="form-label">Descrizione</label>
                                <textarea name="descrizione" type="text" className="form-control" id="descrizione" onChange={handleChangeDescription} defaultValue={description}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prezzo" className="form-label">Prezzo</label>
                                <input name="prezzo" type="text" className="form-control" id="prezzo" onChange={handleChangePrice} defaultValue={price}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Aggiorna</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;