"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from '@/context/AppContext';
import Loading from '@/components/Loading';
import { FaBoxOpen } from "react-icons/fa";
// import axios from "axios";
import { toast } from "react-toastify";
import { orderDummyData } from "@/Data";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStatusChange = async (id, status) => {
    // Commented out backend call, using mock data instead
    // try {
    //   const response = await axios.post("/api/update-order-status", {
    //     id,
    //     status,
    //   });
    //   if (response.data) {
    //     toast.success("Updated!");
    //   } else {
    //     toast.error("Not Updated");
    //   }
    // } catch (error) {
    //   console.error("Update failed:", error);
    //   toast.error("Error");
    // }

    // Use mock data
    try {
      const idx = orderDummyData.findIndex(order => order._id === id);
      if (idx !== -1) {
        orderDummyData[idx].status = status;
        setOrders([...orderDummyData]);
        toast.success("Updated! (Mock)");
      } else {
        toast.error("Order not found");
      }
    } catch (error) {
      console.error("Update failed (mock):", error);
      toast.error("Error (mock)");
    }
  };

  const fetchSellerOrders = async () => {
    // Commented out backend call, using mock data instead
    // try {
    //   const response = await axios.get("/api/order/admin");
    //   setOrders(response.data.orders || []);
    //   setLoading(false);
    // } catch {
    //   console.log("something went wrong!");
    // }

    // Use mock data
    try {
      setOrders([...orderDummyData]);
      setLoading(false);
    } catch {
      console.log("something went wrong! (mock)");
    }
  };

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Orders</h2>
          <div className="max-w-4xl rounded-md">
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
                >
                  <div className="flex-1 flex gap-5 max-w-80 items-center">
                    <FaBoxOpen className="text-4xl text-green-600" />
                    <p className="flex flex-col gap-3">
                      <span className="font-medium">
                        {order.items
                          .map(
                            (item) =>
                              item.product.name + ` x ${item.quantity}`
                          )
                          .join(", ")}
                      </span>
                      <span>Items : {order.items.length}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">
                        {order.address.fullName}
                      </span>
                      <br />
                      <span>{order.address.area}</span>
                      <br />
                      <span>{`${order.address.city}, ${order.address.state}`}</span>
                      <br />
                      <span>{order.address.phoneNumber}</span>
                    </p>
                  </div>
                  <p className="font-medium my-auto">
                    <span className="flex items-center gap-1">
                      {currency}
                      {order.amount}
                    </span>
                  </p>
                  <div>
                    <p className="flex flex-col">
                      <span>Method : COD</span>
                      <span>
                        Date :{" "}
                        {order.date
                          ? new Date(order.date).toLocaleDateString()
                          : ""}
                      </span>
                      <span>
                        Payment :
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="w-auto p-1 outline-none"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PAID">PAID</option>
                          <option value="FAILED">FAILED</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
