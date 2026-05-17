interface PriceLabelProps {
  amount: number;
  className?: string;
}

export function PriceLabel({ amount, className = "" }: PriceLabelProps) {
  return (
    <span
      className={`whitespace-nowrap tabular-nums ${className}`.trim()}
    >
      {amount.toLocaleString("ru-RU")}&nbsp;₽
    </span>
  );
}
