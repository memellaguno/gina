/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import Image from "next/image";

import ResolvedLink from "@/components/ResolvedLink";
import { urlForImage } from "@/sanity/lib/utils";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        const imageUrl = urlForImage(value)?.width(1200).url();
        if (!imageUrl) return null;
        return (
          <div className="entry-image">
            <Image
              src={imageUrl}
              alt={value.alt || ""}
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        );
      },
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary font-display mt-8 mb-4">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-primary font-medium mt-5">
          {children}
        </h2>
      ),
      normal: ({ children }) => (
        <p className="md:text-1xl lg:text-2xl">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-4 ml-6 list-disc">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-4 ml-6 list-decimal">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="mb-2 text-gray-600 lg:text-2xl">{children}</li>
      ),
      number: ({ children }) => (
        <li className="mb-2 text-gray-600 lg:text-2xl">{children}</li>
      ),
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>;
      },
    },
  };

  return (
    <div className={className}>
      <PortableText components={components} value={value} />
    </div>
  );
}
