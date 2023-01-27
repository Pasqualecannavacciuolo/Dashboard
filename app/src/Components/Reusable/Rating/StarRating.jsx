import React, { Component, useEffect } from "react";
import star_icon from "../../../utils/img/star.png";

class StarRating extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            rating: props.rating,
            cont: 0
        }
    }
    componentDidMount() {
        this.renderStars();
    }
    renderStars = () => {
        const rating_block = document.getElementById("rating-block");
        for (let index = 0; index < this.state.rating; index++) {
            const star_element = document.createElement("img");
            star_element.id = index;
            star_element.src = star_icon;
            star_element.width = 28;
            star_element.height = 28;
            rating_block.appendChild(star_element);
        }
        return(
            <span id="rating-block"></span>
        );
    }
    
    render() {
        return (
            <>
                <span id="father">{this.renderStars()}</span>
            </>
        );
    }
}

export default StarRating;