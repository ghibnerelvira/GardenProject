
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, incrementProductCount, decrementProductCount, addToFavorites, removeFromFavorites } from '../../redux/actions/productsActions';
import styles from './ProductDetail.module.css';
import ButtonAddToCard from '../UI/ButtonAddToCard';
import { baseUrl } from '../../instance';
import Favorite from '../Header/Favorite';
import { addToBasket } from '../../redux/basketReducer';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error, favorites = [] } = useSelector((state) => state.products);
  const basket = useSelector((state) => state.basket.basket); // Получаем состояние корзины из Redux
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // Новое состояние для отслеживания добавления в корзину
  const [productCount, setProductCount] = useState(1); // Новое состояние для количества продукта

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (Array.isArray(favorites)) {
      setIsFavorite(favorites.some(fav => fav.id === product?.id));
    }
  }, [favorites, product]);

  useEffect(() => {
    // Проверяем, если товар уже в корзине при загрузке компонента
    if (product && basket.some(item => item.id === product.id)) {
      setIsAdded(true);
    }
  }, [product, basket]);

  const handleIncrement = () => {
    setProductCount(productCount + 1);
    dispatch(incrementProductCount());
  };

  const handleDecrement = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
      dispatch(decrementProductCount());
    }
  };

  const handleAddToFavorites = () => {
    if (!isFavorite) {
      dispatch(addToFavorites(product));
    } else {
      dispatch(removeFromFavorites(product));
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToBasket = () => {
    dispatch(addToBasket({ ...product, count: productCount }));
    setIsAdded(true); // Обновляем состояние для изменения кнопки
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  let discount = null;
  if (product.price && product.discont_price) {
    discount = Math.round(((product.price - product.discont_price) / product.price) * 100);
  }

  const totalPrice = product.discont_price ? product.discont_price * productCount : product.price * productCount;

  return (
    <div className={styles.product_detail}>
      <img
        src={`${baseUrl}${product.image}`}
        alt={product.title}
        className={styles.category_img}
      />
      <div className={styles.product_detail_content}>
        <div className={styles.title_favorite_wrapper}>
          <h4>{product.title}</h4>
          <Favorite
            isDarkMode={false}
            onClick={handleAddToFavorites}
            isFavorite={isFavorite}
          />
        </div>
        <div className={styles.product_price}>
          ${totalPrice.toFixed(2)}
          {product.discont_price && (
            <span className={styles.discont_price}>
              ${product.discont_price.toFixed(2)}
            </span>
          )}
          {discount !== null && (
            <div className={styles.discont_tag}>{`-${discount}%`}</div>
          )}
        </div>
        <div className={styles.controls_and_cart}>
          <div className={styles.count_controls}>
            <button onClick={handleDecrement}>-</button>
            <span>{productCount}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
          <ButtonAddToCard 
            text={isAdded ? "Added" : "Add to Cart"} 
            onClick={handleAddToBasket} 
            color={isAdded ? "black" : undefined} 
            backgroundColor={isAdded ? "white" : undefined} 
            borderColor={isAdded ? "var(--green)" : undefined} 
          /> 
        </div>
        <div className={styles.description_wrapper}>
          <h5>Description</h5>
          <p>{product.description}</p>
          <Link to={`/product/${product.id}`}>Read more</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
