import React, { useState } from "react";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button } from "antd";


const CheckOutView = () => {
    let items = JSON.parse(localStorage.getItem('cart')) || [];
   const  [cartProducts, setCartProducts] = useState(items);


    const changeNumberOfItems = (action, clickedItem) => {
        return () => {
            const item = cartProducts.find(item => item.product.id === clickedItem.product.id && item.color === clickedItem.color && (item.power === clickedItem.power || item.storage === clickedItem.storage));
            if (item) {
                if (action === 'plus') item.numbers += 1
                else item.numbers -= 1;
                if (item.numbers === 0) {
                    const index = items.findIndex(item => item.numbers === 0);
                    cartProducts.splice(index, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cartProducts));
                setCartProducts(cartProducts);
            }
        }
    }

    return (
        <>
            {cartProducts.length > 0 ? (
                <div>
                    {cartProducts.map((item, index) => (
                        item.numbers > 0 && (
                            <div key={index} style={{
                                display: 'flex', flexFlow: 'row', gap: '10px', margin: '20px', border: '1px solid black', padding: '10px', borderRadius: '5px', fontSize: '20px'
                            }}>
                                <div>   {item.product.name}</div>
                                <div>{item.color}</div>
                                <div>{item.power || item.storage} </div>
                                <Button size="small"
                                    icon={<MinusOutlined style={{ fontSize: '15px' }} />}
                                    onClick={changeNumberOfItems('minus', item)}>
                                </Button>
                                <div> {item.numbers} </div>
                                <Button size="small"
                                    icon={<PlusOutlined style={{ fontSize: '15px' }} />}
                                    onClick={changeNumberOfItems('plus', item)}>
                                </Button>
                            </div>
                        )
                    ))}
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </>
    );
};

export default CheckOutView;