import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import logo from './assets/logo.svg'
import { Home, CreatePost, PageNotFound } from './pages/index.js'

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link className="flex gap-2 items-center" to="/">
          <img src={logo} alt="logo" className="w-8 object-contain" />
          <span className="font-semibold">DALL·E</span>
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
