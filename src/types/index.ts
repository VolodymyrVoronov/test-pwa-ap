export interface ITrack {
  id: string;
  file: File;
  name: string;
  buffer: AudioBuffer;
  duration: number;
  url: string;
}
