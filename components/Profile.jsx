import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const Profile = (props) => {
  const {
    _id,
    name,
    picture,
    phone,
    salary,
    email,
    position,
  } = props.route.params.item;

  const deleteEmployee = () => {
    console.log(`delete urlAPI: ${props.route.params.urlAPI}`);
    fetch(`${props.route.params.urlAPI}/delete`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then((deletedEmp) => {
        Alert.alert(`${deletedEmp.name} deleted`);
        props.navigation.navigate("Home");
      })
      .catch((err) => Alert.alert("Error:", err.message));
  };

  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telpromt:${phone}`);
    }
  };

  return (
    <View>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={{ height: "20%" }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: 140,
            height: 140,
            borderRadius: 140 / 2,
            marginTop: -50,
          }}
          source={{ uri: picture }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 15 }}>
        <Title>{name}</Title>
        <Text style={{ fontSize: 15 }}>{position}</Text>
      </View>
      <Card
        style={styles.mycard}
        onPress={() => {
          Linking.openURL(`mailto:${email}`);
        }}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name="email" size={32} color="#006aff" />
          <Text style={styles.mytext}>{email}</Text>
        </View>
      </Card>
      <Card style={styles.mycard} onPress={() => openDial()}>
        <View style={styles.cardContent}>
          <Entypo name="phone" size={32} color="#006aff" />
          <Text style={styles.mytext}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" size={32} color="#006aff" />
          <Text style={styles.mytext}>{salary}</Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <Button
          icon="acconit-edit"
          mode="contained"
          theme={theme}
          onPress={() => {
            props.navigation.navigate("Create", 
                {_id, name, picture, phone, salary, email, position}
            );
          }}
        >
          Edit
        </Button>
        <Button
          icon="delete"
          mode="contained"
          theme={theme}
          onPress={() => deleteEmployee()}
        >
          Fire Employee
        </Button>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mycard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  mytext: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
});

export default Profile;
