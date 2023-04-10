import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [data, setData] = useState([]);
  console.log(data);

  const getUserData = async () => {
    const res = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res);
    if (res.data.status === 401 || !res.data) {
      console.log("Error");
    } else {
      // Redirect to homepage
      setData(res.data.getUser);
    }
  };

  const deleteUserFunction = async (id) => {
    const res = await axios.delete(`/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res);
    if (res.data.status === 401 || !res.data) {
      console.log("Error");
    } else {
      // Redirect to homepage
      console.log("User Deleted");
    }
  };

  useEffect(() => {
    getUserData();
  }, [deleteUserFunction]);

  return (
    <>
      <div className="container mt-2">
        <h1 className="text-center">MERN Image Upload Projects</h1>
        <div className="text-end">
          <Button variant="primary">
            <NavLink to="/register" className="text-decoration-none text-light">
              Add User
            </NavLink>
          </Button>{" "}
        </div>

        <div className="row d-flex justify-content-between align-items-center mt-5">
          {data.length > 0
            ? data.map((element, index) => {
                return (
                  <>
                    <Card
                      style={{ width: "22rem", height: "18rem" }}
                      className="mb-3"
                    >
                      <Card.Img
                        variant="top"
                        style={{
                          width: "100px",
                          textAlign: "center",
                          margin: "auto",
                        }}
                        src={`/uploads/${element.imgpath}`}
                        className="mt-2"
                      />
                      <Card.Body className="text-center">
                        <Card.Title>User Name: {element.fname}</Card.Title>
                        <Card.Text>
                          Date Added: {moment(element.date).format("L")}
                        </Card.Text>
                        <Button
                          variant="danger"
                          className="col-lg-6"
                          onClick={() => deleteUserFunction(element._id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Home;
