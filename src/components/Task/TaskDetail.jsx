import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Task.css";
import { toast } from "react-toastify";
function TaskDetail() {
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const [singleTask, setSingleTask] = useState("");
  const navigate=useNavigate()
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/EditTask/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token})}`,
            },
          }
        );
        setSingleTask(data);
      } catch (error) {
        console.log(error);
        toast.error("somthing went wrong");
      }
    })();
  }, []);
  return (
    <div className="content">
      {singleTask ? (
        <div className="task1">
          <h3>{singleTask.title}</h3>
          <p>{singleTask.description}</p>
          {singleTask.status?(<p>Task Completed</p>):(<p>Task is in pending</p>)}
          <button className="close" onClick={()=>navigate("/view")}>Close</button>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
export default TaskDetail;
