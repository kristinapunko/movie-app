// import TrendingCart from '@/components/TrendingCart';
// import { icons } from '@/constants/icons';
// import { images } from '@/constants/images';
// import { fetchMovieDetails } from '@/servises/api';
// import { getCurrentUser, getSavedMovies } from '@/servises/appwrite';
// import useFetch from '@/servises/useFetch';
// import React, { useEffect, useState } from 'react';
// import { FlatList, Image, Text, View } from 'react-native';

// const saved = () => {
//   const [user, setUser] = useState<any>(null);
//   const [load, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const currentUser = await getCurrentUser();
//       setUser(currentUser);
//       setLoading(false);
//     };

//     fetchUser();
//   }, []);

//   const {
//   data: savedMovies,
//   loading: savedLoading,
//   error: savedError,
// } = useFetch(() => getSavedMovies(user.$id), [user?.$id]);

// const {data: movie, loading} = useFetch(()=>fetchMovieDetails('870028' as string))


// console.log(movie);



//   return (
//     <View className='flex-1 bg-primary'>
//       <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>
//       <View className='w-full flex-row justify-center mt-20 items-center'>
//         <Image source={icons.logo} className='w-12 h-10'/>
//       </View>
//       <Text className='text-4xl text-light-100 font-semibold my-12 text-center'>
//         Saved Movies
//       </Text>
//       <View>
//         {/* <View>
//           {savedMovies?.map(movie=>{
//             const {data: m, loading} = useFetch(()=>fetchMovieDetails(movie.id as string))
//             console.log(m);
            
//             return(
//               <Text>jkj</Text>
//             )
//           })}
//         </View> */}
//       {/* <FlatList
//         data={savedMovies}
//         keyExtractor={(item) => item.id?.toString() || item.title}
//         renderItem={({ item }) => (
//           <MovieCard {...item} user={user}/>
//           )}
//         scrollEnabled={false} 
//         numColumns={3}
//         columnWrapperStyle={{
//           justifyContent:'flex-start',
//           gap:20,
//           paddingRight: 5,
//           marginBottom:10
//         }}
//         className='mt-2 pb-32'
//       /> */}
//        <FlatList 
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 ItemSeparatorComponent={()=><View className='w-4'/>}
//                 className='mb-4 mt-3'
//                 data={savedMovies} 
//                 renderItem={({item, index})=>(
//                   <TrendingCart movie={item} index={index} user={user}/>
//                 )}
//                 keyExtractor={(item)=>item.movie_id.toString()}
//               />
//       </View>
//     </View>
//   )
// }


import TrendingCart from '@/components/TrendingCart';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovieDetails } from '@/servises/api';
import { getCurrentUser, getSavedMovies } from '@/servises/appwrite';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';


