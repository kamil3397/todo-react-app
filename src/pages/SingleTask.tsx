import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import {useNavigate } from 'react-router-dom';
import {useState} from 'react'
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

function SingleTask() {

  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("Task Title");
  const [editedInfo, setEditedInfo] = useState("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam expedita obcaecati sunt eos aspernatur temporibus commodi a vel, impedit unde.");


  const handleClose = ()=>{
    navigate('/home')
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);

  };

  return (
    <>
      <TaskWrapper>
        {!isEditing && (
          <EditButton onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </EditButton>
        )}
        {!isEditing && (
          <CloseButton onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseButton>
        )}
        {isEditing ? (
          <EditWrapper>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedInfo}
              onChange={(e) => setEditedInfo(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </EditWrapper>
        ) : (
          <>
            <TaskTitle>{editedTitle}</TaskTitle>
            <TaskInfo>{editedInfo}</TaskInfo>
            <CompleteButton>Task completed</CompleteButton>
            <InProgressButton>In Progress</InProgressButton>
            <DeleteButton>Delete this task</DeleteButton>
          </>
        )}
      </TaskWrapper>
    </>
  );
}

export default SingleTask;
