import React, {useState} from "react";
import axios from "axios";
const ProductCreate = () => {

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

    const addProduct = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
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


    return(
        <>
            <form onSubmit={addProduct}>
                <div className="mb-3">
                    <label htmlFor="titolo" className="form-label">Titolo</label>
                    <input name="titolo" type="text" className="form-control" id="titolo" aria-describedby="titolo" onChange={handleChangeTitle} />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Categoria</label>
                    <input name="categoria" type="text" className="form-control" id="categoria" onChange={handleChangeCategory} />
                </div>
                <div className="mb-3">
                    <label htmlFor="descrizione" className="form-label">Descrizione</label>
                    <textarea name="descrizione" type="text" className="form-control" id="descrizione" onChange={handleChangeDescription} />
                </div>
                <div className="mb-3">
                    <label htmlFor="prezzo" className="form-label">Prezzo</label>
                    <input name="prezzo" type="text" className="form-control" id="prezzo" onChange={handleChangePrice} />
                </div>
                <button type="submit" className="btn btn-primary">Aggiorna</button>
            </form>
        </>
    );
}

export default ProductCreate;