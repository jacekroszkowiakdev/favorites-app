import React from "react";
import "./ProductDetails.styles.css";
import { Product } from "../../model/model";

export const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div className="product-card" key={product.id}>
            <div className="product-image-container">
                <img
                    className="product-image"
                    src={`../../public/images/${product.model}.jpg`}
                    alt={`image of ${product.manufacturer} ${product.model}`}
                />
            </div>
            <div className="product-card-content">
                <h2>{product.manufacturer}</h2>
                <p>
                    {product.model} ({product.year})
                </p>
                <br />
                <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt, voluptatum laudantium modi ad provident ut veniam
                    minima necessitatibus. In non nostrum magni voluptatum
                    facilis impedit nesciunt, architecto ex dicta minus!
                </span>
            </div>
        </div>
    );
};
