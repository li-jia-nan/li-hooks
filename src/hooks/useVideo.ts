import createHTMLMediaHook, { Tag } from './createHTMLMediaHook';

const useVideo = createHTMLMediaHook<HTMLVideoElement>(Tag.Video);

export default useVideo;
