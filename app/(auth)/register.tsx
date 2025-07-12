import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { registerUser } from '@/servises/appwrite';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    try {
      await registerUser(email, password, name);
      Alert.alert('Success', 'You have been registered!');
      router.replace('/profile')
    } catch (error: any) {
      Alert.alert('Registration Error', error?.message || 'Something went wrong');
    }
  };

  return (
    // <View className="flex-1 bg-primary">
    //   <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
    //   <SafeAreaProvider>
    //     <SafeAreaView>
    //       <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

    //       <View className="mx-auto my-8">
    //         <Text className="text-light-100 text-3xl">Registration</Text>
    //       </View>

    //       <View className="mx-4 my-6">
    //         <Text className="text-lg text-light-100 mb-2">Your Name</Text>
    //         <TextInput
    //           className="mb-6 px-4 py-3 rounded-xl border border-light-300 text-light-100 bg-light-50"
    //           placeholder="Enter your name"
    //           placeholderTextColor="#aaa"
    //           onChangeText={setName}
    //           value={name}
    //         />

    //         <Text className="text-lg text-light-100 mb-2">Your Email</Text>
    //         <TextInput
    //           className="mb-6 px-4 py-3 rounded-xl border border-light-300 text-light-100 bg-light-50"
    //           placeholder="Enter your email"
    //           placeholderTextColor="#aaa"
    //           keyboardType="email-address"
    //           onChangeText={setEmail}
    //           value={email}
    //           autoCapitalize="none"
    //         />

    //         <Text className="text-lg text-light-100 mb-2">Your Password</Text>
    //         <TextInput
    //           className="mb-6 px-4 py-3 rounded-xl border border-light-300 text-light-100 bg-light-50"
    //           placeholder="Enter your password"
    //           placeholderTextColor="#aaa"
    //           secureTextEntry
    //           onChangeText={setPassword}
    //           value={password}
    //         />

    //         <View className="flex-row justify-center items-center gap-x-2 my-4">
    //             <Text className="text-light-200 text-lg">Already have an account?</Text>
    //             <TouchableOpacity onPress={()=>router.push('/login')}>
    //                 <Text className="text-light-100 text-lg font-semibold">Login</Text>
    //             </TouchableOpacity>
    //         </View>


    //         <TouchableOpacity
    //           onPress={handleRegister}
    //           className="bg-dark-100 border border-dark-200 rounded-xl p-3 my-4"
    //         >
    //           <Text className="text-center text-light-100 text-base font-semibold">Register</Text>
              
    //          </TouchableOpacity>

           
    //       </View>
    //     </SafeAreaView>
    //   </SafeAreaProvider>
    // </View>
    <View className="flex-1 bg-primary">
  <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
          <View className="mx-auto my-8">
            <Text className="text-light-100 text-3xl">Registration</Text>
          </View>

          <View className="mx-4 my-6">
            <Text className="text-lg text-light-100 mb-2">Your Name</Text>
            <TextInput
              className="mb-6 px-4 py-3 rounded-xl border border-light-300 text-light-100 bg-light-50"
              placeholder="Enter your name"
              placeholderTextColor="#aaa"
              onChangeText={setName}
              value={name}
            />

            <Text className="text-lg text-light-100 mb-2">Your Email</Text>
            <TextInput
              className="mb-6 px-4 py-3 rounded-xl border border-light-300 text-light-100 bg-light-50"
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />

            <Text className="text-lg text-light-100 mb-2">Your Password</Text>
            <TextInput
              className="mb-6 px-4 py-3 rounded-xl border border-light-300 text-light-100 bg-light-50"
              placeholder="Enter your password"
              placeholderTextColor="#aaa"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />

            <View className="flex-row justify-center items-center gap-x-2 my-4">
              <Text className="text-light-200 text-lg">Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-light-100 text-lg font-semibold">Login</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              className="bg-dark-100 border border-dark-200 rounded-xl p-3 my-4"
            >
              <Text className="text-center text-light-100 text-base font-semibold">Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
</View>

  );
};

export default Register;
