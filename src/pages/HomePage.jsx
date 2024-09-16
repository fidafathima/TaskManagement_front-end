import Header from "../components/Header/Header";
import Sidebar from "../components/Header/Sidebar";
import Tasks from "../components/Task/Tasks";


function HomePage() {
    return (
      <><Sidebar/>
        <Header/>
        <Tasks/>
        
      </>
    );
  }
  export default HomePage;