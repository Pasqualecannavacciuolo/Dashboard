import './BaseTable.css';

import React from "react";

import { useNavigate } from "react-router-dom";

import go_arrow from "../../../utils/img/go_arrow.png";


function BaseTable({ data }) {
    const navigate = useNavigate();

    let items = [];
    items = data;

    // Vado alla pagine dell'ordine
    function handleClick(e, id) {
        e.preventDefault();
        navigate('/dashboard/order/'+id);
    }

    // Creo il table body
    function createTableBody() {
        if (window.localStorage.getItem("productsLoaded") !== "True") {
            window.localStorage.setItem("productsLoaded", "True");
            const father = document.getElementById('father');

            const rows = [];

            items.forEach(item => {
                const row = document.createElement("tr");
                row.className = "table-content align-middle";
                row.id = item.id;
                const th = document.createElement("th");
                th.scope = "row";
                th.innerHTML = item.id;
                const td_title = document.createElement("td");
                td_title.innerHTML = item.title;
                const td_category = document.createElement("td");
                td_category.innerHTML = item.category;
                const td_description = document.createElement("td");
                td_description.innerHTML = item.description;
                const td_price = document.createElement("td");
                td_price.innerHTML = item.price + "€";
                const td_link = document.createElement("td");
                const td_link_button = document.createElement("button");
                td_link_button.className = "btn";
                td_link_button.onclick = (e => handleClick(e, item.id));
                const td_link_btn_img = document.createElement("img");
                td_link_btn_img.className = "rounded-circle flex-shrink-0";
                td_link_btn_img.src = go_arrow;
                td_link_btn_img.width = 16;
                td_link_btn_img.height = 16;
                td_link_btn_img.alt = "go arrow";
                td_link_button.appendChild(td_link_btn_img);
                td_link.appendChild(td_link_button);
                // Aggiungo tutti i campi alla row principale
                row.appendChild(th);
                row.appendChild(td_title);
                row.appendChild(td_category);
                row.appendChild(td_description);
                row.appendChild(td_price);
                row.appendChild(td_link);
                // Aggiungo la row all'insieme delle row
                rows.push(row);
            });



            return (
                <>
                    {rows.forEach(row => {
                        /*const id = row.id;
                        for (const child of row.children) {
                            if(child.id === "td_link") {
                                const link_arrow = document.createElement('span');
                                link_arrow.append(<Link props={id}></Link>);
                                child.appendChild(link_arrow);
                            }
                          }*/
                        father.appendChild(row);
                    })}
                </>
            );
        }
    }


    return (
        <table className="table table-borderless custom-table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Totale</th>
                    <th scope="col">Stato</th>
                </tr>
            </thead>
            <tbody id='father'>
                {createTableBody()}
            </tbody>
        </table>
    );
}

export default BaseTable;