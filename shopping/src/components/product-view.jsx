import { useParams } from 'react-router-dom';
import useFetchProducts from '../services/use-fetch-products';
import { Button, message, Select } from 'antd';
import { useState } from 'react';

export const ProductView = () => {
    const [disable, setDisable] = useState(false); // default is 'middle'
    const [selectedColor, setSelectedColor] = useState(null); // default is 'middle'
    const [selectedPower, setSelectedPower] = useState(null); // default is 'middle'
    const [messageApi, contextHolder] = message.useMessage();

    const { id } = useParams();
    const { products } = useFetchProducts();
    if (!products.length) return null;
    const product = products.find((product) => product.id == id)



    const colorsSelect = product.options.reduce((acc, option) => {
        if (Array.isArray(option.color)) {
            return [...acc, ...option.color.map(color => ({ value: color, label: color, disabled: option.quantity === 0 }))];
        } else {
            return [...acc, { value: option.color, label: option.color, disabled: option.quantity === 0 }];
        }
    }, []);


    const powerSelect = product.options.reduce((acc, option) => {
        if (Array.isArray(option.power)) {
            return [...acc, ...option.power.map(power => ({ value: power, label: power }))];
        } else if (option.power) {
            return [...acc, { value: option.power, label: option.power }];
        }
    }, [])
    const uniquePowerSelect = powerSelect && powerSelect.filter((option, index, self) =>
        index === self.findIndex((t) => t.value === option.value)
    );
    const storageSelect = product.options.reduce((acc, option) => {
        if (Array.isArray(option.storage)) {
            return [...acc, ...option.storage.map(storage => ({ value: storage, label: storage }))];
        } else if (option.storage) {
            return [...acc, { value: option.storage, label: option.storage }];
        }
    }, [])
    const uniqueStorageSelect = storageSelect && storageSelect.filter((option, index, self) =>
        index === self.findIndex((t) => t.value === option.value)
    );
    const handleColorChange = (value) => {
        setSelectedColor(value);


    };
    const handlePowerChange = (value) => {
        setSelectedPower(value);
    };

    const addToCart = () => {
        console.log(product);
        let productOption;
        if (uniqueStorageSelect) {
            productOption = product.options.find(option => option.color.includes(selectedColor) && option.storage.includes(selectedPower));

        }
        if (uniquePowerSelect) {
            productOption = product.options.find(option => option.color.includes(selectedColor) && option.power.includes(selectedPower));
        }
        console.log(productOption);

        if (!productOption) {
            messageApi.open({
                type: 'error',
                content: 'This is an error message',
            });
        } else {
            messageApi.open({
                type: 'success',
                content: 'This is a happy message',
            });
        }
    }
    return (
        <>
            <h1>Product : {product?.name}</h1>
            <h2>{product?.price}</h2>
            <h2>{product?.brand}</h2>

            <div style={{ display: 'flex' }}>
                Select Color:
                <Select disabled={!product.available || disable}
                    onChange={handleColorChange}
                    defaultValue=""
                    style={{
                        width: 120,
                    }}
                    allowClear
                    options={colorsSelect}
                    placeholder="select Color"
                />
                {powerSelect && (
                    <>
                        select Power:
                        <Select onChange={handlePowerChange}
                            disabled={!product.available || disable}
                            defaultValue=""
                            style={{
                                width: 120,
                            }}
                            allowClear
                            options={uniquePowerSelect}
                            placeholder="select Power"
                        />
                    </>
                )}
                {storageSelect && (
                    <>
                        select Storage:
                        <Select onChange={handlePowerChange}
                            disabled={!product.available || disable}
                            defaultValue=""
                            style={{
                                width: 120,
                            }}
                            allowClear
                            options={uniqueStorageSelect}
                            placeholder="select Power"
                        />
                    </>
                )}
            </div>
            {contextHolder}

            <Button variant='solid' disabled={!product.available} style={{ marginTop: '10px' }} onClick={addToCart}>Add to Cart</Button>
            {!product.available && <span>Out of stock</span>}
        </>
    );
}

