import axios from "axios";
import { useEffect, useRef } from "react";
function Upgrade() {
  const payButtonRef = useRef(null);
  const handleDonate = () => {
    // For example trigger on button clicked, or any time you need
    var payButton = document.getElementById("pay-button");
    payButton.addEventListener("click", async function () {
      // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
      const { data } = await axios.get("http://localhost:3001/payment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data);
      window.snap.pay(data.transactionToken, {
        onSuccess: async function (result) {
          console.log(result);
          await axios.patch(
            "http://localhost:3001/upgrade",
            {
              orderId: data.orderId,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
        },
      });
    });
  };
  useEffect(() => {
    const payButton = document.getElementById("pay-button");
    if (payButton) {
      payButton.addEventListener("click", handleDonate);
      return () => payButton.removeEventListener("click", handleDonate); // cleanup function
    } else {
      console.error("payButton element not found");
    }
  }, []);
  return (
    <span
      onClick={handleDonate}
      className="nav-brand col-md-3 col-lg-2 me-0 px-3 fs-6 hover:cursor-pointer"
      ref={payButtonRef}
      id="pay-button"
    >
      Upgrade
    </span>
  );
}

export default Upgrade;
