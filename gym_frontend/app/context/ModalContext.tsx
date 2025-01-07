// context/ModalContext.js
import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from "react";
import { Task } from "react-native";

interface ModalContextProps {
  isModalVisible?: boolean;
  currentTask?: Task | null;
  openModal?: (task: Task) => void;
  closeModal?: () => void;
}

const ModalContext = createContext<ModalContextProps>({});

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const openModal = (task: Task) => {
    setCurrentTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setCurrentTask(null);
    setModalVisible(false);
  };

  return (
    <ModalContext.Provider
      value={{ isModalVisible, currentTask, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
