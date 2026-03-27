import type { ChangeEvent } from "react";
import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "./store/app";

import { Speaker } from "./components/speaker";

const App = () => {
  const [tracks, setTracks] = useAppStore(
    useShallow((state) => [state.tracks, state.setTracks]),
  );

  console.log(tracks);

  const handleFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const audioContext = new AudioContext();

    const newTracks = await Promise.all(
      Array.from(files).map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const url = URL.createObjectURL(file);

        return {
          id: crypto.randomUUID(),
          file,
          name: file.name,
          buffer: audioBuffer,
          duration: audioBuffer.duration,
          url,
        };
      }),
    );

    setTracks([...tracks, ...newTracks]);
  };

  return (
    <div>
      <input type="file" accept="audio/*" multiple onChange={handleFiles} />

      {tracks.length && <Speaker />}

      {/* <Speaker /> */}
    </div>
  );
};

export default App;
