import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import store from './src/store';
import MainNavigator from './src/navigation/MainNavigator';
import { SQLiteProvider } from 'expo-sqlite';



export const initializeDB = async (db) => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY NOT NULL,
        email TEXT NOT NULL,
        localId TEXT NOT NULL
      );
    `);
    console.log("Base de datos inicializada");
  } catch (error) {
    console.log("Error al inicializar la base de datos", error);
  }
};


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf'),
    'Karla-Italic': require('./assets/fonts/Karla-Italic.ttf'),
    'Karla-Light': require('./assets/fonts/Karla-Light.ttf'),
    'PressStart2P': require('./assets/fonts/PressStart2P-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="user.db" onInit={initializeDB}>
      <Provider store={store}>
        <StatusBar style="light" />
        <MainNavigator />
      </Provider>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({

});
