import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './components/home/Home'
import Profile from './components/profile/Profile'
import Navbar from './components/navbar/Navbar'
import Chat from './components/chat/Chat'
import Upload from './components/upload/Upload'

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/upload' element={<Upload/>}/>
    </Routes>
    {/* make it visible only for logged in users */}
    </div>
  );
}

export default App;
