import { useState, MouseEvent, useEffect } from "react";
import { NextPage } from "next";
import { Weather } from "../pages/index";
import weather from "../pages/api/weather";
interface DropdownProps {
  onWeatherChange: (weathers: Weather[]) => void;
  weathers: Weather[];
}

const Dropdown: NextPage<DropdownProps> = ({
  weathers,
  onWeatherChange
}: DropdownProps) => {
  const [selected, setSelected] = useState("Kaikki kaupungit");
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleSelect = (event: MouseEvent<HTMLButtonElement>): void => {
    const filter = event.currentTarget.value;
    if (filter === "all") {
      onWeatherChange(weathers);
    } else {
      const visibleWeathers = weathers?.filter(
        weather => weather.current.id === filter
      );
      if (visibleWeathers.length > 0) {
        onWeatherChange(visibleWeathers);
      } else {
        onWeatherChange(weathers);
      }
    }
    toggleMenu();
  };
  return (
    <div className="relative">
      <button
        className="flex focus:outline-none justify-between border border-gray-300 bg-white py-3 px-4 w-full rounded-lg"
        onClick={toggleMenu}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{selected}</span>
        <span className="caret">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen ? (
        <ul
          role="menu"
          className="capitalize mt-1 w-full absolute border border-gray-300 bg-blue-100 py-3 px-4 shadow-lg rounded-lg"
        >
          <li role="menuitem">
            <button
              value="all"
              className="hover:text-gray-700"
              onClick={handleSelect}
            >
              Kaikki kaupungit
            </button>
          </li>
          {weathers.map(weather => (
            <li role="menuitem" key={`${weather.current.id}button`}>
              <button
                value={weather.current.id}
                className="hover:text-gray-700"
                onClick={handleSelect}
              >
                {weather.current.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
