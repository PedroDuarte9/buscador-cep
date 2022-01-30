
import {useState} from 'react';
//import {nome do icone desejado} from 'biblioteca'
import {FiSearch} from 'react-icons/fi';
import api from './services/api';
import './style.css';



function App() {

  const [input, setInput] = useState('');

  const [cep, setCep] = useState({});

  async function clicandoBotao(){
    //01310930/json/

    if(input === ''){
      alert('Preencha algum CEP')
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      console.log(response.data)
      setCep(response.data)
      setInput("")

    }catch{
      alert('OPS ERRO AO BUSCAR ESTE CEP')
      setInput("")

      

    }

  }
 
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder='Digite seu CEP'
        value={input}
        onChange={(e) =>setInput(e.target.value)}
        />
      

        <button className="botaoSearch" onClick={clicandoBotao}>
          <FiSearch size={25} color='#' />
        </button>
        </div>
    
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span> {cep.bairro} </span>
          <span>{cep.localidade} - {cep.uf} </span>

        </main>
      )}
      

    </div>
  );
}



export default App;
