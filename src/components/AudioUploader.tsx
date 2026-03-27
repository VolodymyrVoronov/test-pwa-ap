import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "@/store/app";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/kibo-ui/dropzone";

const AudioUploader = () => {
  const [tracks, setTracks] = useAppStore(
    useShallow((state) => [state.tracks, state.setTracks]),
  );

  const handleAudioUpload = async (files: File[]) => {
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

    setTracks(newTracks);
  };

  if (tracks.length > 0) {
    return null;
  }

  return (
    <Dropzone
      onDrop={handleAudioUpload}
      accept={{ "audio/*": [] }}
      onError={console.error}
      src={tracks.map((track) => track.file)}
    >
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
};

export default AudioUploader;
