import Image from "next/image";

type ExperienceCardProps = {
  number: string;
  title: string;
  description: string;
  word: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function ExperienceCard({ number, title, description, word, imageSrc, imageAlt = "" }: ExperienceCardProps) {
  return (
    <article className="experience-card">
      <div className="experience-art" aria-hidden={imageSrc ? undefined : true}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 420px) 100vw, (max-width: 760px) 42vw, 33vw"
            className="experience-photo"
          />
        ) : (
          <><span>{number}</span><strong>{word}</strong><span className="experience-plus">+</span></>
        )}
      </div>
      <div className="experience-copy"><h3>{title}</h3><p>{description}</p></div>
    </article>
  );
}
