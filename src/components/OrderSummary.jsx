import { useSession } from '@/app/hooks/session';
import { useAppContext } from "@/context/AppContext";
//import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
//import dynamic from "next/dynamic";
import PaystackLegacyButton from "./PaystackButton";
import { orderDummyData, addressDummyData, productsDummyData } from "@/Data"; 

const OrderSummary = () => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error(
      "Paystack public key is not defined in environment variables"
    );
  }

  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    setCartItems,
    cartItems,
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const { user } = useSession();
  const total = getCartAmount() + Math.floor(getCartAmount() * 0.02);

  const fetchUserAddresses = async () => {
    // Commented out backend call, using mock data instead
    // try {
    //   const response = await axios.get("/api/address");
    //   if (response) {
    //     setUserAddresses(response.data.address);
    //   } else {
    //     toast.error("No Address.");
    //   }
    // } catch {
    //   toast.error("Some thing went wrong!");
    // }

    // Use mock data
    try {
      setUserAddresses(addressDummyData);
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handlePaymentSuccess = () => {
    toast.success("Payment successful:");
    // On payment success, place the order using mock data
    handlePlaceOrder();
    // Verify payment with your backend
    // fetch('/api/verify-payment', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ reference: response.reference }),
    // });
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  /* const fetchCart = async () => {
    try {
      const response = await axios.get("/api/cart/get");
      setCartItems(response.data.items || {});
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }; */

  const handlePlaceOrder = async () => {
    const addressId = selectedAddress?._id || selectedAddress?.id;
    const total = getCartAmount();

    const cartItemsArray = Array.isArray(cartItems)
      ? cartItems
      : Object.entries(cartItems || {}).map(([id, quantity]) => ({
          id,
          quantity,
        }));

    // FIX: Include full product object in each item
    const items = cartItemsArray.map((item) => {
      const product = productsDummyData.find(p => p._id === item.id);
      return {
        product, // full product object
        quantity: item.quantity,
        _id: Math.random().toString(36).slice(2),
      };
    });

    if (!addressId) {
      toast.error("Please select an address before placing the order.");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty. Add items to proceed.");
      return;
    }

    // Comment out backend call, use mock data instead
    // try {
    //   const response = await axios.post("/api/order", {
    //     addressId,
    //     items,
    //     total,
    //   });
    //   if (response.status === 200) {
    //     toast.success("Order placed successfully!");
    //     setCartItems({});
    //     router.push("/order-placed");
    //   } else {
    //     toast.error(
    //       response.data.error || "An error occurred while placing the order."
    //     );
    //   }
    // } catch (error) {
    //   console.error("Error placing order:", error);
    //   if (axios.isAxiosError(error) && error.response) {
    //     toast.error(error.response.data.error || "An error occurred.");
    //   } else {
    //     toast.error("Something went wrong. Please try again.");
    //   }
    // }

    // Use mock data
    try {
      const address = addressDummyData.find(
        (a) => a._id === addressId || a.id === addressId
      ) || selectedAddress;

      const newOrder = {
        _id: Date.now().toString(),
        userId: user?.id || "mock_user",
        items, // use the new items array
        amount: total,
        address,
        status: "Order Placed",
        date: Date.now(),
        __v: 0,
      };

      orderDummyData.push(newOrder);

      toast.success("Order placed successfully! (Mock)");
      setCartItems({});
      router.push("/order-placed");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city},{" "}
                    {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800 flex items-center">
              <span className="text-xl">{currency}</span>
              {getCartAmount()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800 flex items-center">
              <span className="text-xl">{currency}</span>
              {Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p className="flex items-center">
              <span className="text-2xl">{currency}</span>
              {total}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        {!selectedAddress ? (
          "Select Address To Pay"
        ) : (
          <PaystackLegacyButton
            amount={total}
            email={user?.email || "costumer@email.com"}
            publicKey={publicKey}
            reference={`PAY-${Date.now()}`}
            firstname={user?.name}
            lastname={user?.name}
            onSuccess={handlePaymentSuccess}
            onClose={() => toast.error("Payment window closed")}
            className="w-full bg-green-600 text-white py-3 mt-10 hover:bg-green-700"
          >
            Pay {total}
          </PaystackLegacyButton>
        )}
      </div>

      {/* {total !== 0 && (
        <PaystackButton
          email={user?.email || "default@example.com"}
          amount={total * 100}
          metadata={{
            name: user?.name || "Customer",
            custom_fields: [],
          }}
          publicKey={publicKey}
          text="CHECK OUT"
          onSuccess={async () => {
            try {
              await handlePlaceOrder();
              toast.success("Thank You For Shopping With Us");

              await fetchCart(); 
            } catch (error) {
              toast.error("Failed to complete order");
            }
          }}
          onClose={() => alert("Are you sure you want to close")}
        />
      )} */}

      {/* <button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white py-3 mt-5 hover:bg-green-700"
      >
        Place Order
      </button> */}
    </div>
  );
};

export default OrderSummary;
