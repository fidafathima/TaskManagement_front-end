import { useSelector } from "react-redux";
import "./Task.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SingleTask({ task, onupdate, ondelete, onStatus, changeStatus }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/EditTask/${task.id}/`,
        inputValue,
        {
          headers: {
            Authorization: `Bearer ${token})}`,
          },
        }
      );
      onupdate(response.data);
      setEditable(false);
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task.");
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/EditTask/${task.id}/`, {
        headers: {
          Authorization: `Bearer ${token})}`,
        },
      });
      ondelete(task.id);
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };
  const handleStatus = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/ChangeStatus/${task.id}/`,
        inputValue,
        {
          headers: {
            Authorization: `Bearer ${token})}`,
          },
        }
      );
      onStatus(response.data);
      toast.success("Task done !");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task.");
    }
  };
  const handleStatus2 = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/ChangeStatus2/${task.id}/`,
        inputValue,
        {
          headers: {
            Authorization: `Bearer ${token})}`,
          },
        }
      );
      changeStatus(response.data);
      toast.success("Task is in pending !");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task.");
    }
  };

  return (
    <div>
      {task ? (
        <div>
          {editable ? (
            <div className="box0">
              <input
                className="box"
                type="text"
                name="title"
                value={inputValue.title}
                onChange={handleInputChange}
              />
              <textarea
                className="box"
                rows="6" cols="50"
                type="text"
                name="description"
                value={inputValue.description}
                onChange={handleInputChange}
              />
              <div className="box1">
                <button className="b4" onClick={handleUpdate}>
                  Update
                </button>
                <button className="b4" onClick={() => setEditable(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="task1">
              <div onClick={() => navigate(`/task/${task.id}`)}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div className="wrap">
                <div className="icon">
                  <i
                    class="fa-solid fa-pen-to-square"
                    onClick={() => setEditable(true)}
                  ></i>
                  <i class="fa-solid fa-trash" onClick={handleDelete}></i>
                </div>
                <div>
                  {task.status ? (
                    <i
                      className="fa-solid fa-square-check"
                      onClick={handleStatus2}
                    ></i>
                  ) : (
                    <i onClick={handleStatus} class="fa-regular fa-square"></i>
                  )}
                </div>
              </div>
              <div></div>
            </div>
          )}
        </div>
      ) : (
        <p>Add a task!</p>
      )}
    </div>
  );
}

export default SingleTask;
