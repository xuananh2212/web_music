import dynamic from "next/dynamic";
import TotalCount from "./components/TotalCount";
import ViewTrending from "./components/ViewTrending";
const DynamicChart = dynamic(() => import("./components/View"), { ssr: false });
const page = () => {
  return (
    <div>
      <TotalCount />
      <ViewTrending />
      <DynamicChart />
    </div>
  );
};

export default page;
