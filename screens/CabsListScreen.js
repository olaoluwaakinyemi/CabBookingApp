import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";

const CabsListScreen = ({ navigation }) => {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const fetchCabs = async () => {
      const cabsCollection = collection(db, "cabs");
      const cabsSnapshot = await getDocs(cabsCollection);
      const cabList = cabsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCabs(cabList);
    };

    fetchCabs();
  }, []);

  return (
    <FlatList
      data={cabs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("CabDetail", { cabId: item.id })}
        >
          <Text>
            {item.companyName} - {item.carModel}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default CabsListScreen;
