import {useState} from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-hidden min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;