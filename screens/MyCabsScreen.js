import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Button } from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";
import { db } from "../firebase";
import { BookingContext } from "../context/BookingContext";

const MyCabsScreen = () => {
  const { bookedCabs, setBookedCabs } = useContext(BookingContext);

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

  const handleCancelBooking = async (bookingId) => {
    await deleteDoc(doc(db, "bookings", bookingId));
    setBookedCabs(bookedCabs.filter((booking) => booking.id !== bookingId));
  };

  return (
    <FlatList
      data={bookedCabs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>
            {item.companyName} - {item.carModel}
          </Text>
          <Button
            title="Cancel Booking"
            onPress={() => handleCancelBooking(item.id)}
          />
        </View>
      )}
    />
  );
};

export default MyCabsScreen;
