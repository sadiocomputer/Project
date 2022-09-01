import React from 'react';
import { BrowserRouter as Router  , Routes,Route, Navigate  } from 'react-router-dom';

import Login from './components/Login';
import Client from './components/Clients/Client';
import Index from './components/Home/Index';
import NotFound from './components/Pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import Versement from './components/versements/Versement';
import ClientHome from './components/Clients/ClientHome';
import Transaction from './components/transactions/Transaction';
import Settings from './components/parametre/Settings';
import EditerClient from './components/Clients/EditerClien';
import Emprunt from './components/Emprunt/Emprunt';
import InventaireClient from './components/Inventaires/InventaireClient';
import ListUsers from './components/parametre/users/ListUsers';
import Apropos from './components/apropos/Apropos';


const App = () => {

  
  
  
return (
  <Router>
      <Routes>
          <Route  element={<ProtectedRoute/>} >
               

              <Route path='/home' element={<Index />} />
              <Route path='/versement' element={<Versement  />} />
              <Route path='/add-client' element={<Client />} />
              <Route path='/client' element={<ClientHome />} />
              <Route path='/transactions' element={<Transaction />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/settings-users' element={<ListUsers />} />
              <Route path='/a-propos' element={<Apropos />} />
              <Route path='/emprunt' element={<Emprunt />} />
              <Route path='/client/editer/:id' element={<EditerClient />} />

              <Route path='/inventaire/client/:id' element={<InventaireClient />} />

          </Route>

          <Route exact path='/login' element={<Login />} />
          <Route path='/' element={<Navigate to= "/login"></Navigate>} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    
    </Router>
    
  );
};

export default App;