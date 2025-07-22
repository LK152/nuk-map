'use client'

import Search from "@/components/Search";
import dynamic from "next/dynamic";
import { useState } from "react";

const Map = dynamic(
    () => import("@/components/Map").then((component) => component), {ssr: false}
);

const Home = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <div>
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            <Map />
        </div>
    )
}

export default Home;