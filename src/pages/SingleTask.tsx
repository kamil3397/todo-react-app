import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import {
  TaskWrapper,
  TaskTitle,
  TaskInfo,
  DeleteButton,
  CompleteButton,
  InProgressButton,
  EditButton,
  CloseButton,
  EditWrapper,
} from "layouts/SingleTaskPage";
import { ListItem } from "types/ListTypes";

const SingleTask: FC = () => {
  const [tasks, setTasks] = useState<ListItem[]>([
    {
      id: "1234",
      title: "Title",
      description: "Description",
      status: "Completed",
      action: "Action button",
    },
    {
      id: "43121",
      title: "Title2",
      description: "Description2",
      status: "Completed2",
      action: "Action button2",
    },
    {
      id: "asd123",
      title: "Zrób Homework",
      description: "Aplikacja TODO",
      status: "In Progress",
      action: "Check details",
    },
  ]); // to jest nasz mock kolekcji w bazie danych

  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<ListItem>();
  const [editedTask, setEditedTask] = useState<ListItem>();
  
  // Napisz funkcje do zmiany statusu(JEDNA FUNKCJE, a nie trzy razy useState i settery)

  const handleStatusChange = (id: string, newStatus: string) => {
    const updatedTask = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: newStatus };
      }
      return task;
    });

    setTasks(updatedTask)

    console.log(`Zadanie o id ${id} zmieniło status na ${newStatus}.`);

  };

  // const editTaskTitle = (value: string) => {
  //   if (task) {
  //     const editedTask = { ...task, title: value };
  //     setEditedTask(editedTask);
  //   }
  // }; // napisz funkcje do zmiany description (lub przerob editTaskTitle tak zeby zmieniala albo title albo description) oraz obsluz bledy (if/else);

const editTask = (field: "title"|"description", value:string)=>{
  if(task){
    const editedTask = {...task, [field]: task}
    setEditedTask(editedTask)
    console.log("Edited Task:", editedTask)
  }
}

  const handleSave = () => {
    if (editedTask && task !== editedTask) {
      // const filteredTasks = tasks.filter((myTask) => myTask.id !== editedTask.id); // to jest zbedne, przekazalismy to nizej i w ten sposob mamy jedna zmienna
      const newTasks = [
        ...tasks.filter((myTask) => myTask.id !== editedTask.id),
        editedTask,
      ];
      setTasks(newTasks);
    }
    setIsEditing(false);
  };

  // const handleClose = () => {
  //   navigate("/"); // zrobić jak handleCancelEdit
  // };

  // const handleEdit = () => {
  //   setIsEditing(true); // zrobić jak handleCancelEdit
  // };

  // const handleCancelEdit = () => {
  //   setIsEditing(false); // zmienić w onClicku na () => setIsEditing(false); robi to w zasadzie to samo ale nie tworzymy zbednych funkcji
  // };

  const fetchTask = async () => {
    return await tasks.find((task) => task.id === id);
  };

  useEffect(() => {
    fetchTask().then((task) => {
      if (task) {
        setTask(task);
      }
    });
  }, [tasks]);

  if (!task) {
    return <p>Task not found</p>;
  }

  return (
    <>
      <TaskWrapper>
        {!isEditing && (
          <EditButton onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </EditButton>
        )}
        {!isEditing && (
          <CloseButton onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseButton>
        )}
        {isEditing ? (
          <EditWrapper>
            <input
              type="text"
              value={task.title}
              onChange={(e) => editTask("title",e.target.value)}
            />
            <textarea
              value={task.description}
              onChange={(e) => editTask("description", e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </EditWrapper>
        ) : (
          <>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskInfo>{task.description}</TaskInfo>
            <CompleteButton
              onClick={() => handleStatusChange(task.id, "Completed")}
            >
              Task completed
            </CompleteButton>
            <InProgressButton
              onClick={() => handleStatusChange(task.id, "In Progress")}
            >
              In Progress
            </InProgressButton>
            <DeleteButton>Delete this task</DeleteButton>
          </>
        )}
      </TaskWrapper>
    </>
  );
};

export default SingleTask;
