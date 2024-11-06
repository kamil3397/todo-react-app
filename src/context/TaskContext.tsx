import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { ListItem, TaskCategory } from 'types/ListTypes';
import { makeRequest } from 'hooks/makeRequest';

type TaskContextProps = {
  tasks: ListItem[];
  setTasks: (newTasks: ListItem[]) => void;
  deleteTask: (_id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
  fetchSingleTask: (taskId: string) => Promise<ListItem>;
  editTask: (task: ListItem) => Promise<void>;
  addTask: (newTask: Pick<ListItem, 'title' | 'description' | 'userId' | 'category' | 'startDate' | 'endDate'>) => Promise<void>;
  fetchUserId: () => Promise<string | null>;
};

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ListItem[]>([]);


  const fetchSingleTask = async (taskId: string): Promise<ListItem> =>
    await makeRequest('GET', `/tasks/${taskId}`)
      .then((res) => res?.data)
      .catch((err) => { throw new Error(err) });

  const deleteTask = async (_id: string) => {
    await makeRequest('DELETE', `/tasks/${_id}/delete`)
  };

  const editTask = async (task: ListItem) => {
    const { _id, ...rest } = task;
    await makeRequest('PUT', `/tasks/${_id}/update`, rest)
      .catch((error) => { throw new Error(error) });
  };

  const fetchTasks = async (): Promise<void> => {
    const userId = localStorage.getItem('userId');

    await makeRequest('GET', `/users/${userId}/tasks`)
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


  const addTask = async (newTask: { title: string, description: string, userId: string, category: TaskCategory }) => {
    await makeRequest('POST', '/tasks/add', newTask)
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
