import dynamic from "next/dynamic";


// Import components dynamically it will import only when necessary
const HomePage = dynamic(() => import("@/components/home/HomePage"));


export default function Home() {
  return (
    <div>

      <HomePage/>

    </div>
  );
}
