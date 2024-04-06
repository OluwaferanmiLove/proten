import BaseApp from "@navigation/AppNavigation";
import { persistor, store } from "@redux/store";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { Platform, StyleSheet, Text, UIManager, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { customFonts } from "@constant/staticData";
import { ThemeProvider } from "styled-components";
import theme from "@theme/theme";
import DropdownAlert from "react-native-dropdownalert";
import { AlertHelper } from "@utils/AlertHelper";

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BaseApp />
          <DropdownAlert
            defaultContainer={{
              padding: 8,
              // paddingTop: isIos ? getStatusBarHeight() : 0,
              flexDirection: "row",
            }}
            ref={(ref) => AlertHelper.setDropDown(ref)}
            onClose={() => AlertHelper.invokeOnClose()}
            closeInterval={4000}
            warnColor={"#d09801"}
            successImageSrc={""}
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
