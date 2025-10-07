"use client";

import { Card, CardBody, CardFooter, Button, Skeleton } from "@heroui/react";
import Link from "next/link";

interface CustomCardProps {
  title: string;
  description: string;
  backgroundImage: string;
  isLoading?: boolean;
  extraContent?: React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
  footerText?: string;
  className?: string;
}

export default function CustomCard({
  title,
  description,
  backgroundImage,
  isLoading,
  extraContent,
  buttonText,
  buttonLink,
  footerText,
  className,
}: CustomCardProps) {
  return (
    <Card
      className={`relative flex w-full flex-col rounded-lg border border-gray-200 bg-cover bg-center text-white shadow-lg ${className ?? ""}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 rounded-lg bg-black/50 backdrop-blur-sm"></div>

      {/* Contenido */}
      <CardBody className="relative p-4 text-center">
        <h2 className="text-md font-bold text-white">{title}</h2>
        <p className="mt-1 text-xs text-white">{description}</p>

        {isLoading ? (
          <div className="mt-3 flex items-center justify-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
            <Skeleton className="h-4 w-24 bg-gray-300" />
          </div>
        ) : (
          <div className="mt-3">{extraContent}</div>
        )}

        {buttonText && buttonLink && (
          <div className="mt-3">
            <Link href={buttonLink}>
              <Button variant="bordered" className="border-white text-white hover:bg-white hover:text-gray-900">
                {buttonText}
              </Button>
            </Link>
          </div>
        )}
      </CardBody>

      {/* Footer */}
      {footerText && (
        <CardFooter className="relative flex justify-center rounded-b-lg bg-black/70 px-2 py-1 text-[9px] text-gray-200">
          {footerText}
        </CardFooter>
      )}
    </Card>
  );
}
