import { useParams } from 'react-router-dom';
import useFetchProducts from '../services/use-fetch-products';
import { Button, message, Select } from 'antd';
import { useState } from 'react';

export const ProductView = () => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedPower, setSelectedPower] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const { id } = useParams();
    const { products } = useFetchProducts();
    if (!products.length) return null;
    const product = products.find((product) => product.id === id)



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

    const handleColorChange = (value) => { setSelectedColor(value); };
    const handlePowerChange = (value) => { setSelectedPower(value); };
    const handleStorageChange = (value) => { setSelectedStorage(value); };

    const addToCart = () => {
        let productOption;
        if (uniqueStorageSelect) {
            productOption = product.options.find(option => option.color.includes(selectedColor) && option.storage.includes(selectedStorage));
        }
        if (uniquePowerSelect) {
            productOption = product.options.find(option => option.color.includes(selectedColor) && option.power.includes(selectedPower));
        }
        if (!productOption) {
            messageApi.open({
                type: 'error',
                content: 'This Variant is not available please choose another',
            });
        } else {
            const items = JSON.parse(localStorage.getItem('cart')) || [];
            const alreadyExistingItem = items.findIndex(item => item.product.id === product.id && item.color === selectedColor && (item.power === selectedPower || item.storage === selectedStorage));
            alreadyExistingItem !== -1 ? items[alreadyExistingItem].numbers += 1 : items.push({ color: selectedColor, power: selectedPower, product: product, storage: selectedStorage, numbers: 1 }); localStorage.setItem('cart', JSON.stringify(items));
            messageApi.open({
                type: 'success',
                content: 'Successfully added to cart',
            });
        }
    }

    return (
        <>
            <h1 style={{ color: 'red' }}>      {!product.available && <span> This item is Out of stock</span>}</h1>
            <h2>Product : {product?.name}</h2>
            <h2>{product?.price}</h2>
            <h2>{product?.brand}</h2>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: '5px' }}>Select Color:</div>
                <Select disabled={!product.available}
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
                        <div style={{ margin: '5px' }}>Select Power:</div>
                        <Select onChange={handlePowerChange}
                            disabled={!product.available}
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
                        <div style={{ margin: '5px' }}> select Storage: </div>
                        <Select onChange={handleStorageChange}
                            disabled={!product.available}
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
                <div style={{ marginLeft: '50px' }}>
                    <Button variant='solid' disabled={!product.available} onClick={addToCart}>Add to Cart</Button>
                </div>
            </div>
            {contextHolder}
        </>
    );
}

