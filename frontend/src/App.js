// styling
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// context
import CurrentUserProvider from './context/CurrentUser'
// components
import Monster from './components/Monster'
import Navigation from './components/Navigation'
import Home from './components/Home'
import UserInfo from './components/UserInfo'
// npm packages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// main app function
function App() {
  return (
    <CurrentUserProvider>
      <Navigation />
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          {/* <Route exact path='/profile' element={<UserInfo />} />
          <Route exact path='/campaigns' element={} />
          <Route exact path='/campaigns/:campaignId' element={} />
          <Route exact path='/campaigns/:campaignId/:sessionId' element={} />
          <Route exact path='/monsters' element={} />
          <Route exact path='/monsters/edit/:monsterId' element={} /> */}
        </Routes>
      </Router>
    </CurrentUserProvider>
  )
}

export default App;