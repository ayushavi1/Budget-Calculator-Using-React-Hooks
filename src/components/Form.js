import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';

const Form = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='charge'>charge</label>
          <input
            type='text'
            className='form-control'
            id='charge'
            name='charge'
            placeholder='eg. Rent'
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            className='form-control'
            id='amount'
            name='amount'
            placeholder='eg. 10000'
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type='submit' className='btn'>
        {edit ? 'Edit' : 'Submit'}
        <AiOutlineSend className='btn-icon' />
      </button>
    </form>
  );
};

export default Form;
