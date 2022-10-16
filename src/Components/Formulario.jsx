import React, {useState} from 'react';
import styled from '@emotion/styled';
import 'remixicon/fonts/remixicon.css';
import Error from './Error';
import PropTypes from 'prop-types';

const Form = styled.form `
    display: flex;
    flex-direction: column;
    padding: 1rem;
    color: white;
`;

const Button = styled.input `
    padding: .5rem;
    background-color: rgb(3, 115, 219);
    border-radius: 4px;
    border: none;
    font-weight: bold;
    color: white;
    transition: .3s;

    &:hover {
        cursor: pointer;
        background-color: rgb(2, 103, 197);
    }

    @media (max-width: 650px) {
        font-size: 16px;
        padding: 1rem;
        margin-bottom: 1rem;
    }
`;

const Formulario = ({search, setSearch, setConsultar}) => {

    //? State de errores
    const [Err, setError] = useState(false);

    //? Extraer ciudad y pais
    const {ciudad, pais} = search;

    //? Función que coloca los elementos en el state
    const handleChange = e => {
        //* Actualizar el state
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        }) 
    }

    //? Cuando el usuario da submit al form
    const handleSubmit = e => {
        e.preventDefault();

        //* Validar
        if(ciudad.trim() === '' || pais.trim() === '') {
            setError(true);
            return;
        }

        setError(false);

        //* Pasarlo al componente principal
        setConsultar(true); 
    }

    return ( 
        <Form
            onSubmit={handleSubmit}
        >
            {Err ? <Error mensaje = {'Todos los campos son obligatorios'}></Error> : null}

            <label htmlFor="ciudad">Ciudad:</label>
            <input 
                type="text" 
                name="ciudad" 
                id="ciudad" 
                placeholder='Coloque la ciudad' 
                value={ciudad}
                onChange={handleChange}
            />

            <label htmlFor="pais">País:</label>
            <select 
                name="pais" 
                id="pais"
                value = {pais}
                onChange = {handleChange}
            >
                <option value="" disabled>Seleccionar país de la ciudad</option>
                <option value="ar">Argentina</option>
                <option value="co">Colombia</option>
                <option value="cl">Chile</option>
                <option value="us">Estados unidos</option>
                <option value="mx">México</option>
                <option value="ve">Venezuela</option>
            </select>
            <Button type='submit' value='Buscar clima'></Button>
        </Form>
    );
}

Formulario.propTypes = {
    search: PropTypes.object.isRequired,
    setSearch: PropTypes.func.isRequired,
    setConsultar: PropTypes.func.isRequired
}

export default Formulario;