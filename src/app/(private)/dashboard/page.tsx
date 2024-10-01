import dynamic from "next/dynamic";
const DynamicChart = dynamic(() => import("./components/View"), { ssr: false });
const page = () => {
  return (
    <div>
      <DynamicChart />
    </div>
  );
};

export default page;
