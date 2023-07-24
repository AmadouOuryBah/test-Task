import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EntityListing from './components/EntityListing';
import EntityDetails from './components/EntityDetails';
import EntityForm from './components/EntityForm';
import { Request } from 'miragejs';

function App() {
  const queryString = window.location.search
  const urlParams  = new URLSearchParams(queryString);
  const entityId = urlParams.get('entityId');
  return (
        <div>
          <BrowserRouter>
           <nav class="navbar navbar-expand-lg bg-light">
              <div class="container">
              <a class="navbar-brand" href="/">Test-Task</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav ">
                    <li class="nav-item">
                    <a class="nav-link "  href="/"> List of entities</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link "  href="/addEntity"> Add entity</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
         <Routes>
          <Route path="/" exact element={<EntityListing/>} />
          <Route path="/entity/:entityId" exact element={<EntityDetails/>} />
          <Route path="/addEntity" exact element={<EntityForm/>} />
      </Routes>
     </BrowserRouter>

    </div>
  
  );
}

export default App;