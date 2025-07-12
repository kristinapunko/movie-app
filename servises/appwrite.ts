import { Account, Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTIONS_ID!;
const COLLECTION_MOVIE_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTIONS_MOVIE_ID!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client)
    
export const updateSeatchCount = async (query: string, movie: Movie)=>{
    try{
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)
    ])
    // console.log(result);
    
    if(result.documents.length>0){
        const existingMovie = result.documents[0];

        await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id,
            {
                count: existingMovie.count + 1
            }
        )
    } else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            movie_id: movie.id,
            count: 1,
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        })
    }
} catch(error) {
    console.log(error);
    throw error;
    
}
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> =>{
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])
        return result.documents as unknown as TrendingMovie[];
    } catch(err){
        console.log(err);
        return undefined
        
    }
}


//sing up

const account = new Account(client);

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const res = await account.create(ID.unique(), email, password, name);
    return res;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    throw error;
  }
};


//saved movie

export const saveMovie = async (movie: AddToSavedMovies) => {
  try {
    const user = await account.get();

    // 1. Перевірити, чи фільм вже збережено
    const existing = await database.listDocuments(DATABASE_ID, COLLECTION_MOVIE_ID, [
      Query.equal('user_id', user.$id),
      Query.equal('movie_id', movie.id),
    ]);

    if (existing.documents.length > 0) {
      console.warn('Movie already saved.');
      return { alreadySaved: true };
    }

    // 2. Якщо ні — зберегти
    const res = await database.createDocument(
      DATABASE_ID,
      COLLECTION_MOVIE_ID,
      ID.unique(),
      {
        user_id: user.$id,
        movie_id: movie.id,
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      }
    );

    return res;
  } catch (error) {
    console.error('Error saving movie:', error);
    throw error;
  }
};


export const getSavedMovies = async (userId: string): Promise<AddToSavedMovies[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_MOVIE_ID, [
      Query.equal('user_id', userId), 
    ]);
    return result.documents as unknown as AddToSavedMovies[];
  } catch (err) {
    console.log('Error getting saved movies:', err);
    return undefined;
  }
};

export const deleteMovie = async (movie: AddToSavedMovies) => {
  try {
    const user = await account.get();

    // 1. Знайти документ за user_id і movie_id
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_MOVIE_ID, [
      Query.equal('user_id', user.$id),
      Query.equal('movie_id', movie.id),
    ]);

    // 2. Якщо документ існує — видаляємо
    if (result.documents.length > 0) {
      const documentId = result.documents[0].$id;

      const res = await database.deleteDocument(
        DATABASE_ID,
        COLLECTION_MOVIE_ID,
        documentId
      );

      return res;
    } else {
      console.warn('Movie not found in saved list.');
      return;
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};


// export const getMovieById = async (id: string | number) => {
//   const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}&language=en-US`);
//   if (!res.ok) throw new Error('Failed to fetch movie details');
//   return await res.json();
// };