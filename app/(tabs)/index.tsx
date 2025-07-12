// import SearchBar from '@/components/SearchBar'
// import { icons } from '@/constants/icons'
// import { images } from '@/constants/images'
// import { fetchMovie } from '@/servises/api'
// import useFetch from '@/servises/useFetch'
// import { useRouter } from 'expo-router'
// import React from 'react'
// import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native'

// const index = () => {
//     const router = useRouter();

//     const {
//         data: movie, 
//         loading: movieLoading,
//         error: movieError
//     } = useFetch(()=>fetchMovie({
//         query:''
//     }))

//   return (
//     <View className='flex-1 bg-primary'>
//       <Image source={images.bg} className='absolute w-full z-0' />
//       <ScrollView className='flex-1 px-5' showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight:"100%", paddingBottom:10}}>
//         <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto'/>

//         {movieLoading ? (
//             <ActivityIndicator
//                 size='large'
//                 color='#0000ff'
//                 className='mt-5 self-center'
//             />
//         ) : movieError ? (
//             <Text> Error: {movieError?.message}</Text>
//         ) : (
//             <View className='flex-1 mt-5'>
//             <SearchBar 
//                 onPress={() => router.push('/search')}
//                 placeholder="Search for a movie"
//             />

//             <>
//                 <Text className='text-lg text-white font-bold mt-5 mb-3'>Latest Movie</Text>

//                 <FlatList
//                     data={movie}
//                     renderItem={({item}) =>(
//                         <Text className='text-white text-sm'>{item.title}</Text>
//                     )}
//                     keyExtractor={(item)=>item.id.toSring()} 
//                     numColumns={3}
//                 />
//             </>
//         </View>
//         )}

//       </ScrollView>
//     </View>
//   )
// }

// export default index


// //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWMxZmY5MjhkNDQ4MTcyMjY2MzEyOGU2ODQwNGM3OSIsIm5iZiI6MTc0OTkxNDg4Ny4zOSwic3ViIjoiNjg0ZDk1MDcyNDc5YzI0MDczMjk0OGI2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vh1KfmbnogX2N2GL0pTCD7X-40HC915AL7wKOswQt_E

// //95c1ff928d4481722663128e68404c79


// import MovieCard from '@/components/MovieCard'
// import SearchBar from '@/components/SearchBar'
// import TrendingCart from '@/components/TrendingCart'
// import { icons } from '@/constants/icons'
// import { images } from '@/constants/images'
// import { fetchMovie } from '@/servises/api'
// import { getCurrentUser, getSavedMovies, getTrendingMovies } from '@/servises/appwrite'
// import useFetch from '@/servises/useFetch'
// import { useFocusEffect, useRouter } from 'expo-router'
// import React, { useCallback, useEffect, useState } from 'react'
// import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native'

// const index = () => {
//   const router = useRouter()
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const [savedMovies, setSavedMovies] = useState<any[]>([]);
//   const [loadingSaved, setLoadingSaved] = useState(false);


//   const {
//     data: trendingMovies,
//     loading: trendinLoading,
//     error: trendinError,
//   } = useFetch(getTrendingMovies)

//   const {
//     data: movies,
//     loading: movieLoading,
//     error: movieError,
//   } = useFetch(() =>
//     fetchMovie({
//       query: '',
//     })
//   )

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

//   useEffect(() => {
//     if (!user?.$id) {
//       setSavedMovies([]);
//       return;
//     }

//     const fetchSavedMovies = async () => {
//       setLoadingSaved(true);
//       try {
//         const movies = await getSavedMovies(user.$id);
//         setSavedMovies(movies ?? []);
//       } catch (error) {
//         console.error('Failed to fetch saved movies:', error);
//         setSavedMovies([]);
//       } finally {
//         setLoadingSaved(false);
//       }
//     };
    

//     fetchSavedMovies();
//   }, [user?.$id]);

//   useFocusEffect(
//     useCallback(() => {
//       fetchSavedMovies();
//     }, [fetchSavedMovies])
//   );

