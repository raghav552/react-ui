import { BrowserRouter as Router } from "react-router-dom"
import AppRouters from "./Router";
import { ModalVideoProvider } from "./Components/Video/ModalVideoContext";
import Navbar from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";

const App = () => {
    return(
        <Router>
            <Navbar />
            <Sidebar />
                <ModalVideoProvider>
                    <AppRouters />
                </ModalVideoProvider>
            <Footer/>
        </Router>
    );
}

export default App