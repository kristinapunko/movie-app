export const TMDB_CONFIG={
    BASE_URL:'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_REY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_REY}`
    }
}

export const fetchMovie = async ({query}: {query: string}) =>{
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const res = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if(!res.ok){
        //@ts-ignore
        throw new Error('Failed to fetch movies', res.statusText)
    }

    const data = await res.json();
    return data.results;
}

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> =>{
    try{
        const res = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: "GET",
            headers: TMDB_CONFIG.headers,
        })

        if(!res.ok) throw new Error('Failed to fetch movie data')

        const data = await res.json();
        return data;

    } catch (err){
        console.log(err);
        throw err;
        
    }
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWMxZmY5MjhkNDQ4MTcyMjY2MzEyOGU2ODQwNGM3OSIsIm5iZiI6MTc0OTkxNDg4Ny4zOSwic3ViIjoiNjg0ZDk1MDcyNDc5YzI0MDczMjk0OGI2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vh1KfmbnogX2N2GL0pTCD7X-40HC915AL7wKOswQt_E'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));