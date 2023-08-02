import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmployeeEdit = () => {
  const [full_name, changeFullName] = useState("");
  const [email, changeMailAdress] = useState("");
  const [number, changeNumber] = useState("");
  const [shortcode, changeShortCode] = useState("");
  const { employeeID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/employees/" + employeeID)
    .then((res) => {
      console.log(res)
      if(!res.ok) {
        throw new Error("Network response was not ok.")
      }
      return res.json();
    })
    .then((res) => {
      changeFullName(res.full_name);
      changeMailAdress(res.email);
      changeNumber(res.number);
      changeShortCode(res.shortcode);
    })
    .catch ((err) => {
      console.log("Error fetching data: ", err);
    });
    }, [employeeID]);


    
  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { full_name, email, number, shortcode };

    fetch("http://localhost:5000/employees/" + employeeID, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(employeeData),
    })
      .then((res) => {
        alert("Düzenleme başarılı.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-title">
                <h2>Kişi Düzenle</h2>
              </div>
              <div className="card-body">
                <div className="row">
                <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="full_name">İsim Soyisim:</label>
                      <input
                        name="full_name"
                        value={full_name}
                        onChange={(e) => changeFullName(e.target.value)}
                        type="text"
                        className="form-control"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="email">E-mail:</label>
                      <input
                        name="email"
                        value={email}
                        onChange={(e) => changeMailAdress(e.target.value)}
                        type="email"
                        className="form-control"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="number">Dahili Numara:</label>
                      <input
                        name="number"
                        value={number}
                        onChange={(e) => changeNumber(e.target.value)}
                        type="number"
                        className="form-control"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="shortcode">Kısa Kod:</label>
                      <input
                        name="shortcode"
                        value={shortcode}
                        onChange={(e) => changeShortCode(e.target.value)}
                        type="number"
                        className="form-control"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <Link to="/">
                        <button className="btn btn-secondary">Geri Dön</button>
                      </Link>
                      <button className="btn btn-success" type="submit">
                        Kaydet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
