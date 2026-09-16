type ExperienceCardProps = {
  number: string;
  title: string;
  description: string;
  word: string;
};

export function ExperienceCard({ number, title, description, word }: ExperienceCardProps) {
  return (
    <article className="experience-card">
      <div className="experience-art" aria-hidden="true">
        <span>{number}</span><strong>{word}</strong><span className="experience-plus">+</span>
      </div>
      <div className="experience-copy"><h3>{title}</h3><p>{description}</p></div>
    </article>
  );
}