//   // Якщо хочеш, можеш залишити цей useEffect для початкового завантаження (не обов'язково)
//   useEffect(() => {
//     fetchSavedMovies();
//   }, [fetchSavedMovies]);

//   return (
//     <View className='flex-1 bg-primary'>
//       <Image source={images.bg} className='absolute w-full z-0' />
//       <ScrollView
//         className='flex-1 px-5'
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
//       >
//         <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />

//         {movieLoading || trendinLoading ? (
//           <ActivityIndicator
//             size='large'
//             color='#0000ff'
//             className='mt-5 self-center'
//           />
//         ) : movieError || trendinError ? (
//           <Text> Error: {movieError?.message || trendinError?.message}</Text>
//         ) : (
//           <View className='flex-1 mt-5'>
//             <SearchBar
//               onPress={() => router.push('/search')}
//               placeholder='Search for a movie'
//             />

//             {trendingMovies && (
//               <View className='mt-10'>
//                 <Text className='text-lg text-white font-bold mt-5 mb3 '>Trending Movies</Text>
//               </View>
//             )}

//               <FlatList 
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 ItemSeparatorComponent={()=><View className='w-4'/>}
//                 className='mb-4 mt-3'
//                 data={trendingMovies} 
//                 renderItem={({item, index})=>(
//                   <TrendingCart movie={item} index={index} user={user} savedMovie={savedMovies}/>
//                 )}
//                 keyExtractor={(item)=>item.movie_id.toString()}
//               />

//             <>
//               <Text className='text-lg text-white font-bold mt-5 mb-3'>
//                 Latest Movie
//               </Text>

//               <View >
//                 <FlatList
//                   data={movies}  
//                   keyExtractor={(m) => m.id.toString()}
//                   renderItem={({ item }) => (
//                     <MovieCard movie={item} user={user} savedMovie={savedMovies}/>
//                   )}
//                   scrollEnabled={false} 
//                   numColumns={3}
//                   columnWrapperStyle={{
//                     justifyContent:'flex-start',
//                     gap:20,
//                     paddingRight: 5,
//                     marginBottom:10
//                   }}
//                   className='mt-2 pb-32'

//                 />
//               </View>
//             </>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   )
// }

// export default index






















// import { useFocusEffect } from '@react-navigation/native';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';


import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import TrendingCart from '@/components/TrendingCart';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovie } from '@/servises/api';
import { getCurrentUser, getSavedMovies, getTrendingMovies } from '@/servises/appwrite';
import useFetch from '@/servises/useFetch';

const Index = () => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() =>
    fetchMovie({
      query: '',
    })
  );

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const fetchSavedMovies = useCallback(async () => {
    if (!user?.$id) {
      setSavedMovies([]);
      return;
    }

    setLoadingSaved(true);
    try {
      const movies = await getSavedMovies(user.$id);
      setSavedMovies(movies ?? []);
    } catch (error) {
      console.error('Failed to fetch saved movies:', error);
      setSavedMovies([]);
    } finally {
      setLoadingSaved(false);
    }
  }, [user?.$id]);

  useFocusEffect(
    useCallback(() => {
      fetchSavedMovies();
    }, [fetchSavedMovies])
  );

  useEffect(() => {
    fetchSavedMovies();
  }, [fetchSavedMovies]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {(movieLoading || trendingLoading) ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-5 self-center"
          />
        ) : (movieError || trendingError) ? (
          <Text>Error: {movieError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push('/search')}
              placeholder="Search for a movie"
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    
                    <TrendingCart movie={item} index={index} user={user} savedMovie={savedMovies} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                />
              </View>
            )}

            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movie
            </Text>

            <FlatList
              data={movies}
              keyExtractor={(m) => m.id.toString()}
              renderItem={({ item }) => (
                <MovieCard movie={item} user={user} savedMovie={savedMovies} />
              )}
              scrollEnabled={false}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
