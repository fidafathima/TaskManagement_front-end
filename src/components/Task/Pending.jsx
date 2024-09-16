import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Task.css";
import SingleTask from "./SingleTask";
import { useSelector } from "react-redux";

function Pending() {
  const [tasks, setTasks] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/Pending",{
          headers: {
            Authorization: `Bearer ${token})}`,
          },
        });
        setTasks(data);

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    })();
  }, []);
  console.log(tasks);
  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  const StatusUpdate = (updatedStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedStatus.id ? updatedStatus : task))
    );
  };
  const StatusUpdate2 = (Status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === Status.id ? Status : task))
    );
  };
  return (
    <div className="content2"> 
      <div>
        {tasks.map((task) => (
          <SingleTask
            key={task.id}
            task={task}
            onupdate={handleTaskUpdate}
            ondelete={handleTaskDelete}
            onStatus={StatusUpdate}
            changeStatus={StatusUpdate2}
          />
        ))}
      </div>
    </div>
  );
}
export default Pending;
