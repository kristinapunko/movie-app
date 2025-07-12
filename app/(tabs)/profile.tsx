
// import { icons } from '@/constants/icons';
// import { images } from '@/constants/images';
// import { getCurrentUser, logoutUser } from '@/servises/appwrite';
// import { router } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

// interface User {
//   email: string,
//   name: string
// }

// const Profile = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const currentUser = await getCurrentUser();
//         setUser(currentUser);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, []);

//   const handleLogout = async () => {
    
//     try {
//       await logoutUser();
//     } catch (error) {
//       console.error('Logout error:', error);

//     }
//   };
  

//   if (loading) return <ActivityIndicator size="large" color="#fff" />;

//   return (
//     <View className="flex-1 bg-primary">
//     <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />

//         <Image source={icons.logo} className="w-20 h-18 my-24 mx-auto" />
//         {user ? (
//           <View  className=' mx-auto w-11/12 max-w-md bg-dark-900 rounded-lg p-6 shadow-lx'>
            
//       <Text className='text-4xl text-light-100 font-semibold mb-8 text-center'>
//         User Info:
//       </Text>
//       <Text className='text-2xl text-light-100 font-semibold mb-2'>Name: <Text className='text-light-200 font-normal mr-8'>{user.name}</Text></Text>
//       <Text className='text-2xl text-light-100 font-semibold mb-24'>Email: <Text className='text-light-200 font-normal mr-8'>{user.email}</Text></Text>

//       <TouchableOpacity
//         onPress={handleLogout}
//         className='px-8 py-4 bg-dark-100 border-dark-200 text-light-100 rounded-xl items-center text-center justify-center'
//       >
//         <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Logout</Text>
//       </TouchableOpacity>
//     </View>

//         ) : (
//           <View className="my-12 mx-auto w-11/12 max-w-md bg-dark-900 rounded-lg p-6 shadow-lg">
//   <Text className="text-2xl text-light-100 font-semibold mb-24 text-center">
//     You are not signed in
//   </Text>

//             <View className='gap-4 justify-center'>
//             <TouchableOpacity
//         onPress={()=>router.push('/register')}
//         className='px-8 py-4 bg-dark-100 border-dark-200 items-center  rounded-xl justify-center'
//       >
//         <Text className='text-light-100 font-bold'>Register</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={()=>router.push('/login')}
//        className='px-8 py-4 bg-dark-100 border-dark-200 text-light-100 rounded-xl items-center text-center justify-center'
//       >
//         <Text className='text-light-100 font-bold'>Login</Text>
//       </TouchableOpacity>
//             </View>
//           </View>
//         )}

//     </View>
//   );
// };

// export default Profile;



import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { getCurrentUser, logoutUser } from '@/servises/appwrite';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

interface User {
  email: string;
  name: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        setLoading(true);
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      loadUser();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#fff" />;

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />

      <Image source={icons.logo} className="w-20 h-18 my-24 mx-auto" />

      {user ? (
        <View className="mx-auto w-11/12 max-w-md bg-dark-900 rounded-lg p-6 shadow-lx">
          <Text className="text-4xl text-light-100 font-semibold mb-8 text-center">
            User Info:
          </Text>
          <Text className="text-2xl text-light-100 font-semibold mb-2">
            Name:{' '}
            <Text className="text-light-200 font-normal mr-8">{user.name}</Text>
          </Text>
          <Text className="text-2xl text-light-100 font-semibold mb-24">
            Email:{' '}
            <Text className="text-light-200 font-normal mr-8">{user.email}</Text>
          </Text>

          <TouchableOpacity
            onPress={handleLogout}
            className="px-8 py-4 bg-dark-100 border-dark-200 text-light-100 rounded-xl items-center justify-center"
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="my-12 mx-auto w-11/12 max-w-md bg-dark-900 rounded-lg p-6 shadow-lg">
          <Text className="text-2xl text-light-100 font-semibold mb-24 text-center">
            You are not signed in
          </Text>

          <View className="gap-4 justify-center">
            <TouchableOpacity
              onPress={() => router.push('/register')}
              className="px-8 py-4 bg-dark-100 border-dark-200 items-center rounded-xl justify-center"
            >
              <Text className="text-light-100 font-bold">Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/login')}
              className="px-8 py-4 bg-dark-100 border-dark-200 items-center rounded-xl justify-center"
            >
              <Text className="text-light-100 font-bold">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Profile;
