import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = () => {

  const[new_collection, setNew_Collection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/newCollections')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setNew_Collection(data))
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className="collections">
        {new_collection.map((item, i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}/>
        })}
      </div>
    </div>
  )
}

export default NewCollections
