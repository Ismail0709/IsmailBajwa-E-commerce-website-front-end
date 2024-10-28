import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';

import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState(''); // State to manage the sorting option
  const [itemsToShow, setItemsToShow] = useState(12); // State to control items displayed

  // Function to handle sorting based on the selected option
  const sortedProducts = [...all_product]
    .filter(item => props.category === item.category) // Only show items matching the category
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.new_price - b.new_price;
      if (sortOption === 'price-desc') return b.new_price - a.new_price;
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
      return 0; // Default no sorting
    });

  // Function to handle loading more items
  const loadMoreItems = () => {
    setItemsToShow(prevCount => prevCount + 12); // Increase count by 12 (or desired number)
  };

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopCategory-indexSort">
        <p>
          <span>Showing {Math.min(itemsToShow, sortedProducts.length)}</span> 
          out of {sortedProducts.length} products
        </p>
        <div className="shopCategory-sort">
          <label>Sort by </label>
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-dropdown"
          >
            <option value=""></option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.slice(0, itemsToShow).map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      {itemsToShow < sortedProducts.length && (
        <div className="shopcategory-loadmore" onClick={loadMoreItems}>
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;


//import dropdown_icon from '../Components/Assets/dropdown_icon.png';