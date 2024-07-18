import React, { useEffect, useState } from 'react'
import * as Yup from "yup";



// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
// const schema = Yup.object().shape({
//   // 'name' is expected to be a string, mandatory, and accompanied by a warning message if absent
//   name: Yup.string()
//     .required("fullName is required")
//     .min(3,validationErrors.fullNameTooShort)
//     .max(20,validationErrors.fullNameTooLong),

//   // Similarly, 'email' is also expected to be a string conforming to an email pattern, and it's mandatory
//   size: Yup.string()
//     .required("size is required")
//     .oneOf(['S','M','L'],validationErrors.sizeIncorrect),

//   // 'age' is validated against a minimum value and includes a corresponding warning message
//   age: Yup.number()
//     .min(18, "Must be at least 18 years old")
//     .required("Age is required"),
// });

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

export default function Form() {
  return (
    <form>
      <h2>Order Your Pizza</h2>
      {true && <div className='success'>Thank you for your order!</div>}
      {true && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" />
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size">
            <option value="">----Choose Size----</option>
            {/* Fill out the missing options */}
          </select>
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        {toppings.map(topping=>{
          return <label key={topping.topping_id}>
            <input
              name={topping.text}
              type="checkbox"
            />
            {topping.text}<br />
          </label>
        })}
        
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" />
    </form>
  )
}
