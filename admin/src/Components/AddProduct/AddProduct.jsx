import React from 'react'
import './AddProduct.css'
import Uplode_area from '../../assets/upload_area.svg'
import { useState } from 'react'

const AddProduct = () => {
    const [image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHeadler = (e) => {
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
    
        let formData = new FormData();
        formData.append('product', image);
    
        await fetch('http://localhost:4000/upload', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        })
          .then((resp) => resp.json())
          .then(async (data) => {
            responseData = data;
            if (responseData.success) {
              productDetails.image = responseData.image_url;
              console.log(productDetails);
              await fetch('http://localhost:4000/addproduct',{
                method:"POST",
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(productDetails),
              }).then((resp) => resp.json()).then((data) => {
                data.success?alert("Product Added"):alert("Failed")
              })
            }
          });
      };
    
  return (
    <div className='addproduct'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHeadler} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHeadler} type="text" name='old_price' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHeadler} type="text" name='new_price' placeholder='Type here'/>
            </div>
        </div>
        <div className='addproduct-itemfield'>
            <p> Product Category</p>
            <select value={productDetails.category} onChange={changeHeadler} name="category" className='add-product-selecter'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):Uplode_area} alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={() => {Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct