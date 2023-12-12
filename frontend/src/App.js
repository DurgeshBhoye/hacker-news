import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import Post from './components/Post';

const App = () => {
  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/post/:id' element={<Post />} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
