import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type Suggestion = {
  value: string;
  description?: string;
  onSelect?: () => void | Promise<void>;
};

export type CommandPromptProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "defaultValue"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onCommand?: (value: string) => void;
  suggestions?: Suggestion[];
  getSuggestions?: (value: string) => Suggestion[];
  initialHistory?: string[];
  prefix?: string;
  frameless?: boolean;
  showPrefix?: boolean;
  focusRing?: boolean;
  background?: "background" | "card";
  showActions?: boolean;
};

/**
 * A keyboard-first command prompt with history navigation and autocomplete.
 * - ArrowUp/ArrowDown to cycle history
 * - Tab to accept highlighted suggestion
 * - Enter to submit
 */
const CommandPrompt = React.forwardRef<HTMLInputElement, CommandPromptProps>(function CommandPrompt(
  {
    className,
    value,
    defaultValue,
    onValueChange,
    onCommand,
    suggestions,
    getSuggestions,
    initialHistory,
    prefix = ">",
    disabled,
    placeholder,
    showPrefix = true,
    focusRing = true,
    background = "background",
    showActions = true,
    ...inputProps
  }: CommandPromptProps,
  ref
) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(defaultValue ?? "");
  const inputValue = isControlled ? value! : uncontrolledValue;
  const setInputValue = React.useCallback(
    (next: string) => {
      if (disabled) return;
      if (!isControlled) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [disabled, isControlled, onValueChange]
  );

  const [history, setHistory] = React.useState<string[]>(() => initialHistory ?? []);
  const [historyIndex, setHistoryIndex] = React.useState<number>(-1);
  const [open, setOpen] = React.useState<boolean>(false);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const itemRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  // Expose input ref to parent
  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

  const computedSuggestions: Suggestion[] = React.useMemo(() => {
    const base = getSuggestions ? getSuggestions(inputValue) : suggestions ?? [];
    if (!inputValue) return base.slice(0, 8);
    const lower = inputValue.toLowerCase();
    return base.filter((s) => s.value.toLowerCase().includes(lower)).slice(0, 8);
  }, [getSuggestions, suggestions, inputValue]);

  React.useEffect(() => {
    setOpen(computedSuggestions.length > 0);
    setActiveIndex(0);
  }, [computedSuggestions]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (disabled) return;

    const hasSuggestions = open && computedSuggestions.length > 0;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hasSuggestions) {
        setActiveIndex(
          (idx) => (idx - 1 + computedSuggestions.length) % computedSuggestions.length
        );
      } else if (history.length > 0) {
        const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex] ?? "");
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hasSuggestions) {
        setActiveIndex((idx) => (idx + 1) % computedSuggestions.length);
      } else if (history.length > 0) {
        const nextIndex = historyIndex < 0 ? 0 : Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex] ?? "");
      }
      return;
    }

    if (e.key === "Tab") {
      if (open && computedSuggestions[activeIndex]) {
        e.preventDefault();
        setInputValue(computedSuggestions[activeIndex].value);
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const chosen =
        open && computedSuggestions[activeIndex]
          ? computedSuggestions[activeIndex].value
          : inputValue;
      const trimmed = chosen.trim();
      if (open && computedSuggestions[activeIndex]) {
        computedSuggestions[activeIndex].onSelect?.();
      }
      onCommand?.(trimmed);
      if (trimmed) {
        setHistory((prev) => (prev[prev.length - 1] === trimmed ? prev : [...prev, trimmed]));
      }
      setHistoryIndex(-1);
      return;
    }

    if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(0);
      return;
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setHistoryIndex(-1);
  }

  function handleMouseMove(idx: number) {
    setActiveIndex(idx);
  }

  function handleClickSuggestion(s: Suggestion) {
    setInputValue(s.value);
    inputRef.current?.focus();
    s.onSelect?.();
    onCommand?.(s.value);
  }

  const listboxId = React.useId();
  const activeId = `${listboxId}-option-${activeIndex}`;

  // Keep active option in view
  React.useEffect(() => {
    const el = listRef.current?.children?.[activeIndex] as HTMLElement | undefined;
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // Background highlight position/size
  const [highlight, setHighlight] = React.useState<{ top: number; height: number }>({
    top: 0,
    height: 0,
  });
  React.useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (!el) return;
    setHighlight({ top: el.offsetTop, height: el.offsetHeight });
  }, [activeIndex, computedSuggestions.length, open]);

  return (
    <div className={cn("w-full", className)}>
      <div
        data-slot="command-prompt"
        className={cn(
          "rounded-xl transition-[color,box-shadow]",
          background === "card" ? "bg-card" : "bg-background",
          inputProps.frameless ? "shadow-none border-none" : "border border-input shadow-xl",
          focusRing && "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="flex w-full items-center gap-2 px-3 pt-3 pb-3">
          {showPrefix ? <span className="text-muted-foreground select-none">{prefix}</span> : null}
          <input
            ref={inputRef}
            type="text"
            aria-autocomplete="list"
            aria-controls={open ? listboxId : undefined}
            aria-activedescendant={open ? activeId : undefined}
            aria-expanded={open}
            placeholder={placeholder}
            className={cn(
              "placeholder:text-muted-foreground w-full bg-transparent text-base outline-none md:text-sm"
            )}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            {...inputProps}
          />
        </div>

        {open && computedSuggestions.length > 0 ? (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            className={cn(
              "relative max-h-72 w-full overflow-auto border-t border-input p-1 text-sm"
            )}
          >
            <motion.div
              aria-hidden
              className="absolute left-1 right-1 z-0 rounded-md bg-accent"
              animate={{ top: highlight.top, height: highlight.height }}
              transition={{ duration: 0.05, ease: "easeOut" }}
              style={{ top: highlight.top, height: highlight.height }}
            />
            {computedSuggestions.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <li
                  key={`${s.value}-${idx}`}
                  id={`${listboxId}-option-${idx}`}
                  role="option"
                  aria-selected={isActive}
                  className={cn(
                    "relative z-10 flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 outline-none transition-colors",
                    isActive ? "text-accent-foreground" : undefined
                  )}
                  onMouseMove={() => handleMouseMove(idx)}
                  onClick={() => handleClickSuggestion(s)}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                >
                  <span className="truncate">{s.value}</span>
                  {s.description ? (
                    <span className="text-muted-foreground hidden shrink-0 text-xs md:inline">
                      {s.description}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}

        {showActions ? (
          <div className="flex items-center justify-between gap-2 border-t border-input px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              {history.length > 0 ? (
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-input bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">
                    ↑↓
                  </kbd>
                  <span>history</span>
                </span>
              ) : null}
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-input bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">
                  Esc
                </kbd>
                <span>to close</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-input bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">
                  ↵
                </kbd>
                <span>to accept</span>
              </span>
              {open && computedSuggestions.length > 0 ? (
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-input bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">
                    Tab
                  </kbd>
                  <span>to complete</span>
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
});

export { CommandPrompt };

// Full-screen overlay with Cmd/Ctrl+K toggle
export type CommandPromptOverlayProps = Omit<CommandPromptProps, "className"> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function useGlobalShortcut(handler: (e: KeyboardEvent) => void) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      handler(e);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
}

const CommandPromptOverlay = React.forwardRef<HTMLInputElement, CommandPromptOverlayProps>(
  function CommandPromptOverlay({ open: controlledOpen, onOpenChange, ...props }, ref) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen! : uncontrolledOpen;
    const setOpen = React.useCallback(
      (next: boolean) => {
        if (!isControlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
      },
      [isControlled, onOpenChange]
    );

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

    // Cmd/Ctrl+K to open
    useGlobalShortcut(
      React.useCallback(
        (e: KeyboardEvent) => {
          const isK = e.key.toLowerCase() === "k";
          if ((e.metaKey || e.ctrlKey) && isK) {
            e.preventDefault();
            setOpen(!open);
          } else if (e.key === "Escape" && open) {
            setOpen(false);
          }
        },
        [open, setOpen]
      )
    );

    // Focus input when opened
    React.useEffect(() => {
      if (open) {
        const id = requestAnimationFrame(() => inputRef.current?.focus());
        return () => cancelAnimationFrame(id);
      }
    }, [open]);

    if (!open) return null;

    function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
      if (e.target === e.currentTarget) setOpen(false);
    }

    return (
      <div
        className={cn(
          "fixed inset-0 z-50 grid place-items-center p-4 sm:p-6 bg-background/60 backdrop-blur-xs"
        )}
        onClick={handleBackdropClick}
      >
        <div className={cn("mx-auto w-full max-w-xl -mt-24")} role="dialog" aria-modal="true">
          <CommandPrompt ref={inputRef} {...props} />
        </div>
      </div>
    );
  }
);

export { CommandPromptOverlay };
