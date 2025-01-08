import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export default function BlogImage({
  src,
  alt,
  width,
  height,
  caption,
  className = "rounded-lg shadow-lg my-4",
  priority = false,
  quality = 100,
}: BlogImageProps) {
  return (
    <figure className="relative group">
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          className={`w-full h-auto ${className}`}
          priority={priority}
          quality={quality}
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-400 mt-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
} 