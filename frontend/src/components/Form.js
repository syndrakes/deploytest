import React from "react";

const FormElement = ({handleSubmit, name, setName}) => {
  <form onSubmit={handleSubmit}>
    <div className="form-group">
    <input class="form-control" value={name} type="text" autoFocus required placeholder="Default input"/>


    <button type="button" class="btn btn-primary">Submit</button>
    <button type="button" class="btn btn-danger" onClick={() => setName("")}>Cancel</button>
    </div>
  </form>
}

export default FormElement