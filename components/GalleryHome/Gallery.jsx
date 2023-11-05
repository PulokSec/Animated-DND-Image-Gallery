import React, { useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Image from "next/image";
import { images } from "../images/Images";
import SortableItem from "./SortableItems";

export default function GalleryHome() {
  const [items, setItems] = useState(images);
  const [deleted, setDeleted] = useState([]);
  const [drag, setDrag] = useState(null);

  //Ref for the dnd context
  const dndRef = useRef(null);

  // Sensors to track the pointer, mouse, touch, and keyboard

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Handlers for the dnd context

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setDrag(null);
  }

  const handleDragCancel = () => setActiveElm(null);
  
  const handleDragStart = (event) => {
    const { active } = event;
    setDrag(items.find((item) => item.id === active.id));
  };

// Blob url for the image
  const loadFile = (file) => {
    const blobUrl = URL.createObjectURL(file);
    return blobUrl;
  };
  // Add files to the gallery
  const addFiles = (event) => {
    const newFiles = Array.from(event.target.files);
    const value = loadFile(newFiles[0]);
    const newItems = {
      id: items?.length + 1,
      value: value,
      checked: false,
    };
    setItems([...items, newItems]);
  };

 // Handle the checkbox
  const handleChange = () => {
    const updated = items.map((item) => {
      return { ...item, checked: false };
    });
    setItems(updated);
    setDeleted([]);
  };

  const handleSelected = (id) => {
    console.log(id);
    const updated = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    const deleteItem = updated.filter((item) => {
      if (item.checked) {
        return item;
      }
    });
    setItems(updated);
    setDeleted(deleteItem);
  };
  // Remove the file from the gallery
  const removeFile = () => {
    const tempArray = items.filter((item) => {
      if (!item.checked) {
        return item;
      }
    });
    setItems(tempArray);
    setDeleted([]);
  };
  

  return (
    <div className="bg-white shadow-xl rounded-md w-9/12 mx-auto mb-5">
      {deleted.length > 0 ? (
        <>
          <div className="flex lg:flex-row rounded-t-md md:flex-col flex-row my-5  bg-white justify-between w-[100%] py-5 px-5 border-b-2 border-b-gray-300">
            <div className="flex items-center ">
              <input
                checked={true}
                onChange={handleChange}
                className="md:w-5 md:h-5 accent-blue-600"
                type="checkbox"
                name=""
                id=""
              />
              <p className="md:ml-5 ml-2 md:text-lg font-bold text-black">
                {deleted.length === 1
                  ? `${deleted.length} File Selected`
                  : `${deleted.length} Files Selected`}
              </p>
            </div>
            <div>
              <button
                onClick={removeFile}
                className="border-none md:text-lg text-red-600 font-medium lg:m-0 hover:underline">
                Delete File
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <nav className=" text-xl bg-white font-bold w-full border-b-2 border-b-gray-300 px-5 my-5 py-5 rounded-t-md">
            <h1 className="text-black text-lg">Gallery</h1>
          </nav>
        </>
      )}
      <div className="relative flex flex-col p-4 text-gray-800 rounded">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          collisionDetection={closestCenter}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}>
            {/* Sortable context for the items */}

          <SortableContext items={items} strategy={rectSortingStrategy}>
            <div className="grid rounded-b-md bg-white lg:grid-cols-5 md:grid-cols-3 grid-cols-2 xs:grid-cols-1 gap-4 w-[100%] md:py-8 py-2">
              {items?.map((item, idx) => (
                <SortableItem
                  key={item?.id}
                  id={item?.id}
                  value={item?.value}
                  index={idx}
                  handleSelected={handleSelected}
                  item={item}
                />
              ))}
              {/* Ui Element that appears while dragging on another */}
              <DragOverlay
                adjustScale={true}
                modifiers={[restrictToWindowEdges]}
                zIndex={10}
                className="cursor-grabbing overflow-hidden rounded-lg border bg-white shadow-md">
                {!!drag && (
                  <Image
                    className="absolute inset-0 w-full h-full border-4 border-white preview object-cover"
                    src={drag.value}
                    alt={drag.id}
                    fill
                    priority
                  />
                )}
              </DragOverlay>
              {/* Ui Element that appears when there are no images */}
              <div
                ref={dndRef}
                className={`relative border-2 border-dashed border-gray-400 rounded-md  flex flex-col justify-center items-center w-full cursor-pointer md:h-[240px] h-[120px]`}>
                <input
                  accept="*"
                  type="file"
                  multiple
                  className="absolute inset-0 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                  onChange={addFiles}
                />
                <div className="flex flex-col items-center justify-center md:py-14 text-center">
                  <svg
                    className="w-6 h-6 mr-1 text-current-50"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="m-0 text-xs md:text-lg">Add Images</p>
                </div>
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
