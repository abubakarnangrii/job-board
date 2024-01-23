import React from 'react'
import JobBoard from './components/JobBoard/JobBoard'


const API_ENDPOINT = `https://hacker-news.firebaseio.com/v0`


function App() {
  return (
  <div className='app'>
       <JobBoard API_ENDPOINT={API_ENDPOINT}/>
  </div>
   
  )
}

export default App;