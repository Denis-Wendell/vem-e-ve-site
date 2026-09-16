type PhotoSlotProps = {
  label: string;
  index: number;
};

export function PhotoSlot({ label, index }: PhotoSlotProps) {
  return (
    <article className={`photo-slot photo-slot-${index}`} data-photo-slot={label}>
      <div className="photo-slot-inner">
        <span className="photo-slot-index">0{index}</span>
        <div className="photo-slot-center">
          <span className="photo-slot-plus">+</span>
          <span className="photo-slot-copy">FOTO / VÍDEO</span>
        </div>
        <strong>{label}</strong>
      </div>
    </article>
  );
}
