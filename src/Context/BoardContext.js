import React, { useContext, useMemo, useState } from 'react';

const boardClickContext = React.createContext();

export const useBoardClick = () => useContext(boardClickContext);

const BoardContext = ({ children }) => {
  const [boardClick, setBoardClick] = useState(false);

  const clickBoard = useMemo(() => {
    return { boardClick, setBoardClick };
  }, [boardClick]);
  return (
    <boardClickContext.Provider value={clickBoard}>
      {children}
    </boardClickContext.Provider>
  );
};

export default BoardContext;
