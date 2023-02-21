import React, { useState } from "react";
import {
  View,
  Text,
} from "react-native";
import AnimatedFlatList from "../components/AnimatedFlatList";

export const Example = () => {
  const [data, setData] = useState([
    {
      id: "0",
      author: "Alejandro Escamilla",
      source: { uri: "https://picsum.photos/id/0/5000/3333" },
    },
    {
      id: "1",
      author: "Alejandro Escamilla",
      source: { uri: "https://picsum.photos/id/1/5000/3333" },
    },
    {
      id: "2",
      author: "Alejandro Escamilla",
      source: { uri: "https://picsum.photos/id/2/5000/3333" },
    },
    {
      id: "3",
      author: "Alejandro Escamilla",
      source: require("./sample.jpeg"),
    },
  ]);
  return (
    <AnimatedFlatList
      data={data}
      autoplay
      blurMode
      // blurPercent={0.4}
      renderItem={({ item, index }) => {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              margin: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 22,
              }}
            >
              {item?.author}
            </Text>
            <Text style={{ color: "white", paddingVertical: 4 }}>
              Pease write the description for the item {index}
            </Text>
          </View>
        );
      }}
    />
  );
};
