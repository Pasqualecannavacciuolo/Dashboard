import React from "react";

import go_arrow from "../../../utils/img/go_arrow.png";
import { Link } from "react-router-dom";

function SimpleTable({ data }) {

    let items = [];
    items = data;
    
    items = items.slice(0,items.length/2);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                <tr key = { item.id }>
                    <th scope="row">{item.id}</th>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                        <Link to={`order/${item.id}`}>
                            <button className="btn">
                                <img src={go_arrow} alt="go arrow" width="16" height="16" className="rounded-circle flex-shrink-0"></img>
                            </button>
                        </Link>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SimpleTable;