import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../dataProvider/DataProvider'
import Colors from '../colors/Colors'
import Sizes from '../sizes/Sizes'
import { useNavigate } from 'react-router-dom'
import { goToPayment } from '../../routes/Coordinator';

export default function Cart() {
    const value = useContext(DataContext)
    const [cart, setCart] = value.cart;
    const [total, setTotal] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        const getTotal = () => {
            const result = cart.reduce((prev, item) => {
                return prev + (item.price * item.count)
            }, 0)
            setTotal(result)
        }
        getTotal()
    }, [cart])

    const reduction = id => {
        cart.forEach(item => {
            if (item._id === id) {
                item.count === 1 ? item.count = 1 : item.count -= 1;
            }
        })
        setCart([...cart])
    }

    const increase = id => {
        cart.forEach(item => {
            if (item._id === id) {
                item.count += 1;
            }
        })
        setCart([...cart])
    }

    const removeProduct = id => {
        if (window.confirm("Você quer deletar este item?")) {
            const updatedCart = cart.filter(item => item._id !== id)
            // localStorage.removeItem('cart')
            setCart(updatedCart)
        }
    }

    // useEffect(() => {
    //     if (cart.length > 0) {
    //         const stringCart = JSON.stringify(cart)
    //         window.localStorage.setItem("cartItem", stringCart)
    //     }
    // }, [cart])


    // useEffect(() => {
    //     const newCart = window.localStorage.getItem("cartItem")
    //     if (newCart !== 0 && cart.length === 0) {
    //         const newCartRefresh = JSON.parse(newCart)
    //         setCart(newCartRefresh)
    //     }
    // }, [setCart])

    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "3rem", height: "15vh" }}>Carrinho vazio!</h2>

    return (
        <>
            {
                cart.map(product => (
                    <div className="details cart" key={product._id}>
                        <div className="img-container"
                            style={{ backgroundImage: `url(${product.image})` }} />
                        <div className="box-details">
                            <h2 title={product.title}>{product.title}</h2>
                            <h3>${product.price}</h3>
                            <Colors colors={product.colors} />
                            <Sizes sizes={product.sizes} />
                            <p>{product.description}</p>
                            <p>{product.content}</p>
                            <div className="amount">
                                <button className="count" onClick={() => reduction(product._id)}> - </button>
                                <span>{product.count}</span>
                                <button className="count" onClick={() => increase(product._id)}> + </button>
                            </div>
                            <div className="delete" onClick={() => removeProduct(product._id)}>X</div>
                        </div>
                    </div>
                ))
            }
            <div className="closin-ask">
                <div className="total">
                    <h3>Total: R$ {total}</h3>
                </div>
                <div>
                    <button className='payment-button' onClick={() => goToPayment(navigate)}>Pagamento</button>
                </div>
            </div>
        </>
    )
}