import { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const searchProperties = ["full_name", "email", "number", "shortcode"];
  const filteredData = data.filter((item) => {
    return search.toLowerCase() === ''
      ? true 
      : searchProperties.some((property) =>
          item[property].toLowerCase().includes(search.toLowerCase())
        );
  });

  const loadEdit = (id) => {
    navigate("/employees/edit/" + id)
  }

  const removeFunction = (id) => {
    if(window.confirm('Bu veriyi silmek istiyor musunuz?')) {
    fetch("http://localhost:5000/employees/"+id, {
      method: "DELETE"
    }).then((res) => {
      alert("Silme başarılı.");
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    }) 
    }
  }

  // Load data from data.json when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Container>
      <Form>
        <InputGroup className="my-3">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contact"
          ></Form.Control>
          <Link to="employees/create"><button className='btn btn-success'>Yeni Kişi Oluştur</button></Link>
        </InputGroup>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>İsim Soyisim</th>
            <th>E-Mail</th>
            <th>Dahili Numara</th>
            <th>Kısa Kod</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="4">Sonuç yok.</td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.full_name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>{item.shortcode}</td>
                <td>
                  <a onClick={() => {loadEdit(item.id)}} className='btn btn-secondary'>Düzenle</a>
                  <a onClick={() => {removeFunction(item.id)}}className='btn btn-danger'>Sil</a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeList;
