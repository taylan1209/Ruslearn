interface SectionTitleProps {
  title: string;
  description?: string;
}

export const SectionTitle = ({ title, description }: SectionTitleProps) => (
  <div className="space-y-2">
    <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
    {description ? (
      <p className="text-sm text-slate-500">{description}</p>
    ) : null}
  </div>
);
