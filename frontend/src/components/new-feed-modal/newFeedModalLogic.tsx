import { useState } from "react";

export const useNewFeedModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return { isModalOpen, setIsModalOpen };
};
