import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Flights/Home';
import MyFlights from './pages/MyFlights/MyFlights';
import { ToastContainer } from 'react-toastify';
import "./assets/styles/scroll.css"
import { FlightsContextProvider } from './context/flightsContext';

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
