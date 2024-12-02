import React from "react";



const CheckOutView = () => {

    const items = JSON.parse(localStorage.getItem('cart')) || [];

    console.log(items);


    return (
        <>
            {items.length > 0 ? (
                <div>
                    {items.map((item, index) => (
                        <div key={index}>  {item.product.name}-{item.color}-{item.power || item.storage} {item.numbers} </div>

                    ))}
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}

        </>
    );
};

export default CheckOutView;