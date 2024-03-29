import { FC } from "react";
import { MenuProps } from "../../../lib/types";

import Loader from "../../Loader";
import MenuItemButton from "./MenuItemButton";

// redux
import { useAppSelector } from "@app/hooks";
import { menuSelector } from "@features/menu/menuSlice";

type MenuItemButtonNameProps =
  | "Cuccina"
  | "Pizze"
  | "Dessert"
  | "La Nostra Cantina";

function Menu({
  menu,
  loading,
}: {
  menu: MenuProps;
  loading: boolean;
}): JSX.Element {
  const { selectedMenu } = useAppSelector(menuSelector);

  const menuButtons: Array<string> = [
    "Cuccina",
    "Pizze",
    "Dessert",
    "La Nostra Cantina",
  ];

  return (
    <section className="px-2 mb-4 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <div className="w-full py-8 flex flex-col flex-grow overflow-hidden">
        <div className="container w-full mx-auto">
          <div className="container-md mb-8">
            <h1 className="text-2xl md:text-3xl mx-auto mb-4 text-center w-3/5 sm:w-2/6 border-b border-red-200">
              Scopri il nostro menu
            </h1>
            <p className="max-w-xl justify-center font-thin mx-auto px-2 my-2 text-center">
              Poche cose si avvicinano alla gioia della Pizza cucinata
              semplicemente con tenero amore e cura e il meglio ingredienti.
            </p>
          </div>

          <div className="flex flex-col md:flex-row mx-auto text-center w-11/12 md:w-2/4 mb-8">
            {menuButtons.map((name, index) => (
              <MenuItemButton
                key={`${name}-${index}`}
                name={name as MenuItemButtonNameProps}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Menu Card */}
      {loading ? (
        <div className="mx-auto h-[300px] flex items-center justify-center w-full py-10">
          <Loader classes="w-6 h-6" />
        </div>
      ) : (
        <div
          id="v-main"
          className={
            selectedMenu === "Cuccina"
              ? "block sm:w-3/5   text-left mx-auto p-2  overflow-hidden drop-shadow-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              : "hidden"
          }
        >
          <h1 className="text-2xl md:text-3xl text-center font-light mb-8">
            LA CUCINA PROPONE
          </h1>

          <div className="w-full">
            <div>
              <h1 className="text-2xl text-center font-light mb-6 border border-red-200">
                ANTIPASTI
              </h1>
              {menu.antipasti?.map((ant) => (
                <div
                  key={ant.id}
                  className=" w-full  flex justify-between  mb-4"
                >
                  <div className="rounded-b w-2/4 sm:w-3/4 lg:rounded-b-none justify-start lg:rounded-r flex flex-col">
                    <div className="mb-2">
                      <div className="font-light text-base sm:text-xl mb-2 text-left ">
                        {ant.name}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-b lg:rounded-b-none lg:rounded-r p-2  leading-normal">
                    <h1 className="font-light text-base sm:text-xl inline">
                      &euro; {ant.price}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="mb-6 border border-red-200">
                <h1 className="text-2xl  text-center font-light mb-1 ">
                  SECONDI
                </h1>
                <h1 className="text-2xl  text-center font-light">
                  I NOSTRI HAMBURGER
                </h1>
              </div>

              {menu.secondi?.map((sec, i) => (
                <div key={sec.id} className=" w-full flex justify-between mb-4">
                  <div className="rounded-b w-2/3 sm:w-3/4 lg:rounded-b-none justify-start lg:rounded-r p-2 flex flex-col">
                    <div className="mb-2">
                      <div className="font-light text-base sm:text-xl mb-2 text-left ">
                        {sec.name}{" "}
                        {sec?.ingredients.length > 0 && (
                          <span>
                            : {sec?.ingredients.map((ing) => ing).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-b lg:rounded-b-none lg:rounded-r p-2  leading-normal">
                    <h1 className="font-light text-base sm:text-xl inline">
                      &euro; {sec.price}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-2xl text-center font-light mb-6 border border-red-200">
                LE TEMPURE
              </h1>
              {menu.letempure?.map((sec) => (
                <div key={sec.id} className=" w-full flex justify-between mb-4">
                  <div className="rounded-b w-2/3 sm:w-3/4 lg:rounded-b-none justify-start lg:rounded-r p-2 flex flex-col">
                    <div className="mb-2">
                      <div className="font-light text-base sm:text-xl mb-2 text-left ">
                        {sec.name}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-b lg:rounded-b-none lg:rounded-r p-2  leading-normal">
                    <h1 className="font-light text-base sm:text-xl inline">
                      &euro; {sec.price}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-2xl text-center font-light mb-6 border border-red-200">
                CONTORNI
              </h1>
              {menu.contorni?.map((cont, i) => (
                <div
                  key={cont.id}
                  className=" w-full flex justify-between mb-4"
                >
                  <div className="rounded-b w-2/3 sm:w-3/4 lg:rounded-b-none justify-start lg:rounded-r p-2 flex flex-col">
                    <div className="mb-2">
                      <div className="font-light text-base sm:text-xl mb-2 text-left ">
                        {cont.name}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-b lg:rounded-b-none lg:rounded-r p-2  leading-normal">
                    <h1 className="font-light text-base sm:text-xl inline">
                      &euro; {cont.price}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pizza menu card */}
      {loading ? (
        <div className="mx-auto h-[300px] flex items-center justify-center w-full py-10">
          <Loader classes="w-6 h-6" />
        </div>
      ) : (
        <div
          id="v-pizza"
          className={
            selectedMenu === "Pizze"
              ? "block container md:w-full mx-auto p-2  overflow-hidden drop-shadow-2xl max-w-screen-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              : "hidden"
          }
        >
          <h1 className="text-2xl md:text-3xl text-center mx-auto font-light mb-8">
            LE PIZZE DI VIA ROMA
          </h1>
          <h1 className="text-2xl md:text-3xl text-center mx-auto font-light mb-8">
            PIZZA GOURMET
          </h1>
          <div className="md:w-full flex flex-row flex-wrap mx-auto p-2 mb-4 overflow-hidden ">
            {menu.gourmetPizza?.map((pizza) => (
              <div
                key={pizza.id}
                className=" w-full lg:w-3/6 flex justify-between px-1 mb-4"
              >
                <div className="rounded-b w-2/3 sm:w-3/4 lg:rounded-b-none justify-start lg:rounded-r p-2 flex flex-col">
                  <div className="mb-2">
                    <div className=" font-light text-base sm:text-xl mb-2 text-left ">
                      {pizza.name}
                    </div>
                    <div className="flex flex-row flex-wrap">
                      {pizza.ingredients.map((ing, i) => (
                        <p key={i} className=" text-base mr-1 text-left">
                          {ing}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-b lg:rounded-b-none lg:rounded-r p-2  leading-normal">
                  <h1 className=" font-light text-base sm:text-xl inline">
                    &euro; {pizza.price}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl text-center mx-auto font-light mb-8">
            LE SPECIALI
          </h1>
          <div className="md:w-full flex flex-row flex-wrap mx-auto p-2 mb-4 overflow-hidden ">
            {menu.pizzaSpeciali?.map((pizza) => (
              <div
                key={pizza.id}
                className=" w-full lg:w-3/6 flex justify-between px-1 mb-4"
              >
                <div className="rounded-b w-2/3 sm:w-3/4 lg:rounded-b-none justify-start lg:rounded-r p-2 flex flex-col">
                  <div className="mb-2">
                    <div className=" font-light text-base sm:text-xl mb-2 text-left ">
                      {pizza.name}
                    </div>
                    <div className="flex flex-row flex-wrap">
                      {pizza.ingredients.map((ing, i) => (
                        <p key={i} className=" text-base mr-1 text-left">
                          {ing}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-b lg:rounded-b-none lg:rounded-r p-2  leading-normal">
                  <h1 className=" font-light text-base sm:text-xl inline">
                    &euro; {pizza.price}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl text-center mx-auto font-light mb-8">
            LE BIANCHE
          </h1>
          <div className="md:w-full flex flex-row flex-wrap mx-auto p-2 mb-4 overflow-hidden ">
            {menu.bianche.map((item) => (
              <div
                key={item.id}
                className=" w-full lg:w-3/6 flex justify-between px-1 mb-4"
              >
                <div className="rounded-b w-2/3 sm:w-3/4 lg:rounded-b-none justify-start lg:rounded-r p-2 flex flex-col">
                  <div className="mb-2">
                    <div className=" font-light text-base sm:text-xl mb-2 text-left ">
                      {item.name}
                    </div>
                    <div className="flex flex-row flex-wrap">
                      {item.ingredients.map((ing, i) => (
                        <p key={i} className=" text-base mr-1 text-left">
                          {ing}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-b lg:rounded-b-none lg:rounded-r p-2  leading-normal">
                  <h1 className=" font-light text-base sm:text-xl inline">
                    &euro; {item.price}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl text-center mx-auto font-light mb-8">
            LE CLASSICHE
          </h1>
          <div className="md:w-full flex flex-row flex-wrap mx-auto p-2 mb-4 overflow-hidden ">
            {menu.pizzas?.map((pizza, i) => (
              <div
                key={pizza.id}
                className=" w-full lg:w-3/6 flex justify-between px-1 mb-4"
              >
                <div className="rounded-b w-2/3 sm:w-3/4 lg:rounded-b-none justify-start lg:rounded-r p-2 flex flex-col">
                  <div className="mb-2">
                    <div className=" font-light text-base sm:text-xl mb-2 text-left ">
                      {pizza.name}
                    </div>
                    <div className="flex flex-row flex-wrap">
                      {pizza.ingredients.map((ing, i) => (
                        <p key={i} className="text-base mr-1 text-left">
                          {ing}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-b lg:rounded-b-none lg:rounded-r p-2  leading-normal">
                  <h1 className=" font-light text-base sm:text-xl inline">
                    &euro; {pizza.price}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2">
            <p className=" font-light text-base sm:text-xl mb-4  text-left">
              L&apos;impiego di farine speciali, la lievitazione di 72 ore danno
              al nosto impasto leggerezza e digeribilita&apos;
            </p>
            <p className=" font-light text-base sm:text-xl mb-4  text-left">
              Tutte le nostre pizze possono essere prodotte con impasto per
              celiaci +3,00 Ingredienti extra da &euro; 2,00 a &euro; 3,00
            </p>

            <p className=" font-light text-base sm:text-xl mb-2  text-left">
              A lato degli ingredienti sono riportati i codici degli allergeni
              presenti in ogni preparazione (la lista si trova nell&apos;ultima
              pagina del menu&apos;)
            </p>
          </div>
        </div>
      )}
      {/* Desserts card */}
      {loading ? (
        <div className="mx-auto h-[300px] flex items-center justify-center w-full py-10">
          <Loader classes="w-6 h-6" />
        </div>
      ) : (
        <div
          id="v-dessert"
          className={
            selectedMenu === "Dessert"
              ? "block w-11/12 md:w-3/5   text-left mx-auto p-2  overflow-hidden drop-shadow-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              : "hidden"
          }
        >
          {menu.desserts?.map((dessert, i) => (
            <div key={dessert.id} className=" w-full flex justify-between mb-4">
              <div className="rounded-b lg:rounded-b-none justify-start lg:rounded-r p-1 md:p-2 w-4/6">
                <div className="mb-2">
                  <div className=" font-light text-lg md:text-xl mb-2 text-left break-all ">
                    {dessert.name}
                  </div>
                </div>
              </div>
              <div className="rounded-b lg:rounded-b-none lg:rounded-r p-1 md:p-2 mx-2 leading-normal">
                <h2 className=" font-light text-base sm:text-xl inline text-justify">
                  &euro; {dessert.price}
                </h2>
              </div>
            </div>
          ))}
          <div className="p-2">
            <p className=" font-light text-lg md:text-xl mb-2  text-left">
              A tutti i nostri dessert possono essere aggiunti caffe&apos; o
              alcolici &euro;1,00{" "}
            </p>
            <p className=" font-light text-lg md:text-xl mb-2  text-left">
              Coperto &euro;2,50
            </p>
          </div>
        </div>
      )}
      {/* Cantina Card */}
      {loading ? (
        <div className="mx-auto h-[300px] flex items-center justify-center w-full py-10">
          <Loader classes="w-6 h-6" />
        </div>
      ) : (
        <div
          id="v-drinks"
          className={
            selectedMenu === "La Nostra Cantina"
              ? "block container-md  md:w-3/5   p-2 mx-auto overflow-hidden drop-shadow-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              : "hidden"
          }
        >
          <div className="w-full flex flex-row justify-between">
            <p className="px-2 py-2">{""}</p>
            <p className=" py-2 ml-24 sm:ml-36 font-bold">Calice</p>
            <p className="px-2 py-2 font-bold">Bottiglia</p>
          </div>
          {menu.cantina?.map((drink, i) => (
            <div
              key={drink.id}
              className="w-full table flex-col justify-between table-auto px-1"
            >
              <div>
                <div className="border border-red-200 text-center">
                  <p className="px-1 py-1 text-lg md:text-2xl font-light">
                    {drink.subtitle}
                  </p>
                </div>
              </div>
              {drink.types?.map((bottle, i) => (
                <div key={i} className="w-full flex  justify-between mb-4">
                  <p className="px-1 py-2 w-1/3 sm:w-1/2 text-lg md:text-xl">
                    {bottle.name}
                  </p>
                  <div className="px-2 py-2 sm:w-1/4">
                    <h2 className=" font-bold text-base md:text-xl ">
                      {bottle.Calice && `€ ${bottle.Calice}`}
                    </h2>
                  </div>
                  <div className="px-1 py-2 w-1/4 text-right">
                    <h2 className=" font-bold text-base md:text-xl inline text-justify">
                      &euro; {bottle.Bottiglia}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;
