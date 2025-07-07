'use client'

import dynamic from "next/dynamic";

const Map = dynamic(
    () => import("@/components/Map").then((component) => component), {ssr: false}
);

const Home = () => {

    return (
        <div>
            <Map />
        </div>
    )
}

export default Home;