import { BrowserRouter } from 'react-router-dom'
import './App.css';

import Router from './pages/Router'
import UserProvider from './api/userContext-api/userProvider';

function App() {

    let key = 'token';
    localStorage.setItem(key, '""');

    return (
        <BrowserRouter>
            <UserProvider>
                <div className="App">
                    <Router />
                </div>
            </UserProvider>
    </BrowserRouter>
    )
}

export default App;
