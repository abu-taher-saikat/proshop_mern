import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';


const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const {loading, error, products, page , pages} = productList;


    useEffect(()=>{ 
        dispatch(listProducts(keyword, pageNumber))
    },[dispatch, keyword, pageNumber])


    return (
        <>
            <Meta></Meta>
            
            {!keyword ? <ProductCarousel></ProductCarousel>  : <Link to='/' className='btn btn-light'>Go Back</Link> }
            <h1>Latest Products</h1>
            {loading ? (
                <Loader/> 
                ) : error ? ( 
                <Message varient='danger'>{error}</Message>
                ) : ( 
                    <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}></Product>
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate>
                    </>
                    
                     )}

        </>
    )
}


export default HomeScreen
