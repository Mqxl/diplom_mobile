import React, { useCallback, useEffect, useState } from "react";
import Main from "./components/Main";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {Provider, useSelector} from 'react-redux';
import { store } from "./redux/store";
import * as Location from 'expo-location';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import * as Notifications from "expo-notifications";
import { Alert, View } from 'react-native';
import {useRoute} from "./router";
import * as Device from "expo-device";
import {doc, setDoc} from "firebase/firestore";
import {firestore} from "./firebase/config";
import {useNavigation} from "@react-navigation/native";

const BACKGROUND_FETCH_TASK = 'BACKGROUND_FETCH_TASK';

// Определение задачи TaskManager

const App = () => {
  const [fontsLoaded] = Font.useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  const [websocket, setWebsocket] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({accuracy: 6, timeInterval: 10});
      setLocation(loc);
    };

    requestLocationPermissions();
  }, []);

  useEffect(() => {
    // TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    //   try {
    //     console.log("Background fetch task started");
    //     const ws = new WebSocket('ws://192.168.31.205:8084/websocket');
    //
    //     ws.onopen = () => {
    //       console.log('WebSocket connection opened');
    //       const message = JSON.stringify({ data: 'Hello from React Native!' });
    //       ws.send(message);
    //       console.log('Sent message:', message);
    //       ws.close();
    //     };
    //
    //     ws.onmessage = (e) => {
    //       console.log('Received message from WebSocket:', e.data);
    //     };
    //
    //     ws.onerror = (e) => {
    //       console.error('WebSocket error:', e.message);
    //     };
    //
    //     ws.onclose = (e) => {
    //       console.log('WebSocket connection closed:', e.code, e.reason);
    //     };
    //
    //     return BackgroundFetch.BackgroundFetchResult.NewData;
    //   } catch (error) {
    //     console.error('Background fetch task failed:', error);
    //     return BackgroundFetch.BackgroundFetchResult.Failed;
    //   }
    // });
    // const initializeBackgroundFetch = async () => {
    //   const status = await BackgroundFetch.getStatusAsync();
    //   if (status === BackgroundFetch.BackgroundFetchStatus.Available) {
    //     console.log('Background fetch is available');
    //     await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    //       minimumInterval: 15 * 60, // Интервал в секундах (15 минут)
    //       stopOnTerminate: false, // Выполнение задачи после завершения приложения
    //       startOnBoot: true, // Запуск задачи после перезагрузки устройства
    //     });
    //   } else {
    //     console.log('Background fetch is not available:', status);
    //   }
    // };
    // initializeBackgroundFetch();
    const ws = connectWebSocket();
    return () => {
      ws.close();
    };
  }, []);

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket('ws://2.132.51.228:8088/gateway/websocket/api/v2/websocket');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      setWebsocket(ws);
    };

    ws.onmessage = (e) => {
      console.log('Received message from WebSocket:', e.data);
    };

    ws.onerror = (e) => {
      console.error('WebSocket error:', e.message);
    };

    ws.onclose = (e) => {
      console.log('WebSocket connection closed:', e.code, e.reason);
      setWebsocket(null);
      setTimeout(() => {
        connectWebSocket(); // Retry connection after 10 seconds
      }, 2000);
    };

    return ws;
  }, []);

  useEffect(() => {
    if (websocket) {
      // Таймер для отправки данных каждые 5 секунд
      const intervalId = setInterval(async () => {
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: "4ea3e22e-3ad3-4c4e-95c0-937eede4f235"
        });
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        const message = JSON.stringify({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          altitude: loc.coords.altitude,
          expoid: token.data,
        });
        websocket.send(message);
        console.log('Sent message:', message);
      }, 6000);

      // Очищаем таймер при размонтировании компонента
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [websocket]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
      <Provider store={store}>
        <Main onLayout={onLayoutRootView} />
      </Provider>
  );
}

export default App;
