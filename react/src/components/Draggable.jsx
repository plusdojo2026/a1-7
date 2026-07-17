import { useDraggable } from "@dnd-kit/core";

const Draggable = ({ id, name, children, type, obj }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id,
    data:{
        name,
        type,
        obj,
    },
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="draggable"
    >
      {children}
    </div>
  );
};

export default Draggable;