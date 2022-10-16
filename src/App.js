import React, {Fragment, useState, useEffect} from 'react';
import styled from '@emotion/styled';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Resultado from './Components/Resultado';
import Error from './Components/Error';

const Contenedor = styled.main `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;


function App() {
  const [search, setSearch] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, setConsultar] = useState(false);

  const [resultado, setResultado] = useState({});

  const {ciudad, pais} = search;

  const [err, setErr] = useState(false);
  
  useEffect(() => {
    const consultarAPI = async () => {
      if(consultar) {
        const appId = '416344e260b7a0a0d0953c2005528670';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsultar(false);

        //* Decteta errores
        if(resultado.cod === '404') {
          setErr(true);
        } else {
          setErr(false);
        } 
      }
    }
    
    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);

  //? Carga de componente condicional
  let componente;

  if(err) {
    componente = <Error mensaje = 'No se encontró resultados'/>
  } else {
    componente = <Resultado resultado = {resultado}/>
  }

  return (
    <>
      <Header
        titulo = 'Clima React App'
      />

      <Contenedor>
        <Formulario
          search = {search}
          setSearch = {setSearch}
          setConsultar = {setConsultar}
        />

        {ciudad || pais ? componente : null }
      </Contenedor>
    </>
  );
}

export default App;
