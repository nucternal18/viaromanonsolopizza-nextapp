import { FC } from "react";

// redux
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { menuSelector, setSelectedMenu } from "@features/menu/menuSlice";

type MenuItemButtonNameProps = {
  name: "Cuccina" | "Pizze" | "Dessert" | "La Nostra Cantina";
};

const MenuItemButton: FC<MenuItemButtonNameProps> = ({
  name,
}: MenuItemButtonNameProps) => {
  const dispatch = useAppDispatch();
  const { selectedMenu } = useAppSelector(menuSelector);
  return (
    <button
      onClick={() => dispatch(setSelectedMenu(name))}
      className={
        selectedMenu === name
          ? "bg-red-700 text-white font-semibold py-2 px-4 border-none mx-auto md:mx-2 drop-shadow-xl  focus:outline-none  w-3/4"
          : "bg-gray-50 hover:bg-red-700 hover:text-white text-gray-800 font-semibold py-2 px-4 border-none mx-auto md:mx-2 shadow-md  focus:outline-none  w-3/4"
      }
      role="tab"
      aria-controls="v-main"
      aria-selected={selectedMenu === name}
    >
      {name}
    </button>
  );
};

export default MenuItemButton;
