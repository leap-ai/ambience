import Home from "@/components/Home";
import { NextPage } from "next";

interface Props {}

const HomePage: NextPage<Props> = ({}) => {
  return (
    <div>
      <p>Ambience</p>
      <Home />
    </div>
  );
};

export default HomePage;
