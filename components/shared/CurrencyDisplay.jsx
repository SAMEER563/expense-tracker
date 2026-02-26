export default function CurrencyDisplay({ amount, className = '' }) {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

  return <span className={className}>{formatted}</span>;
}
