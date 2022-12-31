import './App.css';
import "react-toastify/dist/ReactToastify.css"

import { ToastContainer } from "react-toastify";

import Footer from './components/footer';
import Navbar from './components/navbar';
import About from './components/about';
import Home from './components/home';
import SignUp from './components/signup';
import SignIn from './components/signIn';
import SignOut from './components/signout';

import { Route, Routes } from "react-router-dom"

import SignUpBiz from './components/signup_biz';
import Mycards from './components/myCards';
import ProtectedRoute from './components/common/protectedRoute';
import CreateCard from './components/createCard';
import DeleteCard from './components/deleteCard';
import EditCard from './components/editCard';

function App() {
  return (

    <div className="app d-flex flex-column min-vh-100">
      <ToastContainer />
      <header>
        <Navbar />
      </header>

      <main className="flex-fill container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='sign-up' element={<SignUp redirect="/sign-in" />} />
          <Route path='sign-in' element={<SignIn redirect="/" />} />
          <Route path='sign-out' element={<SignOut redirect="/" />} />
          <Route path='sign-up-biz' element={<SignUpBiz redirect="/my-cards" />} />
          <Route
            path='/my-cards/edit/:id'
            element={
              <ProtectedRoute onlyBiz>
                <EditCard redirect="/my-cards" />
              </ProtectedRoute>
            } />
          <Route
            path='/my-cards/delete/:id'
            element={
              <ProtectedRoute onlyBiz>
                <DeleteCard redirect="/my-cards" />
              </ProtectedRoute>
            } />
          <Route
            path='create-card'
            element={
              <ProtectedRoute onlyBiz>
                <CreateCard redirect="/my-cards" />
              </ProtectedRoute>
            } />
          <Route
            path='my-cards'
            element={
              <ProtectedRoute onlyBiz>
                <Mycards />
              </ProtectedRoute>
            } />
        </Routes>
      </main>
      <Footer />
      {/* בקומפוננטה כל מה שיועבר בין הפתיחה שלה לסגירה של הקומפוננטה יועבר לקומפוננטה כפרופס בשם צילדרן */}
    </div>

  );
}

export default App;
