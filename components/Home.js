import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Card, FAB } from "react-native-paper";
import {useSelector, useDispatch} from 'react-redux'

const Home = ({ navigation }) => {

  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const {data, loading} = useSelector(state => state)
  const urlAPI = "http://93c48186d834.ngrok.io"
 
  const fetchData = () => {
    //run ngrok for load api
    fetch(urlAPI)
    .then((res) => res.json())
    .then((results) => {
      // setData(results);
      // setLoading(false);
      dispatch({type:"ADD_DATA", payload:results})
      dispatch({type:"SET_LOADING", payload:false})
    })
    .catch(error => {
      Alert.alert('Error:', error.message)
    })
  }

  useEffect(() => {
    fetchData()
  }, []);

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() => navigation.navigate("Profile", { item, urlAPI})}
      >
        <View style={styles.cardView}>
          <Image
            style={{ margin: 10, width: 60, height: 60, borderRadius: 30 }}
            source={{
              uri: item.picture,
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}> {item.position} </Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return renderList(item);
          }}
          keyExtractor={(item) => `${item._id}`}
          onRefresh={() => fetchData()}
          refreshing={loading}
        />
      <FAB
        onPress={() => navigation.navigate("Create", {urlAPI})}
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: "#006aff" } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
    flexDirection: "row",
  },
  cardView: {
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
  },
  fab: {
    position: "absolute",
    marginLeft: 16,
    right: 10,
    bottom: 10,
  },
});

export default Home;
