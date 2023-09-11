import { createContext, useContext, useState, ReactNode } from "react";

type menuTypes = "calendar" | "add" | "edit" |"info";
export const MenuInitialState: menuTypes = "calendar";

export type menuContextType = [
  menuTypes,
  React.Dispatch<React.SetStateAction<menuTypes>>
];

export const MenuContext = createContext<menuContextType>([
  MenuInitialState,
  () => null,
]);

type Props = {
  children?: ReactNode;
};

export function MenuProvider({ children }: Props) {
  const [currentMenu, setCurrentMenu] = useState(MenuInitialState);

  return (
    <MenuContext.Provider value={[currentMenu, setCurrentMenu]}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  return useContext<menuContextType>(MenuContext);
}
