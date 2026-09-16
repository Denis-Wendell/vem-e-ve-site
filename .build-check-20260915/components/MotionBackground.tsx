export function MotionBackground() {
  return (
    <div className="motion-bg" aria-hidden="true">
      <div className="grid-lines" />
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="glow glow-c" />
      <div className="floating-frame frame-a" />
      <div className="floating-frame frame-b" />
      <div className="floating-frame frame-c" />
      <span className="cross cross-a">+</span>
      <span className="cross cross-b">+</span>
      <span className="cross cross-c">+</span>
    </div>
  );
}
