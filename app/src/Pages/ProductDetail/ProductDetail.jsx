import "./ProductDetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from 'axios';

import lzString from 'lz-string';

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
    const [image, setImage] = useState('');

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
        const prefix = "data:image/"+product.img_ext+";base64,";
        const decodedBase64 = lzString.decompressFromBase64(product.img)
        setImage(prefix+decodedBase64);
        
    }, [product.category, product.description, product.img, product.img_ext, product.price, product.title, productId]);

    const update = async (e) => {
        e.preventDefault();
        
        const data = new FormData(e.target);
        console.log(data)
            try {
                // SVILUPPO
                const response = await axios.put('http://localhost:4001/product/'+productId,
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
        
            <div className="container rounded-3 m-5 p-5">
                <h1 className="text-start display-1 mt-3 mb-3 fw-semibold">Dettagli del prodotto</h1>
                <div className="row text-start">

                    <div className="col">
                        <img className="rounded-3" src={image} width={"500"} height={"400"} alt="thumbnail"></img>
                    </div>
                    <div className="col">
                        <form onSubmit={update}>
                            <div className  ="mb-3">
                                <label htmlFor="titolo" className="form-label fw-semibold">Titolo</label>
                                <input name="titolo" type="text" className="form-control" id="titolo" aria-describedby="titolo" onChange={handleChangeTitle} defaultValue={title} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoria" className="form-label fw-semibold">Categoria</label>
                                <input name="categoria" type="text" className="form-control" id="categoria" onChange={handleChangeCategory} defaultValue={category}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descrizione" className="form-label fw-semibold">Descrizione</label>
                                <textarea name="descrizione" type="text" className="form-control" id="descrizione" onChange={handleChangeDescription} defaultValue={description}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prezzo" className="form-label fw-semibold">Prezzo</label>
                                <input name="prezzo" type="text" className="form-control" id="prezzo" onChange={handleChangePrice} defaultValue={price}/>
                            </div>
                            <button type="submit" className="btn button-primary">Aggiorna</button>
                        </form>
                        
                    </div>
                </div>
            </div>
    );
}

export default ProductDetail;