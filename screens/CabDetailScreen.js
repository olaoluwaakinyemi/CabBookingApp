import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
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
    const userId = "testUser123"; // Example user ID, replace with actual user management logic
    if (bookedCabs.length < 2) {
      const bookingData = {
        userId,
        cabId: cab.id,
        companyName: cab.companyName,
        carModel: cab.carModel,
        numberOfPassengers: cab.numberOfPassengers,
        rating: cab.rating,
        costPerHour: cab.costPerHour,
      };
      const bookingRef = await addDoc(collection(db, "bookings"), bookingData);
      setBookedCabs([...bookedCabs, { id: bookingRef.id, ...bookingData }]);

      Alert.alert("Cab Booked", "Your cab has been successfully booked.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("CabsList"),
        },
      ]);
    } else {
      alert("You cannot book more than 2 cabs at a time.");
    }
  };

  if (!cab) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{cab.companyName}</Text>
      <Text style={styles.value}>{cab.carModel}</Text>
      <Text style={styles.label}>Passengers: {cab.numberOfPassengers}</Text>
      <Text style={styles.value}>Rating: {cab.rating}</Text>
      <Text style={styles.value}>Cost/Hour: ${cab.costPerHour}</Text>
      <Button title="Book Cab" onPress={handleBookCab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default CabDetailScreen;
