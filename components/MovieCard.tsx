import { icons } from '@/constants/icons';
import { deleteMovie, saveMovie } from '@/servises/appwrite';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

interface MovieCardProps {
  movie: Movie;
  savedMovie?: SavedMovie[];
  user?: { $id: string }; 
}

const MovieCard: React.FC<MovieCardProps> = ({ movie,user, savedMovie }) => {
  const { id, poster_path, title, vote_average, release_date } = movie;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const isAlreadySaved = savedMovie?.some(saved =>
      saved.movie_id == movie.id
    );
    setIsSaved(!!isAlreadySaved);
  }, [savedMovie, movie.id]);
  
  const handleSave = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to save movies.');
      return;
    }

    try {
      if (isSaved === false){
        await saveMovie(movie);
        setIsSaved(true);
        Alert.alert('Movie saved!');
      } else {
        await deleteMovie(movie);
        setIsSaved(false)
        Alert.alert('Movie deleted!');
      }
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Failed to save movie.')
    }
  };


  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className='w-[30%]'>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png`
          }}
          className='w-full h-52 rounded-lg'
          resizeMode='cover'
        />

        <TouchableOpacity
          onPress={handleSave}
          className='absolute right-0 top-0 bg-dark-200 rounded-full p-2 z-10'
        >
          <Image source={isSaved ? icons.savef : icons.save} className='h-4 w-4' />
        </TouchableOpacity>

        <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>{title}</Text>
        <View className='flex-row items-center justify-start gap-x-1'>
          <Image source={icons.star} className='size-4' />
          <Text className='text-sm text-white font-bold uppercase'>{Math.round(vote_average / 2)}</Text>
        </View>

        <View className='flex-row items-center justify-between'>
          <Text className='text-xs text-light-300 font-medium mt-1'>{release_date?.split('-')[0]}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
