import AudioUploader from "./components/AudioUploader";
import { Speaker } from "./components/speaker";

const App = () => {
  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col items-center justify-center gap-2 p-2">
      <AudioUploader />
      <Speaker />
    </div>
  );
};

export default App;
