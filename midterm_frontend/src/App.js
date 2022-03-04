import logo from './logo.svg';
import './App.css';
import AppList from './appointment/appointment'
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Brand } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<AppList />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function Layout() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav className="me-auto">
            </Nav>
          </Container>
        </Navbar>
        <Container className='mt-3 col-5'>
          {/* <h1>child</h1> */}
          <Outlet />
        </Container>

      </>
    );
}

export default App;
