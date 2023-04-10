import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fname, setFname] = useState("");
  const [file, setFile] = useState("");

  const history = useNavigate();

  console.log(fname);
  console.log(file);

  // Adduser data
  const addUserData = async (e) => {
    e.preventDefault(); //to prevent the default behavior of button to refresh the screen on submit

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // const res = await axios.post("/register", formData, config);
    try {
      const res = await axios.post("/register", formData, config);

      if (res.data.status === 401 || !res.data) {
        console.log("Error");
      } else {
        // Redirect to homepage
        history("/");
      }

      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h1>Upload your Image here</h1>
        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setFname(e.target.value);
                console.log(fname);
              }}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select your Avatar</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                console.log(file);
              }}
              placeholder=""
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={addUserData}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
