import { useDroppable } from "@dnd-kit/core";
import "../css/ProductSorting.css";

const Droppable = ({ children, id }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`droppable ${isOver ? "over" : ""}`}
    >
      {/* <h3 className="droppable-title">
        ドロップエリア
      </h3> */}

      {children}
    </div>
  );
};

export default Droppable;