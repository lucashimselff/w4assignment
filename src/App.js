import {ColorModeContext, useMode} from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {Routes, Route} from "react-router-dom";
import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";
import Portfolio from "./scenes/portfolio";
import Yearly from "./scenes/yearly";
import Daily from "./scenes/daily";
import Quarterly from "./scenes/quarterly";

function App() {
  const [theme, coloerMode] = useMode();
  return (
  <ColorModeContext.Provider value={coloerMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            {/* Routes for side Navi bar */}
            <Routes>
              <Route path="/" element={<Portfolio/>} />
              <Route path="/yearly" element={<Yearly/>} />
              <Route path="/quarterly" element={<Quarterly/>} />
              <Route path="/daily" element={<Daily/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
