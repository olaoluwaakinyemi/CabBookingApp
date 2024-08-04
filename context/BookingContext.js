import React, { createContext, useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [bookedCabs, setBookedCabs] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", "USER_ID")
      );
      const bookingsSnapshot = await getDocs(q);
      const bookings = bookingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookedCabs(bookings);
    };

    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider value={{ bookedCabs, setBookedCabs }}>
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext, BookingProvider };
