'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ERoutes } from "@/constants";


const Index = () => {
    const router = useRouter();
    useEffect(() => {
        router.push(ERoutes.DEVICES);
    }, [router]);
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return <></>
}

export default Index;
