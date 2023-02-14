
import {useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg'
import  Moviecard from './Moviecard';

function App() {

  const [movies, setMovies] = useState([]);
  const [search,setSearch] = useState('')

  const fetchMovies= async(title)=>{
    const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_API_KEY}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  };
  useEffect(()=>{
    fetchMovies('spiderman')
  },
  []);

  const findMovies =(search)=>{
    fetchMovies(search)
    setSearch('')
  }
  return (
    <div className="app">
        <h1>MovieLand</h1>
        <div className='search'>
             <input 
                placeholder='Search for movies'
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
             />
             <img
              src={SearchIcon}
              alt='search'
              onClick={()=>{findMovies(search)}}
             />
        </div>
      
          {movies?.length > 0 ? (
            <div className='container'>
               {movies.map((movie,key)=>{ 
                  return(
                    <Moviecard movie={movie} key={key}/>
                   )
                })}
            </div>
           ):(
           <div className='empty'>
             <h2>Data not found</h2>
            </div>
              )}
      </div>
  );
}

export default App;
