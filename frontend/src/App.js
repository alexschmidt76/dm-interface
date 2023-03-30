// styling
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// context
import CurrentUserProvider from './context/CurrentUser'
// components
import Monster from './components/monster/Monster'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Profile from './components/user/Profile'
import Campaigns from './components/campaign/Campaigns'
import Campaign from './components/campaign/Campaign'
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
          <Route exact path='/campaigns' element={<Campaigns />} />
          <Route exact path='/campaigns/:campaignId' element={<Campaign />} />
          <Route exact path='/campaigns/:campaignId/:sessionId' element={<Session />} />
          {/* <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/monsters' element={} />
          <Route exact path='/monsters/edit/:monsterId' element={} /> */}
        </Routes>
      </Router>
    </CurrentUserProvider>
  )
}

export default App;