// import { Stack } from 'expo-router';

// const Layout = () => {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false, 
//       }}
//     >
//       <Stack.Screen 
//         name="login" 
//         options={{
//             headerShown:false
//         }}/>
//       <Stack.Screen 
//         name="register"
//         options={{
//             headerShown:false
//         }}/>
//     </Stack>
//   );
// };

// export default Layout;



// import { Stack } from 'expo-router';

// export default function AuthLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="login" />
//       <Stack.Screen name="register" />
//     </Stack>
//   );
// }


import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}