import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
  return (
    <div class="sidenav">
      <a onClick={() => navigate("/head")}><i class="fa-solid fa-plus"></i>  Add tasks</a>
      <a onClick={() => navigate("/view")}><i class="fa-solid fa-list-check"></i>  All tasks</a>
      <a onClick={() => navigate("/Pending")}><i class="fa-regular fa-hourglass-half"></i>  Pending</a>
      <a onClick={() => navigate("/completed")}><i class="fa-solid fa-list"></i>  Completed</a>
    </div>
  );
}
export default Sidebar