import { GripVertical, Pencil, Trash2, Paperclip } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import map from '../assets/map.png';

export default function ItineraryCard({ item, index, onDelete, onShowMap }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow mb-4"
    >
      <div {...attributes} {...listeners} className="cursor-grab mt-2 text-gray-400">
        <GripVertical />
      </div>
      <div className="text-white w-8 h-8 flex items-center justify-center rounded-full bg-fuchsia-600 font-bold">
        {index + 1}
      </div>
      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <div className="flex gap-3 mt-3">
            <button className="cursor-pointer" onClick={() => onShowMap(item.name)}>
              <img src={map} className='w-6 h-6' alt="Location Icon" />
            </button>
            <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
              <Paperclip />
            </button>
            <button className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => onDelete(item.id)}>
              <Trash2 />
            </button>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 gap-1 mt-1">
          <span>⭐ {item.rating}</span>
          <span className="text-gray-400">({item.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          <button className="text-gray-500 hover:text-gray-700">
            <Pencil size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}







