# @sksmoothui/react-native-animated-horizontal-flatlist

The NEW UI/UX Animated FlatList module.

#### Demo


| Blur Layout AutoPlay                                                                                                                  | Normal                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/satyamkashyap2011/assets/blob/main/%40sksmoothui/react-native-animated-horizontal-flatlist/animatedFlatlist.gif" width="200"> | <img src="https://github.com/satyamkashyap2011/assets/blob/main/%40sksmoothui/react-native-animated-horizontal-flatlist/animtedFlatlistResize2.gif" width="200"> |

<hr>

## **Dependencies**

No need to manually install dependencies.

<hr>

## **How to Start**

First install

```
npm i @sksmoothui/react-native-animated-horizontal-flatlist --save
```

## **Import**

```javascript
import AnimatedFlatList from '@sksmoothui/react-native-animated-horizontal-flatlist';
```

## **Basic Usage**

```javascript

import React, { useState } from "react";
import {
  View,
  Text,
} from "react-native";
import AnimatedFlatList from '@sksmoothui/react-native-animated-horizontal-flatlist';

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

```

## **Properties**

| Property            | Type     | Required/Optional    |  Default      | Discription                                                                                                                                     |
| ------------------- | -------- | ------------ |  ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoplay`| Boolean  | **OPTIONAL** | false |Start autoplay like carousal. |
| `autoplayTimeout`| Number | **OPTIONAL** | 1400 |AutoPlay timeOut.|
| `blurMode`| Boolean  | **OPTIONAL** | false |Blur layer show if on. |
| `blurPercent`| Number  | **OPTIONAL** | 0.5 |opacity 0-1.  |
| `themeColor` | String | **OPTIONAL** | purple |Color used in paginator. |



