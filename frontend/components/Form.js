import React, { useEffect, useState } from 'react'
import * as Yup from "yup";

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]






// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}


// 👇 Here you will create your schema.
const schema = Yup.object().shape({
  fullName: Yup
    .string()
    .required(validationErrors.fullNameTooShort)
    .min(3,validationErrors.fullNameTooShort)
    .max(20,validationErrors.fullNameTooLong),

  size: Yup
    .string()
    .required()
    .oneOf(['S','M','L'],validationErrors.sizeIncorrect),
});
 





const initialValues={fullName:'',size:''}
const initialErrors={fullName:'',size:''}


export default function Form() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState(initialErrors)
  const [submitEnabled, setSubmitEnabled] = useState(false)


  useEffect(() => {
    schema.isValid(values).then((isValid) => {
      setSubmitEnabled(isValid)
    });
  }, [values]);

  const changeHandler=(evt)=>{
    let name
    let val
    if(evt.target.type==="checkbox"){
      name=evt.target.name
      val=evt.target.checked
    }else{
      name=evt.target.id
      val=evt.target.value
    }
    setValues({...values, [name]:val})
    
    Yup
      .reach(schema,name)
      .validate(val)
      .then(()=>{
        setErrors({...errors,[name]:''})
      })
      .catch((err)=>{
        setErrors({...errors,[name]:err.errors[0]})
      })
  }

  return (
    <form>
      <h2>Order Your Pizza</h2>
      {true && <div className='success'>Thank you for your order!</div>}
      {true && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input onChange={changeHandler} placeholder="Type full name" id="fullName" name="fullName" type="text" />
        </div>
        {errors.fullName && <div className='error'>{errors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select onChange={changeHandler} id="size" name="size">
            <option value>----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {errors.size && <div className='error'>{errors.size}</div>}
      </div>

      <div className="input-group">
        {toppings.map(topping=>{
          return <label key={topping.topping_id}>
            <input
              onChange={changeHandler}
              name={topping.topping_id}
              type="checkbox"
            />
            {topping.text}<br />
          </label>
        })}
        
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input disabled={!submitEnabled} type="submit" />
    </form>
    
  )
  
}
