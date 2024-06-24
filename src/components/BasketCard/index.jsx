
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { incrementProductCount, decrementProductCount, removeFromBasket } from '../../redux/basketReducer';
// import styles from './BasketCard.module.css';
// import { baseUrl } from '../../instance';
// import { ReactComponent as CloseIcon } from '../../media/icons/x-burgermenu-dark.svg';
// import ButtonCounter from '../UI/ButtonCounter';
// import { formatPrice } from '../../utils';
// const BasketCard = ({ product }) => {
//   const dispatch = useDispatch();

//   const handleIncrement = () => {
//     dispatch(incrementProductCount(product.id));
//   };

//   const handleDecrement = () => {
//     dispatch(decrementProductCount(product.id));
//   };

//   const handleRemove = () => {
//     dispatch(removeFromBasket(product.id));
//   };

 

//   const totalPrice = product.discont_price ? product.discont_price * product.count : product.price * product.count;

//   return (
//     <div className={styles.basket_card}>
//       <button className={styles.remove_button} onClick={handleRemove}>
//         <CloseIcon className={styles.remove_button_x} />
//       </button>
//       <img
//         src={`${baseUrl}${product.image}`}
//         alt={product.title}
//         className={styles.product_image}
//       />
//       <div className={styles.product_details}>
//         <div className={styles.title_and_close}>
//           <h5 title={product.title}>{product.title}</h5>
//         </div>
//         <div className={styles.count_wrapper}>
//           <div className={styles.controls_and_cart}>
//             <ButtonCounter
//               productCount={product.count ?? 0}
//               handleIncrement={handleIncrement}
//               handleDecrement={handleDecrement}
//             />
//           </div>
//           <div className={styles.price_container}>
//             {product.discont_price ? (
//               <>
//                 <div className={styles.product_price}>
//                   ${formatPrice(product.discont_price)}
//                 </div>
//                 <div className={styles.original_price}>
//                   ${formatPrice(product.price)}
//                 </div>
//               </>
//             ) : (
//               <div className={styles.product_price}>
//                 ${formatPrice(totalPrice)}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasketCard;


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementProductCount, decrementProductCount, removeFromBasket } from '../../redux/basketReducer';
import styles from './BasketCard.module.css';
import { baseUrl } from '../../instance';
import { ReactComponent as CloseIcon } from '../../media/icons/x-burgermenu-dark.svg';
import ButtonCounter from '../UI/ButtonCounter';
import { formatPrice } from '../../utils';

const BasketCard = ({ product }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const { id, image, title, discont_price, price, count } = product;

  const handleIncrement = () => {
    dispatch(incrementProductCount(id));
  };

  const handleDecrement = () => {
    dispatch(decrementProductCount(id));
  };

  const handleRemove = () => {
    dispatch(removeFromBasket(id));
  };

  const totalPrice = (discont_price ?? price) * (count ?? 0);

  return (
    <div className={`${styles.basket_card} ${darkMode ? styles.dark : ''}`}>
      <button className={styles.remove_button} onClick={handleRemove} aria-label="Remove item">
        <CloseIcon className={styles.remove_button_x} />
      </button>
      <img
        src={`${baseUrl}${image}`}
        alt={title}
        className={styles.product_image}
      />
      <div className={styles.product_details}>
        <div className={styles.title_and_close}>
          <h5 title={title}>{title}</h5>
        </div>
        <div className={styles.count_wrapper}>
          <div className={styles.controls_and_cart}>
            <ButtonCounter
              productCount={count ?? 0}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </div>
          <div className={styles.price_container}>
            {discont_price ? (
              <>
                <div className={styles.product_price}>
                  ${formatPrice(discont_price)}
                </div>
                <div className={styles.original_price}>
                  ${formatPrice(price)}
                </div>
              </>
            ) : (
              <div className={styles.product_price}>
                ${formatPrice(totalPrice)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
