import { createBrowserRouter } from "react-router";
import HomeScreen from "../features/home";
import DetailScreen from "../features/detail";
import Layout from "../components/layout";
import MyPokemon from "../features/favorite";
import BattleScreen from "../features/battle";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <HomeScreen />,
        index: true,
      },
      {
        element: <DetailScreen />,
        path: "/detail/:name",
      },
      {
        element: <BattleScreen />,
        path: "/battle/:name",
      },
      {
        element: <div>Page not found</div>,
        path: "*",
      },
      {
        element: <MyPokemon />,
        path: "/my-pokemon",
      },
    ],
  },
]);
