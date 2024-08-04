import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import { doc, getDoc, addDoc, collection } from "firebase/firestore/lite";
import { db } from "../firebase";
import { BookingContext } from "../context/BookingContext";

const CabDetailScreen = ({ route, navigation }) => {
  const { cabId } = route.params;
  const [cab, setCab] = useState(null);
  const { bookedCabs, setBookedCabs } = useContext(BookingContext);

  useEffect(() => {
    const fetchCab = async () => {
      const cabRef = doc(db, "cabs", cabId);
      const cabSnapshot = await getDoc(cabRef);
      setCab({ id: cabSnapshot.id, ...cabSnapshot.data() });
    };

    fetchCab();
  }, [cabId]);

  const handleBookCab = async () => {
    if (bookedCabs.length < 2) {
      const bookingData = {
        userId: "USER_ID",
        cabId: cab.id,
        companyName: cab.companyName,
        carModel: cab.carModel,
        numberOfPassengers: cab.numberOfPassengers,
        rating: cab.rating,
        costPerHour: cab.costPerHour,
      };
      const bookingRef = await addDoc(collection(db, "bookings"), bookingData);
      setBookedCabs([...bookedCabs, { id: bookingRef.id, ...bookingData }]);
    } else {
      alert("You cannot book more than 2 cabs at a time.");
    }
  };

  if (!cab) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>{cab.companyName}</Text>
      <Text>{cab.carModel}</Text>
      <Text>Passengers: {cab.numberOfPassengers}</Text>
      <Text>Rating: {cab.rating}</Text>
      <Text>Cost/Hour: {cab.costPerHour}</Text>
      <Button title="Book Cab" onPress={handleBookCab} />
    </View>
  );
};

export default CabDetailScreen;
