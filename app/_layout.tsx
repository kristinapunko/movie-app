import { Stack } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";
import './globals.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="movie/[id]"
            options={{ headerShown: false }}
          />
        </Stack>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 390,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
});
