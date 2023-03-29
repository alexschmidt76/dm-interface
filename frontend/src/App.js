// styling
import './App.css';
// context
import CurrentUserProvider from './context/CurrentUser'
// components
import Monster from './components/Monster'
import Home from './components/Home'
import UserInfo from './components/UserInfo'
// npm packages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// main app function
function App() {
  return (
    <CurrentUserProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/user/:userId' element={<UserInfo />} />
          <Route exact path='/user/:userId/campaigns' element={} />
          <Route exact path='/user/:userId/campaigns/:campaignId' element={} />
          <Route exact path='/user/:userId/campaigns/:campaignId/:sessionId' element={} />
          <Route exact path='/user/:userId/monsters' element={} />
          <Route exact path='/user/:userId/monsters/edit/:monsterId' element={} />
        </Routes>
      </Router>
    </CurrentUserProvider>
  )
}

export default App;