import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Flights/Home';
import MyFlights from './pages/MyFlights/MyFlights';
import { FlightsContextProvider } from './context/FlightsContext';
import { ToastContainer } from 'react-toastify';
import "./assets/styles/scroll.css"

function App() {

  return (
    <Router>
      <div>
        <div className='max-w-7xl mx-auto'>
          <Header />
          <ToastContainer />
          <Routes>

            <Route path='/' element={
              <FlightsContextProvider>
                <Home />
              </FlightsContextProvider>
            } />

            <Route path='/myFlights' element={
              <FlightsContextProvider>
                <div>
                  <MyFlights />
                </div>
              </FlightsContextProvider>
            } />

          </Routes>
        </div>

      </div>
    </Router>
  )
}

export default App
