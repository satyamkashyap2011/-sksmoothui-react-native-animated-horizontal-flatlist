import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Platform,
  Animated,
  SafeAreaView,
  ImageBackground,
} from "react-native";

import Paginator from "./Paginator";
import { width } from "./styles";
import PropTypes from "prop-types";

const ITEM_BORDER_RADIUS = 20;
const keyExtractor = (item, index) => `${index}`;
const ITEM_HEIGHT = Platform.OS === "ios" ? width * 0.89 : width * 0.9;
const SPACE_ITEM_SIZE = (width - ITEM_HEIGHT) / 2;
let THEME_COLOR = "purple";

let currentIndex = 0;
const AnimatedFlatList = ({
  ref = useRef(null),
  autoplay = false,
  autoplayTimeout = 1400,
  themeColor = THEME_COLOR,
  data = [],
  renderItem = ({ item, index }) => {},
  blurMode = false,
  blurPercent = 0.5,
}) => {
  const [layoutHeight, setLayoutHeight] = useState(50);
  useEffect(() => {
    if (autoplay) {
      const cb = () => {
        if (currentIndex == data.length) {
          currentIndex = 0;
        }
        try {
          if (ref?.current?.scrollToIndex != undefined) {
            ref.current.scrollToIndex({
              animated: currentIndex != 0,
              index: currentIndex,
            });
          } else {
            ref.current.getNode().scrollToIndex({
              animated: currentIndex != 0,
              index: currentIndex,
            });
          }
          currentIndex += 1;
        } catch (error) {}
      };
      const intervalId = setInterval(cb, autoplayTimeout || 3200);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [data]);
  let scrollX = useRef(new Animated.Value(0)).current;
  const getItemLayout = (data, index) => ({
    length: 0,
    offset: ITEM_HEIGHT * index,
    index,
  });
  const ListView = () => {
    return (
      <Animated.FlatList
        ref={ref}
        style={{
          marginTop: 5,
        }}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        data={[{ key: "left" }, ...data, { key: "right" }]}
        horizontal={true}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        getItemLayout={getItemLayout}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="start"
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={renderItemPlans}
        keyExtractor={keyExtractor}
      />
    );
  };

  const renderItemPlans = ({ item, index }) => {
    let percentBlurValue = (0 <= blurPercent <= 1,
    typeof blurPercent == "number")
      ? blurPercent
      : 0.5;
    let backgroundColor = blurMode
      ? `rgba(0,0,0,${percentBlurValue})`
      : "transparent";
    if (item.key == "left" || item.key == "right") {
      return <View style={{ width: SPACE_ITEM_SIZE }} />;
    }
    const inputRange = [
      (index - 2) * ITEM_HEIGHT,
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
    ];

    const animate_scroll_translateY = scrollX?.interpolate({
      inputRange,
      outputRange: [30, -10, 30],
      extrapolate: "clamp",
    });

    return (
      <View
        style={{ justifyContent: "space-evenly", height: layoutHeight + 150 }}
        onLayout={(event) => {
          try {
            setLayoutHeight(event.nativeEvent.layout.width);
          } catch (error) {}
        }}
      >
        <Animated.View
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={{
            width: ITEM_HEIGHT,
            padding: 5,
            transform: [{ translateY: animate_scroll_translateY }],
          }}
        >
          <ImageBackground
            style={{
              height: 400,
              width: "100%",
            }}
            imageStyle={{ borderRadius: ITEM_BORDER_RADIUS }}
            source={item?.source || null}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: backgroundColor,
                position: "absolute",
                borderRadius: ITEM_BORDER_RADIUS,
              }}
            />
            {renderItem({ item, index })}
          </ImageBackground>
        </Animated.View>
      </View>
    );
  };
  const DotsScrollBarView = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Paginator
          data={data}
          scrollX={scrollX}
          index={currentIndex}
          color={themeColor}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      {ListView()}
      <View style={{}}>{DotsScrollBarView()}</View>
    </SafeAreaView>
  );
};

AnimatedFlatList.propTypes = {
  ...FlatList.prototype,
  themeColor: PropTypes.string,
  gradiantColors: PropTypes.array,
};
export default AnimatedFlatList;
