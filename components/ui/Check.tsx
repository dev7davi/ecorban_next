import { CheckIcon } from "@heroicons/react/24/outline";

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[15px] text-body">
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600">
            <CheckIcon className="size-3 text-white" strokeWidth={3} aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
