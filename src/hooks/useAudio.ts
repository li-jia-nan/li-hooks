import createHTMLMediaHook, { Tag } from './createHTMLMediaHook';

const useAudio = createHTMLMediaHook<HTMLAudioElement>(Tag.Audio);

export default useAudio;
