import React, {useState} from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import {Grid} from './Grid';
import {SortablePhoto} from './SortablePhoto';
import {Photo} from './Photo';
import photos from './photos.json';

const UploadGallery = () => {
  const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState('');
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  
  return (
     <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
     >
       <SortableContext items={items} strategy={rectSortingStrategy}>
         <Grid columns={4}>
           {items.map((url, index) => (
              <SortablePhoto key={index} url={url} index={index} />
           ))}
         </Grid>
       </SortableContext>
       
       <DragOverlay adjustScale={true}>
         {activeId ? (
            <Photo url={activeId} index={items.indexOf(activeId)} />
         ) : null}
       </DragOverlay>
     </DndContext>
  );
  
  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }
  
  function handleDragEnd(event: any) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setItems(() => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    
    setActiveId('');
  }
  
  function handleDragCancel() {
    setActiveId('');
  }
};

export default UploadGallery;
