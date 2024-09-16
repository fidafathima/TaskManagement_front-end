import Header from "../components/Header/Header";
import Sidebar from "../components/Header/Sidebar";
import Pending from "../components/Task/Pending";

function PendingPage() {
    return (
      <><Sidebar/>
        <Header/>
        <Pending/>
        
      </>
    );
  }
  export default PendingPage;