import dynamic from "next/dynamic";

const Chat = dynamic(() => import("../../components/Chat"), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return <Chat />;
}
