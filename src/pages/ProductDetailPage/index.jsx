

import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductDetail from '../../components/ProductDetail';
import ButtonSection from '../../components/UI/ButtonSection';
import s from './ProductDetailPage.module.css';
const ProductDetailPage = ({ favorites, setFavorites }) => {
  const { categoryId, productId } = useParams();
  const product = useSelector((state) => state.products.product);

  return (
    <div className="container">
        <div className={s.button_wrapper}>
      <ButtonSection text="Main Page" to="/" />
      <ButtonSection text="Categories" to="/categories" />
      <ButtonSection text="Tools and equipment" to="/products" />
      {categoryId && <ButtonSection text="Category" to={`/category/${categoryId}`} />}
      {product && <ButtonSection text={` ${product.title}`} to={`/product/${productId}`} />}
      </div>
      
      <ProductDetail favorites={favorites} setFavorites={setFavorites}/>
      
    </div>
  );
};

export default ProductDetailPage;