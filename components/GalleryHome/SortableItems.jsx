import React from "react";
import { memo } from "react";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

const SortableItems = memo((props) => {
  const { index, value, handleSelected, item, id } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
    transition: {
      duration: 300,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
    animateLayoutChanges: (args) =>
      defaultAnimateLayoutChanges({
        ...args,
        wasDragging: true,
      }),
  });
// animation styles for the items
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    transformOrigin: "0 0",
    touchAction: "none",
  };

  return (
    <div
      className={
        index === 0
          ? `lg:col-span-2 lg:row-span-2 md:col-span-2  md:row-span-2 col-span-2 row-span-2  border-4 border-gray-300 rounded-md  relative cursor-grab transition-all md:h-[500px] h-[250px]`
          : `border-2 border-gray-300 rounded-md  relative cursor-grab transition-all md:h-[240px] h-[120px]`
      }
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}>
      <Image
        className={`absolute inset-0 object-cover border-4 border-white preview`}
        src={value}
        alt="image"
        fill
        priority
      />
      <div
        className={
          item.checked
            ? `bg-[rgba(204,196,196,0.7)] absolute h-full w-full left-0 top-0 bottom-0 right-0  transition-all`
            : `bg-[rgba(29,28,28,0.7)] absolute h-full accent-bg-white w-full left-0 top-0 bottom-0 right-0 opacity-0 transition-all hover:opacity-50`
        }>
        <input
          checked={item.checked}
          onChange={() => handleSelected(item.id)}
          className="absolute top-5 left-5 md:w-5 md:h-5  accent-blue-600 rounded-md "
          type="checkbox"
          name="checkbox"
          id="checkbox"
        />
      </div>
    </div>
  );
});
SortableItems.displayName = "SortableItems";
export default SortableItems;
