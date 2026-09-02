import Image from "next/image";

export default function Avatar() {
  return (
    <div className="mx-auto w-[clamp(100px,18vw,280px)] aspect-square overflow-hidden rounded-full border-2 border-neutral-900 dark:border-white relative">
      <Image
        src="/avatar.jpg"
        alt="Juan Manuel Ramos"
        fill
        priority
        className="object-cover"
        sizes="280px"
      />
    </div>
  );
}
