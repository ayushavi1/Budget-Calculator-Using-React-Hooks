import React from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

export const Item = ({ expense, handleEdit, handleDelete }) => {
  const { id, charge, amount } = expense;
  return (
    <li className='item'>
      <div className='info'>
        <span className='expense'>{charge}</span>
        <span className='amount'>₹{amount}</span>
      </div>
      <div>
        <button
          className='edit-btn'
          aria-label='edit button'
          onClick={() => handleEdit(id)}
        >
          <AiFillEdit />
        </button>
        <button
          className='clear-btn'
          aria-label='delete button'
          onClick={() => handleDelete(id)}
        >
          <AiFillDelete />
        </button>
      </div>
    </li>
  );
};

export default Item;
