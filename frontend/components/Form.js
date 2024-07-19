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

const pizzaSizes = [
  { name: 'S', text: 'small' },
  { name: 'M', text: 'medium' },
  { name: 'L', text: 'large' }
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
    .string().trim()
    .required(validationErrors.fullNameTooShort)
    .min(3,validationErrors.fullNameTooShort)
    .max(20,validationErrors.fullNameTooLong),

  size: Yup
    .string()
    .required()
    .oneOf(['S','M','L'],validationErrors.sizeIncorrect),
});
 
const initialValues={fullName:'',size:'',checkboxes:[false,false,false,false,false]}
const initialErrors={fullName:'',size:''}

export default function Form() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState(initialErrors)
  const [success, setSuccess] = useState('')
  const [submitEnabled, setSubmitEnabled] = useState(false)

  useEffect(() => {
    schema.isValid(values).then((isValid) => {
      setSubmitEnabled(isValid)
    });
  }, [values]);

  const changeHandler=(evt)=>{
    let { type, checked, name, val } = evt.target;
    if(type==="checkbox"){
      name=evt.target.name
      let newArr =[...values.checkboxes]
      newArr[name-1]=checked
      val=newArr
      setValues({...values, checkboxes:val})
    }else{
      name=evt.target.id
      val=evt.target.value
      setValues({...values, [name]:val})
    }
    
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

  const submitHandler=(evt)=>{
    evt.preventDefault()
    let toppingCount =0
    values.checkboxes.forEach(val=>{if(val) toppingCount++})
    if(toppingCount===0){
      toppingCount='no toppings'
    }else if(toppingCount===1){
      toppingCount+=' topping'
    }else{
      toppingCount+=' toppings'
    }
    let pizzaSize=pizzaSizes.filter(obj=>obj.name===values.size)[0].text
    let successMessage = `Thank you for your order, ${values.fullName}! Your ${pizzaSize} pizza with ${toppingCount} is on the way.`
    setSuccess(successMessage)
    setValues(initialValues)
    setSubmitEnabled(false)
  }


  return (
    <form>
      <h2>Order Your Pizza</h2>
      {success  && <div className='success'>{success}</div>}
      {/* {errors.fullName && <div className='failure'>{errors.fullName}</div>} */}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input onChange={changeHandler} placeholder="Type full name" id="fullName" name="fullName" type="text" value={values.fullName} />
        </div>
        {errors.fullName && <div className='error'>{errors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select onChange={changeHandler} id="size" name="size" value={values.size}>
            <option value=''>----Choose Size----</option>
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
              checked={values.checkboxes[topping.topping_id-1]}
            />
            {topping.text}<br />
          </label>
        })}
        
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input onClick={submitHandler} disabled={!submitEnabled} type="submit" />
    </form>
    
  )
  
}
