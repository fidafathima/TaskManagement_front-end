import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AllTaskPage from "../pages/AllTaskPage";
import SingleTask from "../pages/SingleTask";
import PendingPage from "../pages/PendingPage";
import CompletedPage from "../pages/CompletedPage";


function Router(){
    return(
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/head" element={<HomePage/>}/>
            <Route path="signup" element={<SignupPage/>}/>
            <Route path="/view" element={<AllTaskPage/>}/>
            <Route path="task/:id" element={<SingleTask/>}/>
            <Route path="Pending" element={<PendingPage/>}/>
            <Route path="completed" element={<CompletedPage/>}/>

        </Routes>
    )
}
export default Router;