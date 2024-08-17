import getMetadata from "@/configs/site.config";
import "@/styles/globals.scss";
import type { Metadata } from "next";
import React from "react";
import styles from "./styles.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getMetadata();
  return metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.layout}>
        <div className="container">
          <div className="pt-12">{children}</div>
        </div>
      </div>
    </>
  );
}
