import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  PixelRatio,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import * as Font from "expo-font";

const StartScreen = () => {

  // Intializing Usestates
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const [fontLoaded, setfontLoaded] = useState(false);
  const { width, height } = Dimensions.get("window");

  // Loading Fonts using expo-font library
  const fontLoadedFun = async () => {
    await Font.loadAsync({
      Urbanist: require("../../../assets/font/Urbanist.ttf"),
      UrbanistBold: require("../../../assets/font/Urbanist-Bold.ttf"),
    });
    setfontLoaded(true);
  };

  useEffect(() => {
    fontLoadedFun();
  }, []);

  // Initializing Refrence for scrollview
  const scrollRef = useRef();

  // Increasing slider page when index of page changes
  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;

    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  // Extracting page number from slider state
  const { currentPage: pageIndex } = sliderState;

  // automatically changing page after time interval
  const onNextPress = () => {
    const nextPage = pageIndex + 1;

    if (nextPage > 4) {
      const offSetX = 0;
      scrollRef.current.scrollTo({ x: offSetX, animated: true });
      setSliderState({
        currentPage: 0,
      });
    } else {
      const offSetX = nextPage * width;
      scrollRef.current.scrollTo({ x: offSetX, animated: true });
      setSliderState({
        currentPage: nextPage,
      });
    }
  };

  useEffect(() => {
    const slideTimer = setInterval(() => {
      onNextPress();
    }, 3000);

    return () => clearInterval(slideTimer);
  });

  return (
    <>
      {fontLoaded ? (
        <SafeAreaView>
          <Text style={styles.skipText}>Skip</Text>
          <ScrollView
            horizontal={true}
            scrollEventThrottle={16}
            pagingEnabled={true}
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              setSliderPage(event);
            }}
          >
            <View style={{ width, height }}>
              <Image
                source={require("../../../assets/images/3293465.jpg")}
                style={styles.imageStyle}
              />
              <View style={styles.wrapper}>
                <Text style={styles.header}>Kids Tracker</Text>
                <Text style={styles.paragraph}>
                  Providing tailored GPS management and offers tracking
                  solutions.
                </Text>
              </View>
            </View>
            <View style={{ width, height }}>
              <Image
                source={require("../../../assets/images/4957136.jpg")}
                style={styles.imageStyle}
              />
              <View style={styles.wrapper}>
                <Text style={styles.header}>Kids Routine</Text>
                <Text style={styles.paragraph}>
                  Providing tailored GPS management and offers tracking
                  solutions.
                </Text>
              </View>
            </View>
            <View style={{ width, height }}>
              <Image
                source={require("../../../assets/images/6310507.jpg")}
                style={styles.imageStyle}
              />
              <View style={styles.wrapper}>
                <Text style={styles.header}>Kids Education</Text>
                <Text style={styles.paragraph}>Providing tailored GPS management and offers tracking
                  solutions.</Text>
              </View>
            </View>
            <View style={{ width, height }}>
              <Image
                source={require("../../../assets/images/Start-1.jpg")}
                style={styles.imageStyle}
              />
              <View style={styles.wrapper}>
                <Text style={styles.header}>Kids Education</Text>
                <Text style={styles.paragraph}>
                  Providing tailored GPS management and offers tracking
                  solutions.
                </Text>
              </View>
            </View>
            <View style={{ width, height }}>
              <Image
                source={require("../../../assets/images/Start-2.jpg")}
                style={styles.imageStyle}
              />
              <View style={styles.wrapper}>
                <Text style={styles.header}>Kids Tracker</Text>
                <Text style={styles.paragraph}>
                  Providing tailored GPS management and offers tracking
                  solutions.
                </Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.paginationWrapper}>
            {Array.from(Array(5).keys()).map((key, index) => (
              <View
                style={[
                  styles.paginationDots,
                  { opacity: pageIndex === index ? 1 : 0.2 },
                ]}
                key={index}
              />
            ))}
          </View>
        </SafeAreaView>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(125),
    width: "100%",
  },
  skipText: {
    color: "#007CFE",
    fontSize: 16,
    marginRight: 25,
    fontFamily: "Urbanist",
    alignSelf:"flex-end"
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  header: {
    fontSize: 55,
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: 20,
    marginHorizontal: 20,
    fontFamily: "UrbanistBold",
    width:"75%"
  },
  paragraph: {
    fontSize: 17,
    color: "gray",
    alignSelf: "flex-start",
    marginHorizontal: 20,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  paginationDots: {
    height: 5,
    width: 25,
    backgroundColor: "#007CFE",
    marginLeft: 10,
  },
});

export default StartScreen;
