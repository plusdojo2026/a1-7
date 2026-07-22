import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

const Draggable = ({ id, name, children, type, obj }) => {

  const [check_inf,setCheck_inf] = useState(false);

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
        check_inf,
    },
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };


  return (
    <div className="draggable" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );


};

export default Draggable;