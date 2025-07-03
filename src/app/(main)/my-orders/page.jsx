"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from '@/context/AppContext';
import Loading from '@/components/Loading';
import { FaBox } from "react-icons/fa";
// import axios from "axios";
import Button from "@mui/material/Button";
import ConfirmDialogue from "@/components/ConfirmDialogue";
import { toast } from "react-toastify";
import { orderDummyData } from "@/Data";

// OrderStatus constant to replace Prisma enum
const OrderStatus = {
  DELIVERED: "DELIVERED",
};

const MyOrders = () => {
  const { currency, router } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async (id) => {
    // Commented out backend call, using mock data instead
    // try {
    //   const response = await axios.post("/api/recieved-order", {
    //     id,
    //     status: OrderStatus.DELIVERED,
    //   });

    //   if (response.data) {
    //     toast.success("Recieved, Thank You For Shopping with us");
    //     setOpen(false);
    //     router.refresh();
    //   } else {
    //     toast.error("Not Updated");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }

    // Use mock data
    try {
      const orderIndex = orderDummyData.findIndex(order => order._id === id);
      if (orderIndex !== -1) {
        orderDummyData[orderIndex].status = OrderStatus.DELIVERED;
        toast.success("Recieved, Thank You For Shopping with us");
        setOpen(false);
        // Optionally, refresh orders in UI
        setOrders([...orderDummyData]);
      } else {
        toast.error("Not Updated");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    // Commented out backend call, using mock data instead
    // try {
    //   const response = await axios.get("/api/fetch-order");
    //   setOrders(response.data.orders);
    //   setLoading(false);
    // } catch (error) {
    //   console.error(error);
    // }

    // Use mock data
    try {
      setOrders([...orderDummyData]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <div className="space-y-5">
          <h2 className="text-lg font-medium mt-6">My Orders</h2>
          {loading ? (
            <Loading />
          ) : (
            <div className="max-w-5xl border-t border-gray-300 text-sm">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                >
                  <div className="flex-1 flex gap-5 max-w-80 items-center">
                    <FaBox className="text-4xl text-green-600" />
                    <p className="flex flex-col gap-3">
                      <span className="font-medium text-base">
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
                  <p className="font-medium my-auto flex gap-1 items-center">
                    <span className="text-xl">{currency}</span>
                    {order.amount}
                  </p>
                  <div>
                    <div className="flex flex-col">
                      <span>Method : Paystack</span>
                      <span>
                        Date :{" "}
                        {order.date
                          ? new Date(order.date).toLocaleDateString()
                          : ""}
                      </span>
                      <span>Payment : {order.status}</span>

                      {order.status === OrderStatus.DELIVERED ? (
                        <Button
                          disabled
                          variant="outlined"
                          color="success"
                          onClick={handleClickOpen}
                          size="small"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          Recieved
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={handleClickOpen}
                          size="small"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          Recieved
                        </Button>
                      )}

                      {open && (
                        <ConfirmDialogue
                          order={order._id}
                          handleUpdate={handleUpdate}
                          open={open}
                          handleClose={handleClose}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
