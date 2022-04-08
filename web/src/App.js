import { BrowserRouter } from 'react-router-dom'
import './App.css';

import Router from './pages/Router'

function App() {

    let isLogado = false;

    return (
        <BrowserRouter>
            <div className="App">
                <Router isUserLogado={isLogado} />
            </div>
    </BrowserRouter>
    );
}

export default App;
