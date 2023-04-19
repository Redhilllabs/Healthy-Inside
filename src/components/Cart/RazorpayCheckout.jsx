// import { useCallback } from "react";
// import useRazorpay, { RazorpayOptions } from "react-razorpay";
// import './RazorpayCheckout.css';
// // import Razorpay from "razorpay";

// const RazorpayCheckout = () => {
//   const Razorpay = useRazorpay();

//   const createOrder = async (params) => {
//     // Add code to create an order using Razorpay API
//     return { id: "order123" };
//   };

//   const handlePayment = useCallback(async () => {
//     const order = await createOrder({});

// // secreate ="8D9Rk9HJPZkjL4VPoeebIW3R"
//     const options: RazorpayOptions = {
//       key: "rzp_test_8qjjiRmtBCWPri",
//       amount: "3000",
//       currency: "INR",
//       name: "Acme Corp",
//       description: "Test Transaction",
//       image: "https://example.com/your_logo",
//       order_id: order.id,
//       handler: (res) => {
//         console.log(res);
//       },
//       prefill: {
//         name: "Piyush Garg",
//         email: "youremail@example.com",
//         contact: "9999999999",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzpay = new Razorpay(options);
//     rzpay.open();
//   }, [Razorpay]);

//   return (
//     <div className="razorpay-checkout">
//       <button onClick={handlePayment}>Pay with Razorpay</button>
//     </div>
//   );
// };

// export default RazorpayCheckout;
