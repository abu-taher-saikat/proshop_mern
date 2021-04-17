import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listTopProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const ProductCarousel = () => {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const {products, loading, error} = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch])


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
            <Carousel pause="hover" className="bg-dark">
                {products.map(product => (
                    <Carousel.Item className='text-center' key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image style={{fontSize : "3rem"}} src={product.image} alt={product.name} fluid></Image>
                            <Carousel.Caption className='carousel-caption'>
                                <h4 className="pb-2 text-white">{product.name} (${product.price})</h4>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}

export default ProductCarousel
