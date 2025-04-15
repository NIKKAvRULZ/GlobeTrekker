import React from 'react'
import CountriesList from './components/CountriesList'

const App = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center text-blue-500">REST Countries App</h1>
        <p className="text-center text-gray-700 mt-2">Explore countries and their flags</p>
        <CountriesList/>
      </div>
    </div>
  )
}

export default App