const Saved = () => {
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const [moviesDetails, setMoviesDetails] = useState<any[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Завантаження користувача
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoadingUser(false);
    };

    fetchUser();
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

  // 🚀 Оновлювати при поверненні на вкладку
  useFocusEffect(
    useCallback(() => {
      fetchSavedMovies();
    }, [fetchSavedMovies])
  );

  // Завантаження деталей фільмів на основі savedMovies
  useEffect(() => {
    if (!savedMovies.length) {
      setMoviesDetails([]);
      return;
    }

    const fetchAllDetails = async () => {
      setLoadingDetails(true);
      try {
        const details = await Promise.all(
          savedMovies.map((movie) =>
            fetchMovieDetails(String(movie.movie_id || movie.id))
          )
        );
        setMoviesDetails(details);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
        setMoviesDetails([]);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchAllDetails();
  }, [savedMovies]);

  if (loadingUser || loadingSaved || loadingDetails) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <View className="w-full flex-row justify-center mt-20 items-center">
        <Image source={icons.logo} className="w-12 h-10" />
      </View>
      <Text className="text-4xl text-light-100 font-semibold my-12 text-center">
        Saved Movies
      </Text>

      {moviesDetails.length === 0 ? (
        <Text className="text-center text-light-100">No saved movies found.</Text>
      ) : (
        <FlatList
        scrollEnabled={false} 
        numColumns={3}
        columnWrapperStyle={{
          justifyContent:'flex-start',
          gap:20,
          paddingRight: 5,
          marginBottom:10
        }}
        className='mt-2 pb-32'
          ItemSeparatorComponent={() => <View className="w-4" />}
          data={savedMovies}
          renderItem={({ item, index }) => (
            <TrendingCart movie={item} index={index} user={user} savedMovie={true}/>
          )}
          keyExtractor={(item) => item.title}
        />
      )}
    </View>
  );
};
 export default Saved





// const saved = () => {
//   const [user, setUser] = useState<any>(null);
//   const [savedMovieIds, setSavedMovieIds] = useState<string[]>([]);
//   const [movies, setMovies] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const currentUser = await getCurrentUser();
//         setUser(currentUser);

//         const savedIds = await getSavedMovies(currentUser.$id); 
//         const ids = savedIds.map(item => item.movieId || item.id); // залежно від структури
//         setSavedMovieIds(ids);

//         const movieData = await Promise.all(ids.map(id => getMovieById(id)));
//         setMovies(movieData);
//       } catch (err) {
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <View className='flex-1 bg-primary'>
//       <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>
//       <View className='w-full flex-row justify-center mt-20 items-center'>
//         <Image source={icons.logo} className='w-12 h-10'/>
//       </View>
//       <Text className='text-4xl text-light-100 font-semibold my-12 text-center'>
//         Saved Movies
//       </Text>
//       <View>
//         <FlatList
//           data={movies}
//           keyExtractor={(item) => item.id?.toString()}
//           renderItem={({ item }) => (
//             <MovieCard {...item} user={user} />
//           )}
//           scrollEnabled={false}
//           numColumns={3}
//           columnWrapperStyle={{
//             justifyContent: 'flex-start',
//             gap: 20,
//             paddingRight: 5,
//             marginBottom: 10,
//           }}
//           className='mt-2 pb-32'
//         />
//       </View>
//     </View>
//   );
// };

// export default saved


// interface SavedRecord {
//   id?: string | number;
//   movieId?: string;
//   userId?: string;
// }

// const Saved = () => {
//   const [user, setUser] = useState<any>(null);
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 1. Отримуємо поточного користувача
//         const currentUser = await getCurrentUser();
//         if (!currentUser) {
//           setError('User not logged in');
//           return;
//         }
//         setUser(currentUser);

//         // 2. Отримуємо збережені записи (лише ID)
//         const savedRecords = (await getSavedMovies(currentUser.$id)) || [];
//         console.log(savedRecords);
//         // на всяк випадок фільтруємо тільки ті, що мають movieId чи id
//         const ids = savedRecords
//           .map((rec: SavedRecord) => rec.movieId ?? rec.id)
//           .filter((mid): mid is string => typeof mid === 'string');

//         if (ids.length === 0) {
//           setMovies([]); // нічого не завантажуємо
//           return;
//         }

//         // 3. Для кожного ID запитуємо деталі фільма з TMDB
//         const movieData = await Promise.all(
//           ids.map((mid) => getMovieById(mid))
//         );
//         setMovies(movieData);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load saved movies');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);  

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-primary">
//         <ActivityIndicator size="large" color="#fff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center bg-primary px-4">
//         <Text className="text-red-500">{error}</Text>
//       </View>
//     );
//   }
  

//   return (
//     <View className="flex-1 bg-primary">
//       <Image
//         source={images.bg}
//         className="flex-1 absolute w-full z-0"
//         resizeMode="cover"
//       />

//       <View className="w-full flex-row justify-center mt-20 items-center">
//         <Image source={icons.logo} className="w-12 h-10" />
//       </View>

//       <Text className="text-4xl text-light-100 font-semibold my-12 text-center">
//         Saved Movies
//       </Text>

//       <FlatList
//         data={movies}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => <MovieCard {...item} user={user} />}
//         numColumns={3}
//         contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 100 }}
//         columnWrapperStyle={{
//           justifyContent: 'flex-start',
//           gap: 20,
//           marginBottom: 16,
//         }}
//         ListEmptyComponent={
//           <Text className="text-light-300 text-center mt-6">
//             No saved movies.
//           </Text>
//         }
//       />
//     </View>
//   );
// };

// export default saved;