import logo from './logo.svg';
import './App.css';
import Routes from './routes/routes'
import UserContextProvider from './services/context/contextApi/MedicoContext'
import PacienteContextProvider from './services/context/contextApi/PacienteContext'
import RecepcionistaContextProvider from './services/context/contextApi/RecepcionistaContext'

import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';


function App() {
  return (
<RecepcionistaContextProvider>
<PacienteContextProvider>
<UserContextProvider>
    <div className="App">
    
      <Routes/>
    </div>
</UserContextProvider>
</PacienteContextProvider>
</RecepcionistaContextProvider>
  );
}

export default App;
