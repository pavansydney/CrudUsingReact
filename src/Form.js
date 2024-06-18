function Form(){
    return (
        <div className="form-overlay">
            <form>
                <div className="form-group">
                    <label>
                        Title :
                    </label>
                    <input className="form-control mt-2" type="text" name="title" placeholder="Enter title"/>
                </div>
                <div className="form-group">
                    <label>
                        Body :
                    </label>
                    <input className="form-control mt-2" type="text" name="body" placeholder="Enter Body"/>
                </div>
                <button className="btn btn-primary float-end">Send</button>
                <button className="btn btn-danger float-end">Cancel</button>
            </form>
        </div>
    )
}

export default Form