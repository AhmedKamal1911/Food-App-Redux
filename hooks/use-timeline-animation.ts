type AnimationCallback = () => Promise<void> | (() => void);
const useTimelineAnimation = ({
  introAnimationCb,
  outroAnimationCb,
}: {
  introAnimationCb: AnimationCallback;
  outroAnimationCb: AnimationCallback;
}) => {};
