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
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  
  const deleteTask = () => {
    const newTasks = tasks.filter((task)=> task.id !== id )
    console.log(newTasks) // dokonczyc
  }

//react useContext, przezuc tabele do Contextu  i funkcje na arrayach powtorzyc

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

  const handleSave = () => {
    if (task) {
      const newTask = {...task, title: title, description: desc}
      console.log('NEW_TASK', newTask);
      const newTasks = [
      ...tasks.filter((myTask) => myTask.id !== newTask.id),
      newTask,
    ];
      setTasks(newTasks);
      setIsEditing(false);
    }
  };

  const fetchTask = async () => {
    return await tasks.find((task) => task.id === id);
  };

  useEffect(() => {
    fetchTask().then((task) => {
      if (task) {
        setTask(task);
        setTitle(task.title);
        setDesc(task.description);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={() => handleSave()}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </EditWrapper>
        ) : (
          <>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskInfo>{task.description}</TaskInfo>
            <TaskInfo>{task.status}</TaskInfo>
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
            <DeleteButton onClick={() => deleteTask()}>Delete this task</DeleteButton>
          </>
        )}
      </TaskWrapper>
    </>
  );
};

export default SingleTask;
