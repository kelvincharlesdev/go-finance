import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PageLogin } from './pages/PageLogin';
import { PageRegister } from './pages/PageRegister';
import { LoggedUser } from './pages/PageUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />}/>
        <Route path="/loggedUser" element={<LoggedUser />}/>
      </Routes>
    </Router>
  );
}

export default App;
