'use client';

import { cn } from '../../../utils';
import { Icon } from '../../icons';
import { Checkbox } from '../Checkbox';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ColumnOption = {
  id: string;
  label: string;
  visible: boolean;
};

type ColumnToggleGridProps = {
  options: ColumnOption[];
  onToggle: (id: string) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  columns?: 2 | 3;
  className?: string;
};

const SortableItem = ({
  option,
  onToggle,
}: {
  option: ColumnOption;
  onToggle: (id: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center justify-between h-[52px] p-[8px] rounded-[12px] bg-white transition-colors cursor-pointer select-none touch-none shadow-[0_1.25px_5px_0_rgba(0,0,0,0.04)]',
        isDragging ? 'opacity-50 shadow-lg z-10' : '',
        option.visible
          ? 'border-2 border-black'
          : 'border border-C-Gray-D'
      )}
      onClick={() => onToggle(option.id)}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-[4px] px-[4px] py-[8px] flex-1">
        <Icon.Hamburger className="shrink-0 text-C-Gray-8" size={12} />
        <span className="text-body-12-b text-black">{option.label}</span>
      </div>
      <Checkbox checked={option.visible} />
    </div>
  );
};

export const ColumnToggleGrid = ({
  options,
  onToggle,
  onReorder,
  columns = 2,
  className,
}: ColumnToggleGridProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !onReorder) return;

    const oldIndex = options.findIndex((o) => o.id === active.id);
    const newIndex = options.findIndex((o) => o.id === over.id);
    onReorder(oldIndex, newIndex);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={options.map((o) => o.id)} strategy={verticalListSortingStrategy}>
        <div
          className={cn(
            'flex flex-wrap gap-[8px]',
            className
          )}
        >
          {options.map((option) => (
            <div key={option.id} className={columns === 2 ? 'w-[calc(50%-4px)]' : 'w-[calc(33.33%-6px)]'}>
              <SortableItem option={option} onToggle={onToggle} />
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
