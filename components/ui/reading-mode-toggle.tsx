"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Type,
  Minus,
  Plus,
  AlignLeft,
  AlignJustify,
  RotateCcw,
} from "lucide-react";

interface ReadingModeSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily:
    | "serif"
    | "sans-serif"
    | "georgia"
    | "times"
    | "open-sans"
    | "roboto";
  textAlign: "left" | "justify";
}

export function ReadingModeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ReadingModeSettings>({
    fontSize: 16,
    lineHeight: 1.7,
    fontFamily: "serif",
    textAlign: "left",
  });

  const fontFamilyMap = {
    serif: "Merriweather, Georgia, serif",
    "sans-serif": "Inter, system-ui, sans-serif",
    georgia: "Georgia, 'Times New Roman', serif",
    times: "'Times New Roman', Times, serif",
    "open-sans": "'Open Sans', system-ui, sans-serif",
    roboto: "'Roboto', system-ui, sans-serif",
  };

  useEffect(() => {
    // Apply reading mode styles to body
    const body = document.body;

    if (isOpen) {
      body.classList.add("reading-mode-active");
      body.style.setProperty("--reading-font-size", `${settings.fontSize}px`);
      body.style.setProperty(
        "--reading-line-height",
        settings.lineHeight.toString()
      );
      body.style.setProperty(
        "--reading-font-family",
        fontFamilyMap[settings.fontFamily]
      );
      body.style.setProperty("--reading-text-align", settings.textAlign);
    } else {
      body.classList.remove("reading-mode-active");
      body.style.removeProperty("--reading-font-size");
      body.style.removeProperty("--reading-line-height");
      body.style.removeProperty("--reading-font-family");
      body.style.removeProperty("--reading-text-align");
    }

    return () => {
      body.classList.remove("reading-mode-active");
      body.style.removeProperty("--reading-font-size");
      body.style.removeProperty("--reading-line-height");
      body.style.removeProperty("--reading-font-family");
      body.style.removeProperty("--reading-text-align");
    };
  }, [isOpen, settings]);

  const updateSetting = <K extends keyof ReadingModeSettings>(
    key: K,
    value: ReadingModeSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings({
      fontSize: 16,
      lineHeight: 1.7,
      fontFamily: "serif",
      textAlign: "left",
    });
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-md hover:bg-white/20 text-white transition-all duration-200"
        title="Text Formatting Options"
      >
        <Type className="w-4 h-4" />
      </Button>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-[100]"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <div className="pointer-events-auto bg-white dark:bg-neutral-800 rounded-lg shadow-xl min-w-[320px] max-w-[400px] w-full max-h-[85vh] overflow-hidden flex flex-col">
              <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Text Formatting Options
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                >
                  ×
                </Button>
              </div>

              <div className="space-y-4 p-6 overflow-y-auto">
                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Font Size
                  </label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateSetting(
                          "fontSize",
                          Math.max(12, settings.fontSize - 1)
                        )
                      }
                      className="w-8 h-8"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 min-w-[3rem] text-center">
                      {settings.fontSize}px
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateSetting(
                          "fontSize",
                          Math.min(24, settings.fontSize + 1)
                        )
                      }
                      className="w-8 h-8"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Line Height */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Line Height
                  </label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateSetting(
                          "lineHeight",
                          Math.max(1.2, settings.lineHeight - 0.1)
                        )
                      }
                      className="w-8 h-8"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 min-w-[3rem] text-center">
                      {settings.lineHeight.toFixed(1)}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateSetting(
                          "lineHeight",
                          Math.min(2.5, settings.lineHeight + 0.1)
                        )
                      }
                      className="w-8 h-8"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Font Family
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={
                        settings.fontFamily === "serif" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => updateSetting("fontFamily", "serif")}
                      className="text-xs"
                    >
                      Merriweather
                    </Button>
                    <Button
                      variant={
                        settings.fontFamily === "sans-serif"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => updateSetting("fontFamily", "sans-serif")}
                      className="text-xs"
                    >
                      Inter
                    </Button>
                    <Button
                      variant={
                        settings.fontFamily === "georgia"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => updateSetting("fontFamily", "georgia")}
                      className="text-xs"
                    >
                      Georgia
                    </Button>
                    <Button
                      variant={
                        settings.fontFamily === "times" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => updateSetting("fontFamily", "times")}
                      className="text-xs"
                    >
                      Times New Roman
                    </Button>
                    <Button
                      variant={
                        settings.fontFamily === "open-sans"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => updateSetting("fontFamily", "open-sans")}
                      className="text-xs"
                    >
                      Open Sans
                    </Button>
                    <Button
                      variant={
                        settings.fontFamily === "roboto" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => updateSetting("fontFamily", "roboto")}
                      className="text-xs"
                    >
                      Roboto
                    </Button>
                  </div>
                </div>

                {/* Text Alignment */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Text Alignment
                  </label>
                  <div className="flex space-x-2">
                    <Button
                      variant={
                        settings.textAlign === "left" ? "default" : "outline"
                      }
                      size="icon"
                      onClick={() => updateSetting("textAlign", "left")}
                      title="Left Align"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={
                        settings.textAlign === "justify" ? "default" : "outline"
                      }
                      size="icon"
                      onClick={() => updateSetting("textAlign", "justify")}
                      title="Justify"
                    >
                      <AlignJustify className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetSettings}
                    className="flex-1"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Default
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-primary-600 hover:bg-primary-700"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
