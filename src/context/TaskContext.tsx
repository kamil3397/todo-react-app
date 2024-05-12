import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { ListItem } from 'types/ListTypes';
import { makeRequest } from 'hooks/makeRequest';
import { useConfirmation } from './DialogContext';

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
  const confirm = useConfirmation()

  const fetchSingleTask = async (taskId: string): Promise<ListItem> =>
    await makeRequest('GET', `/getTaskById/${taskId}`)
      .then((res) => res?.data)
      .catch((err) => { throw new Error(err) });

  const tryToDelete = async (_id: string) => {
    confirm({
      variant: "danger",
      catchOnCancel: true,
      title: "Are you sure you want to delete this task?",
      description: "If you will delete this task you will never get it back"
    })
      .then(async () => {
        await makeRequest('DELETE', `/deleteTaskById/${_id}`)
          .catch((error) => { throw new Error(error) });
      })
      .catch(() => console.log("Anulowano usuwanie zadania."));
  };


  const deleteTask = async (_id: string) => {
    await tryToDelete(_id);
  };

  const editTask = async (task: ListItem) => {
    const { _id, ...rest } = task;
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('accessToken not found in localStorage');
    }
    await makeRequest('PUT', `/updateTask/${_id}`, rest)
      .catch((error) => { throw new Error(error) });
  };

  const fetchTasks = async (): Promise<void> => {
    const userId = localStorage.getItem('userId');

    await makeRequest('GET', `/getAllTasks/${userId}`)
      .then((response) => {
        setTasks(response?.data)
      })
      .catch((error) => {
        throw new Error(error);
      });
  };


  const fetchUserId = async (): Promise<string | null> => {
    return await makeRequest('GET', '/userId')
      .then((res) => {
        return res?.data.userId;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };


  const addTask = async (newTask: { title: string, description: string, userId: string }) => {
    await makeRequest('POST', '/addTask', newTask)
      .catch((error) => {
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
