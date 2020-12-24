import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  modal,
  Modal,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  LogBox,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { CAMERA_ROLL } from "expo-permissions";

const CreateEmployee = ({ navigation, route }) => {
  const urlAPI = route.params.urlAPI;

  const getDetails = (type) => {
    if (route.params && !urlAPI) {
      switch (type) {
        case "name":
          return route.params.name;
        case "phone":
          return route.params.phone;
        case "email":
          return route.params.email;
        case "position":
          return route.params.position;
        case "salary":
          return route.params.salary;
        case "picture":
          return route.params.picture;
        case "apiURL":
            return route.params.urlAPI;
        }
      }
    }
    return "";
  };

  const [name, setName] = useState(getDetails("name"));
  const [phone, setPhone] = useState(getDetails("phone"));
  const [email, setEmail] = useState(getDetails("email"));
  const [position, setPosition] = useState(getDetails("position"));
  const [salary, setSalary] = useState(getDetails("salary"));
  const [picture, setPicture] = useState(getDetails("picture"));
  const [apiURL, setapiURL] = useState(getDetails("apiURL")
  const [modal, setModal] = useState(false);
  const [enableshift, setEnableshift] = useState(false);

  const submitData = () => {
    console.log("submit urlAPI: ", urlAPI);
    //run ngrok for load api
    fetch(`${urlAPI}/send-data`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        picture,
        salary,
        position,
      }),
    })
      .then((res) => res.json)
      .then((data) => {
        Alert.alert(`${data.name} is saved successfuly`);
        navigation.navigate("Home");
      })
      .catch((err) => Alert.alert("Error:", err.message));
  };
console.log("update urlAPI2: ", urlAPI);
  const updateDetails = () => {
    console.log("update urlAPI: ", urlAPI);
    fetch(`http://93c48186d834.ngrok.io/upload`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: route.params._id,
        name,
        email,
        phone,
        picture,
        salary,
        position,
      }),
    })
      .then((res) => res.json)
      .then((data) => {
        Alert.alert(`${name} is updated`);
        navigation.navigate("Home");
      })
      .catch((err) => Alert.alert("Error:", err.message));
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert("Necesitas conceder permisos");
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert("Necesitas conceder permisos");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "employeeApp");
    data.append("cloud_name", "abrahag40");

    fetch("https://api.cloudinary.com/v1_1/dy4pq0s13/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      })
      .catch((err) => Alert.alert("Error while uploading"));
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled={enableshift}>
      <View>
        <TextInput
          label="Name"
          style={styles.input}
          value={name}
          theme={theme}
          onFocus={() => setEnableshift(false)}
          mode="outlined"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Email"
          style={styles.input}
          value={email}
          theme={theme}
          onFocus={() => setEnableshift(false)}
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="phone"
          style={styles.input}
          value={phone}
          theme={theme}
          onFocus={() => setEnableshift(false)}
          mode="outlined"
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          label="Position"
          style={styles.input}
          value={position}
          theme={theme}
          onFocus={() => setEnableshift(true)}
          mode="outlined"
          onChangeText={(text) => setPosition(text)}
        />
        <TextInput
          label="Salary"
          style={styles.input}
          value={salary}
          theme={theme}
          onFocus={() => setEnableshift(true)}
          mode="outlined"
          onChangeText={(text) => setSalary(text)}
        />
        <Button
          icon={picture == "" ? "upload" : "check"}
          theme={theme}
          mode="contained"
          onPress={() => setModal(true)}
        >
          Upload Image
        </Button>
        {route.params && !urlAPI ? (
          <Button
            icon="content-save"
            theme={theme}
            mode="contained"
            onPress={() => updateDetails()}
          >
            Update
          </Button>
        ) : (
          <Button
            icon="content-save"
            theme={theme}
            mode="contained"
            onPress={() => submitData()}
          >
            Save
          </Button>
        )}

        <Modal
          animationType="slide"
          transparent={false}
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}
          transparent={true}
        >
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button
                theme={theme}
                icon="camera"
                mode="contained"
                onPress={() => pickFromCamera()}
              >
                Camera
              </Button>
              <Button
                theme={theme}
                icon="image-area"
                mode="contained"
                onPress={() => pickFromGallery()}
              >
                Gallery
              </Button>
            </View>
            <Button theme={theme} onPress={() => setModal(false)}>
              Cancel
            </Button>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
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
  input: {
    margin: 5,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default CreateEmployee;
