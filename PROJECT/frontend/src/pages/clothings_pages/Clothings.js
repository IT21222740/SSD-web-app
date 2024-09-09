import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Shop_pages/Home.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, Spinner } from "react-bootstrap";
import axios from "axios";
import Cloth from "../../components/clothing-components/Cloth";
import { Helmet } from "react-helmet-async";
import { getError } from "../../components/Online-shopping-components/Utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Clothings() {
  const [clothings, setClothings] = useState([]);
  const [dress, setDress] = useState("blouse");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchClothings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.lykdat.com/text-search?api_key=AIzaSyCV8JzIypjF2FtVTCTs4JmGZT4eisg0xkA&query=${dress}`
        );
        console.log(response);
        if (gender) {
          if (response.data?.grouped_results) {
            setClothings(response.data?.grouped_results[gender]);
          } else setClothings(response.data.result);
        } else {
          setClothings(response.data.result);
        }
      } catch (err) {
        toast.error(getError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchClothings();
  }, [dress, gender]);

  const loader = () => {
    return (
      <div className="Home vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  };

  const ClothingsToSelect = () => {
    return (
      <>
        <Form.Group>
          <Form.Label className="label-text">Select Dress</Form.Label>
          <Form.Select
            value={dress || ""}
            onChange={(e) => setDress(e.target.value)}
          >
            <option value="blouse">Blouse</option>
            <option value="Shorts">Shorts</option>
            <option value="Jeans">Jeans</option>
            <option value="Shirt">Shirt</option>
            <option value="Pants">Pants</option>
            <option value="Trousers">Trousers</option>
          </Form.Select>
        </Form.Group>
      </>
    );
  };
  const GenderToSelect = () => {
    return (
      <>
        <Form.Group>
          <Form.Label className="label-text">Select Gender</Form.Label>
          <Form.Select
            value={gender || ""}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">All</option>
            <option value="male" hidden={dress === "blouse"}>
              Male
            </option>
            <option value="female">Female</option>
          </Form.Select>
        </Form.Group>
      </>
    );
  };
  if (loading) {
    return loader();
  }

  return (
    <div className="Home vh-100">
      <ToastContainer />
      <main>
        <Helmet>
          <title>Clothings</title>
        </Helmet>
        <div className="content">
          <div className="category text-dark ml-0">Latest Clothing Trends</div>
          <Row className="mb-2">
            <Col>{ClothingsToSelect()}</Col>
            <Col>{GenderToSelect()}</Col>
          </Row>

          <div className="products">
            {
              <Row>
                {clothings.length ? (
                  clothings.map((cloth_item, index) => (
                    <Col sm={6} md={4} lg={3} className="mb-3" key={index}>
                      <Cloth cloth_item={cloth_item}></Cloth>
                    </Col>
                  ))
                ) : (
                  <h1>No Clothings</h1>
                )}
              </Row>
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default Clothings;
