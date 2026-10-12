export default function Avatar({
  name,
  image,
  size = 36,
}: {
  name: string;
  image?: string | null;
  size?: number;
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const box = { width: size, height: size };

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        referrerPolicy="no-referrer"
        className="rounded-full object-cover"
        style={box}
      />
    );
  }

  return (
    <span
      className="grid place-items-center rounded-full bg-brand font-semibold text-white"
      style={box}
    >
      {initial}
    </span>
  );
}