import React, { useCallback, useEffect, useState } from "react";
import Main from "./components/Main";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const BACKGROUND_FETCH_TASK = 'BACKGROUND_FETCH_TASK';

// Определение задачи TaskManager

const App = () => {
  const [fontsLoaded] = Font.useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
      try {
        console.log("Background fetch task started");
        const ws = new WebSocket('ws://192.168.31.205:8084/websocket');

        ws.onopen = () => {
          console.log('WebSocket connection opened');
          const message = JSON.stringify({ data: 'Hello from React Native!' });
          ws.send(message);
          console.log('Sent message:', message);
          ws.close();
        };

        ws.onmessage = (e) => {
          console.log('Received message from WebSocket:', e.data);
        };

        ws.onerror = (e) => {
          console.error('WebSocket error:', e.message);
        };

        ws.onclose = (e) => {
          console.log('WebSocket connection closed:', e.code, e.reason);
        };

        return BackgroundFetch.BackgroundFetchResult.NewData;
      } catch (error) {
        console.error('Background fetch task failed:', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
      }
    });
    const initializeBackgroundFetch = async () => {
      const status = await BackgroundFetch.getStatusAsync();
      if (status === BackgroundFetch.BackgroundFetchStatus.Available) {
        console.log('Background fetch is available');
        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
          minimumInterval: 15 * 60, // Интервал в секундах (15 минут)
          stopOnTerminate: false, // Выполнение задачи после завершения приложения
          startOnBoot: true, // Запуск задачи после перезагрузки устройства
        });
      } else {
        console.log('Background fetch is not available:', status);
      }
    };
    initializeBackgroundFetch();
  }, []);

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
