export default function ShaderBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 shader-base-bg" />
      <div className="absolute inset-0 shader-vignette" />
      <div className="absolute inset-0 shader-grain" />

      <div className="shader-orb shader-orb-a" />
      <div className="shader-orb shader-orb-b" />
      <div className="shader-orb shader-orb-c" />

      <div className="shader-core-shell">
        <div className="shader-core-shell-inner" />
      </div>

      <div className="absolute inset-0 shader-mesh" />
    </div>
  );
}
