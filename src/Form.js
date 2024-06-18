import { useState } from "react";

function Form(props){

    const [product, setProduct] = useState(props.data);
    let changeFormData=(event)=> {
       const {name,value} = event.target; // will get the updated data
       const [setSubmitted] = useState(false)
       setProduct({...product,[name]:value}) //using spread operator will update the data 
    }
    return (
        <div className="form-overlay">
            <form>
                <div className="form-group">
                    <label>
                        Title :
                    </label>
                    <input className="form-control mt-2" type="text" name="title" value={product.title} onChange={changeFormData} placeholder="Enter title" />
                </div>
                <div className="form-group">
                    <label>
                        Body :
                    </label>
                    <input className="form-control mt-2" type="text" name="body" value={product.body} onChange={changeFormData} placeholder="Enter Body"/>
                </div>
                <button className="btn btn-primary float-end" onClick={(e) => {
                        setSubmitted(true)
                        e.preventDefault();
                        if (!!product.title && !!product.body ) {
                            props.add(product)
                        }
                    }}>Send</button>
                <button className="btn btn-danger float-end" onClick={(event) => {
                    event.preventDefault();
                    props.closeForm()
                }}>Cancel</button>
            </form>
        </div>
    )
}

export default Form