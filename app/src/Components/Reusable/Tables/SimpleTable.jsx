import './SimpleTable.css';

import React from "react";

import { useNavigate } from "react-router-dom";

import go_arrow from "../../../utils/img/go_arrow.png";


function SimpleTable({ data }) {
    const navigate = useNavigate();

    const shippedStatus = ["ricevuto", "pagato", "spedito", "consegnato"];

    function getRandomItem(arr) {
        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);
        // get random item
        const item = arr[randomIndex];
        return item;
    }

    let items = [];
    items = data;
    
    items = items.slice(0,items.length/2);

    function setShippedStatus() {
        const status = getRandomItem(shippedStatus);
         
        const element = document.createElement("span");
        
        // eslint-disable-next-line default-case
        switch(status){
            case "ricevuto": 
                element.className = "w-100 badge text-bg-secondary";
                element.innerHTML = status;
                break;
            case "pagato": 
                element.className = "w-100 badge text-bg-primary";
                element.innerHTML = status;
                break;
            case "spedito": 
                element.className = "w-100 badge text-bg-warning";
                element.innerHTML = status;
                break;
            case "consegnato": 
                element.className = "w-100 badge text-bg-success";
                element.innerHTML = status;
                break;
        }

        return element;
    }

    function handleClick(e, id) {
        e.preventDefault();
        navigate('/dashboard/order/'+id);
    }

    function createTableBody() {

        const father = document.getElementById('father')

        const rows = [];

        items.forEach(item => {
            const row = document.createElement("tr");
            row.className = "table-content align-middle";
            row.id = item.id;
            const th = document.createElement("th");
            th.scope = "row";
            th.innerHTML = item.id;
            const td_totalProducts = document.createElement("td");
            td_totalProducts.innerHTML = item.totalProducts;
            const td_total = document.createElement("td");
            td_total.innerHTML = item.total;
            const td_userId = document.createElement("td");
            td_userId.innerHTML = item.userId;
            const td_status = document.createElement("td");
            const element = setShippedStatus();
            td_status.appendChild(element);
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
            row.appendChild(td_totalProducts);
            row.appendChild(td_total);
            row.appendChild(td_userId);
            row.appendChild(td_status);
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


    return (
        <table className="table table-borderless custom-table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Totale</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Stato</th>
                </tr>
            </thead>
            <tbody id='father'>
                {createTableBody()}
            </tbody>
        </table>
    );
}

export default SimpleTable;