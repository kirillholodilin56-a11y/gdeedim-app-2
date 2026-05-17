interface QuantityStepperProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  increaseDisabled?: boolean;
}

export function QuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
  increaseDisabled = false,
}: QuantityStepperProps) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={onDecrease}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-sand text-sm font-medium text-charcoal"
        aria-label="Уменьшить количество"
      >
        −
      </button>
      <span className="min-w-[1.25rem] text-center text-sm font-medium tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={increaseDisabled}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-sand text-sm font-medium text-charcoal disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Увеличить количество"
      >
        +
      </button>
    </div>
  );
}
