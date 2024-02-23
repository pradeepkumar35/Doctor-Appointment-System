import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
import "../styles/HomeCard.css";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        // Handle unsuccessful response
        console.error(res.data.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error fetching data:", error.message);
    } finally {
      // Set loading to false after the request completes
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="text-center">Home Page</h1>
          <Row>
            {doctors &&
              doctors.map((doctor) => (
                <DoctorList key={doctor._id} doctor={doctor} />
              ))}
          </Row>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
