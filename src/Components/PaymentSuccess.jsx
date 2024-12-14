import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../Styles/payment.css"; // External CSS for better readability
import axios from "axios";
import swal from "sweetalert";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');

  const handleHomeClick = () => {
    localStorage.removeItem("config");
    localStorage.removeItem("id");
    navigate("/orders");
  };

  const booking = async () => {
    try {
      const config = JSON.parse(localStorage.getItem("config"));
      if (!config) return;
      let res = await axios(config);
      if (res.status == 200) {
        swal({
          title: "Success!",
          text: "Order Placed Successfully",
          icon: "success", // Available options: 'success', 'error', 'warning', 'info', 'question'
          button: "OK",
        });

        localStorage.removeItem("config");
        localStorage.removeItem("id");
        setTimeout(() => {
          navigate("/orders");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      booking();
    }
  }, []);

  return (
    <div className="payment-success-container">
      <FaCheckCircle className="payment-success-icon" />
      <h1 className="payment-success-title">Payment Successful!</h1>
      <p className="payment-success-message">
        Thank you for your payment. Your transaction was successful.
      </p>

      <button onClick={handleHomeClick} className="payment-success-button">
        Go To My Order
      </button>
    </div>
  );
};

export default PaymentSuccess;
