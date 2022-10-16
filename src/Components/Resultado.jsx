import React from 'react';
import styled from '@emotion/styled';
import 'remixicon/fonts/remixicon.css';
import PropTypes from 'prop-types';

const Container = styled.div `
    background-color: #222;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    color: white;
`;

const Text = styled.h1 `
    font-size: 22px;
`;

const Temp = styled.p `
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    font-weight: bold;
    font-size: 3.5rem;

    i {
        margin-left: 10px;
        font-weight: 100;
    }
`;

const Resultado = ({resultado}) => {
    //? Extraer los valores
    const {main, name} = resultado;

    if(!name) return null;

    //? Grados kelvin
    const kelvin = (temp) => (parseFloat(temp - 273.15, 10).toFixed(2));

    return ( 
        <Container>
            <Text>El clima en {name} es de:</Text>
            <Temp>{kelvin(main.temp)} <i className="ri-celsius-fill"></i></Temp>
            <p className='alert danger'><i className="ri-temp-hot-fill right"></i>Temperatura Máxima: {kelvin(main.temp_min)}<i className="ri-celsius-fill left"></i></p>
            <p className='alert primary'><i className="ri-temp-cold-fill right"></i>Temperatura Minima: {kelvin(main.temp_max)}<i className="ri-celsius-fill left"></i></p>
        </Container>
    );
}

Resultado.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Resultado;