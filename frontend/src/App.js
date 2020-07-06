import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {
  const [devs, setDevs] = useState([])


  useEffect(() => {
    async function loadDevs() {
      try {
        const response = await api.get('/devs')
        setDevs(response.data)
      } catch (error) {
        alert('Erro ao carregar devs')        
      }
    }
    loadDevs()
  }, [])

  async function handleSubmit(data) {
    try {
      const response = await api.post('devs', data)

      setDevs([...devs, response.data])
    } catch (error) {
      alert('Erro ao adicionar novo dev')      
    }

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        

        </ul>

      </main>
    </div>
  );
}

export default App;
