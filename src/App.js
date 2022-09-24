import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  let [status, setStatus] = useState(false)
  let [backendVersion, setBackendVersion] = useState("v1")
  let [data, setData] = useState([])

  let BACKEND_HOST = "http://127.0.0.1:5000/v1"

  useEffect(() => {
    axios.get(`${BACKEND_HOST}/posts`)
      .then((_res) => {
        console.log(_res.data);
        setData(_res.data.posts)
        setBackendVersion(_res.data.version)
      })
      .catch(error => {
        console.log(error.message)
      })
  }, []);

  function checkStatus() {
    axios.get(`${BACKEND_HOST}/status`)
      .then((_res) => {
        if (_res.status == 200) {
          setStatus(true)
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return (
    <section className="our-webcoderskull padding-lg" style={backendVersion == "v1" ? {backgroundColor:"lightgrey"} : {backgroundColor:"yellow"}}>
      <div className="container">
        <div className="row heading heading-icon">
          <h2 className='font-weight-bold black'>Welcome to Devops Hoodie Shop <span style={{color:"red"}}>({backendVersion})</span></h2>
          <button className="text-center text-small btn btn-danger" onClick={checkStatus}>Check backend api status </button>
          <h4 className='alert alert danger border '> {status == true ? "Backend is up and running 🥰😍" : "Backend is not available, please help 😰😭😱"}</h4>
        </div>
        <ul className="row">
          {data.map(item => (
            <li className="col-12 col-md-6 col-lg-3" key={item.name}>
            <div className="cnt-block equal-hight" style={{ height: 349 }}>
              <figure><img src={item.url} className="img-responsive"  /></figure>
              <h3><a href="http://www.webcoderskull.com/">{item.name}</a></h3>
              {/* <p>Freelance Web Developer</p> */}
              <ul className="follow-us clearfix">
                <li><a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
                <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
                <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true" /></a></li>
              </ul>
              <button>Buy me</button>
            </div>
          </li>
          ))}
        </ul>
      </div>
    </section>

  );
}

export default App;
