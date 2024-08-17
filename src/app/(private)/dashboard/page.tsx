import getMetadata from "@/configs/site.config";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getMetadata("Tổng quan");
  return metadata;
}

const Page = () => {
  return <div></div>;
};

export default Page;
