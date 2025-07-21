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

  useFocusEffect(
    useCallback(() => {
      fetchSavedMovies();
    }, [fetchSavedMovies])
  );

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