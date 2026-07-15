'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

type WeddingImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
  fallbackSrc?: string;
  placeholderClassName?: string;
};

export function WeddingImage({ src, fallbackSrc, alt, onError, placeholderClassName = 'bg-cream', className, ...props }: WeddingImageProps) {
  const [hasError, setHasError] = useState(false);
  const imageSrc = (hasError ? fallbackSrc : src) || '';

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!imageSrc) {
    return <div aria-label={alt} className={`absolute inset-0 z-0 animate-pulse ${placeholderClassName}`} />;
  }

  return (
    <Image
      {...props}
      alt={alt}
      src={imageSrc}
      className={`z-0 ${className || ''}`}
      onError={(event) => {
        if (imageSrc !== fallbackSrc) setHasError(true);
        onError?.(event);
      }}
    />
  );
}
