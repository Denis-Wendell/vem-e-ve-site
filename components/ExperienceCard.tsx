import Image, { type StaticImageData } from "next/image";

type ExperienceCardProps = {
  number: string;
  title: string;
  description: string;
  word: string;
  imageSrc?: StaticImageData;
  imageAlt?: string;
};

export function ExperienceCard({ number, title, description, word, imageSrc, imageAlt = "" }: ExperienceCardProps) {
  return (
    <article className="experience-card">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          sizes="(max-width: 420px) 100vw, (max-width: 760px) 42vw, 33vw"
          className="experience-photo"
        />
      ) : (
        <div className="experience-art" aria-hidden="true">
          <span>{number}</span><strong>{word}</strong><span className="experience-plus">+</span>
        </div>
      )}
      <div className="experience-copy"><h3>{title}</h3><p>{description}</p></div>
    </article>
  );
}
