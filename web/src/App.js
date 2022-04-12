import { BrowserRouter } from 'react-router-dom'
import './App.css';

import Router from './pages/Router'
import informacoesUser from './config.json'

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Router dadosUser={informacoesUser} />
            </div>
    </BrowserRouter>
    );
}

export default App;
