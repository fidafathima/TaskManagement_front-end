import {  useState } from "react";
import "./Task.css";
import SingleTask from "./SingleTask";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

function Tasks() {
  const [task,setTask]=useState("")
  const token=useSelector((state) => state.user.token)
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Add your task"),
      description: yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/Task", {
          title: values.title,
          description: values.description,
        },{
          headers: {
            Authorization: `Bearer ${token})}`,
          },
        });
        formik.resetForm();
        setTask(response.data)
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });
  console.log(task);
  

  return (
    <div className="content">
      <form className="box0" onSubmit={formik.handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={formik.values.title}
            className="box"
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Description
          <textarea
          rows="6" cols="50"
            type="text"
            name="description"
            value={formik.values.description}
            className="box"
            onChange={formik.handleChange}
          />
        </label>
        <button className="b2" type="submit">
          < i type="submit" class="fa-solid fa-plus"></i>
        </button>
      </form>
      {
        <SingleTask task={task}
         />
      }
    </div>
  );
}

export default Tasks;
