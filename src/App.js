import Gameboard from './pages/Gameboard';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import BoardContext from './Context/BoardContext';
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BoardContext>
        <Gameboard />
      </BoardContext>
    </DndProvider>
  );
}

export default App;
