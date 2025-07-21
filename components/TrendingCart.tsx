import { icons } from '@/constants/icons';
import { deleteMovie, saveMovie } from '@/servises/appwrite';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity } from 'react-native';

interface MovieData {
  movie_id: string | number;
  title: string;
  poster: string;
}

interface TrendingCardProps {
  movie: MovieData;
  index: number;
  user: any | null;
  savedMovie?: SavedMovie[] | boolean;
}


  const TrendingCart: React.FC<TrendingCardProps> = ({ movie, index, user, savedMovie }) => {
    const [isSaved, setIsSaved] = useState(!!savedMovie); // ← ось тут
  
    useEffect(() => {
      const checkSavedStatus = async () => {
        if (typeof savedMovie === 'boolean') return;
  
        try {
          const found = savedMovie?.some(saved =>
            saved.movie_id == movie.movie_id
          );
          setIsSaved(!!found);
        } catch (err) {
          console.error('Error checking saved status:', err);
        }
      };
  
      checkSavedStatus();
    }, [user, movie.movie_id, savedMovie]);
  

  const handleSave = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to save movies.');
      return;
    }

    const movieToSave = {
      user: user,
      id: movie.movie_id,
      title: movie.title,
      poster_path: movie.poster,
    };

    try {
      if (isSaved) {
        await deleteMovie(movieToSave);
        setIsSaved(false);
        Alert.alert('Movie deleted');
      } else {
        await saveMovie(movieToSave);
        setIsSaved(true);
        Alert.alert('Movie saved');
      }
    } catch (error) {
      console.error('Save/Delete error:', error);
      Alert.alert('Error', 'Failed to update movie status.');
    }
  };

  return (
    <Link href={`/movie/${movie.movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative">
        <Image
          source={{ uri: movie.poster }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={handleSave}
          className="absolute right-0 top-0 bg-dark-200 rounded-full p-2 z-10"
        >
          <Image 
            source={isSaved ? icons.savef : icons.save} 
            className="h-4 w-4" 
          />
        </TouchableOpacity>
        <Text className="text-sm font-bold mt-2 text-light-200" numberOfLines={2}>
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCart;