import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import "./App.css";
import ItineraryCard from "./components/ItineraryCard";
import indiagate from "./assets/indiagate.jpg";
import RedFort from "./assets/Red-Fort.webp";
import Qutubminar from "./assets/Qutub-Minar.jpg";
import LotusTemple from "./assets/Lotus-Temple.jpg";
import Humayun from "./assets/Humayun.jpg";

const initialData = [
  {
    id: "1",
    name: "India Gate",
    rating: 4.6,
    reviews: 281124,
    description:
      "India Gate is a war memorial located in New Delhi, along the Rajpath.It is dedicated to the 82000 soldiers, both Indian and British",
    image: indiagate,
  },
  {
    id: "2",
    name: "Red Fort",
    rating: 4.5,
    reviews: 168729,
    description:
      "The Red Fort is a historical fort in the old Delhi area, on the banks of Yamuna.",
    image: RedFort,
  },
  {
    id: "3",
    name: "Qutub Minar",
    rating: 4.5,
    reviews: 151556,
    description:
      "Qutub Minar is a minaret or a victory tower located in the Qutub complex, a UNESCO World Heritage Site in Delhi's Mehrauli's area",
    image: Qutubminar,
  },
  {
    id: "4",
    name: "Lotus Temple",
    rating: 4.5,
    reviews: 67772,
    description:
      "Located in the national capital of New Delhi, the Lotus Temple is an edifice dedicated to the Baháʼí faith.",
    image: LotusTemple,
  },
  {
    id: "5",
    name: "Humayun's tomb",
    rating: 4.5,
    reviews: 46024,
    description:
      "Humayun's tomb is the final resting place of the Mughal Emperor Humayun.",
    image: Humayun,
  },
];

export default function App() {
  const [items, setItems] = useState(initialData);
  const [selectedMapUrl, setSelectedMapUrl] = useState("");

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleShowMap = async (placeName) => {
    try {
      const response = await fetch("http://localhost:5000/get-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ place: placeName }),
      });

      const data = await response.json();
      setSelectedMapUrl(data.map_url);
    } catch (error) {
      console.error("Failed to load map", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="kumar-one-outline-regular mb-4">Y2Z TRAVEL</h1>
      <div className="ml-25 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Itinerary</h1>
        <p className="text-[#8392AB]">Day</p>
      </div>

      <div className="flex gap-6">
        {/* Left: Itinerary Cards */}
        <div className="flex-1">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map((item, index) => (
                <ItineraryCard
                  key={item.id}
                  item={item}
                  index={index}
                  onDelete={handleDelete}
                  onShowMap={handleShowMap}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {/* Right: Map */}
        <div className="w-[500px] h-[600px] border rounded-xl shadow overflow-hidden">
          {selectedMapUrl ? (
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              src={selectedMapUrl}
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 p-4">
              Select a location to view map
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




