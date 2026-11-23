import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TypeProvider, SideBarProvider, ScaleProvider } from './context/MainContext.tsx'

createRoot(document.getElementById('root')!).render(
    <SideBarProvider>
        <TypeProvider>
            <ScaleProvider>
                <App />
            </ScaleProvider>
        </TypeProvider>
    </SideBarProvider>,
)
