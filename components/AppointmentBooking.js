import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, Icon,Button } from "react-native-elements";
import MedicalAppointment from "./MedicalAppointment";


const AppointmentBooking = ({ navigation, route }) => {
  const doctor=route.params.doctor
  console.log("This is appointment Route",route)
  const MedicalSubmit =()=>{
    console.log("I am heere",doctor);
    navigation.navigate('MedicalAppointment', {doctor} );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginVertical: 5,
          }}
        >
         
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>
              {doctor.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "grey",
                paddingBottom: 5,
              }}
            >
              {doctor.speciality}
            </Text>
          </View>
        </View>
      
      </View>

      <View style={styles.email}>
        <Text>
          {"\u2022"} {doctor.email}
        </Text>
        <Text>
          {"\u2022"} Work experiences - {doctor.experience}
        </Text>
      </View>

      {/* <SubTabView doctor={doctor} /> */}
      {/* <MedicalAppointment doctor={doctor}  /> */}
      <Button
        onPress={()=>{MedicalSubmit()}}
        title="Medical Appointment"
        color="#841584"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center",
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    marginTop: 15,
    marginLeft: 20,
  },
  subTabView: {
    marginTop: 30,
  },
});

export default AppointmentBooking;
