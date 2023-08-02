import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const EmployeeCreate = () => {

  const [full_name, changeFullName] = useState("");
  const [email, changeMailAdress] = useState("");
  const [number, changeNumber] = useState("");
  const [shortcode, changeShortCode] = useState("");
  const [validation, changeValidation] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = ({full_name, email, number, shortcode})

    fetch("http://localhost:5000/employees", {
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(employeeData)
    }).then((res) => {
      alert("Kayıt başarılı.")
      navigate('/');
    }).catch((err) => {
      console.log(err.message)
    })
  }

  return(
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-title">
                <h2>Yeni Kişi Oluştur</h2>
              </div>
              <div className="card-body">
                <div className="row flex">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="fullName">İsim Soyisim:</label>
                        <input name="full_name" value={full_name} onMouseDown={e => changeValidation(true)} onChange={e => changeFullName(e.target.value)} type="text" className="form-control" required></input>
                        {full_name.length === 0 && validation && <span className="text-danger">İsim soyisim giriniz.</span>}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <input name="email" value={email} onChange={e => changeMailAdress(e.target.value)}type="email" className="form-control" required></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="number">Dahili Numara:</label>
                        <input name="number" value={number} onChange={e => changeNumber(e.target.value)} type="number" className="form-control" required></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="shortcode">Kısa Kod:</label>
                        <input name="shortcode" value={shortcode} onChange={e => changeShortCode(e.target.value)} type="number" className="form-control" required></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                      <Link to="/"><button className="btn btn-secondary">Geri Dön</button></Link>
                        <button className="btn btn-success" type="submit">Kaydet</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCreate