/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { X } from "lucide-react";

import { Button } from "./button";

import type React from "react";

interface SimpleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  dialogPanelClassName?: string;
}

export function SimpleDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  dialogPanelClassName,
}: SimpleDialogProps) {
  if (!open) return null;

  const defaultPanelClasses =
    "relative bg-white rounded-lg shadow-lg w-full mx-4 max-h-[90vh] overflow-y-auto";
  const sizeClass = "max-w-2xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/*
        eslint-disable-next-line jsx-a11y/no-static-element-interactions
      */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={`${defaultPanelClasses} ${sizeClass} ${dialogPanelClassName || ""}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Close dialog</span>{" "}
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
