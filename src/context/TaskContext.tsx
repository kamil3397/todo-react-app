import { FC, ReactNode, createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ListItem } from 'types/ListTypes';

type TaskContextProps = {
  tasks: ListItem[];
  setTasks: (newTasks: ListItem[]) => void;
  deleteTask: (_id: string) => void;
  fetchTasks: () => Promise<void>;
  fetchSingleTask: (taskId: string) => Promise<ListItem>;
  editTask: (task: ListItem) => void;
  addTask: (newTask: Pick<ListItem, 'title' | 'description' | 'userId'>) => Promise<void>;
  fetchUserId: () => Promise<string | null>;
};

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ListItem[]>([]);

  const fetchSingleTask = async (taskId: string): Promise<ListItem> =>
    await axios.get(`http://localhost:4000/getTaskById/${taskId}`)
      .then((res) => res.data)
      .catch((err) => { throw new Error(err) });

  const deleteTask = (_id: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('accessToken not found in localStorage');
    }
    if (window.confirm('Czy na pewno chcesz usunąć?')) { //zmienic to np na modal z mui?
      axios.delete(`http://localhost:4000/deleteTaskById/${_id}`, {
        headers: {
          Authorization: token
        }
      })
        .catch((error) => { throw new Error(error) });
    }
  };

  const editTask = async (task: ListItem) => {
    const { _id, ...rest } = task;
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('accessToken not found in localStorage');
    }
    await axios.put(`http://localhost:4000/updateTask/${_id}`, rest, {
      headers: {
        Authorization: token
      }
    })
      .catch((error) => { throw new Error(error) });
  };

  const fetchTasks = async (): Promise<void> => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      throw new Error('userId not found in localStorage');
    }
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('accessToken not found in localStorage');
    }
    await axios.get(`http://localhost:4000/getAllTasks/${userId}`, {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        setTasks(response.data)
      })
      .catch((error) => {
        throw new Error(error);
      });
  };


  const fetchUserId = async (): Promise<string | null> => {
    return await axios.get("http://localhost:4000/userId")
      .then((res) => {
        return res.data.userId;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };


  const addTask = async (newTask: { title: string, description: string, userId: string }) => {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      throw new Error('accessToken not found in localStorage')
    }
    await axios.post("http://localhost:4000/addTask", newTask, {
      headers: {
        Authorization: token
      }
    }).catch((error) => {
      throw new Error(`Error while adding task: ${error}`)
    });
  }
  const contextValues: TaskContextProps = {
    tasks,
    setTasks,
    deleteTask,
    fetchTasks,
    fetchSingleTask,
    editTask,
    addTask,
    fetchUserId,
  };

  return (
    <TaskContext.Provider value={contextValues}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext musi być używane wewnątrz TaskProvider');
  }
  return context;
};
