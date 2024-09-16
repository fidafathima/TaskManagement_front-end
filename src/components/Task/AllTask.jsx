import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Task.css";
import SingleTask from "./SingleTask";
import { useSelector } from "react-redux";

function AllTask() {
  const [tasks, setTasks] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/task?page=${currentPage}&page_size=${pageSize}&search=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token})}`,
            },
          }
        );
        setTasks(data.results);
        TotalPage(data.count);
      } catch (error) {
        console.log(error);
        toast.error("Somthing went wrong");
      }
    })();
  }, [currentPage, pageSize, searchQuery]);

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
      prevTasks.map((task) =>
        task.id === updatedStatus.id ? updatedStatus : task
      )
    );
  };
  const StatusUpdate2 = (Status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === Status.id ? Status : task))
    );
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const TotalPage = (page) => {
    let count = page / 3;
    setTotalPages(count);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };
  return tasks ? (
    <div>
      <div className="content2">
        <div>
          <input
            className="box"
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
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
      <div className="content3">
        <button
          className="page"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="page"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  ) : (
    <div>
      <p>No tasks added!</p>{" "}
    </div>
  );
}
export default AllTask;
