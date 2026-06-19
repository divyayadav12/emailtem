type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`h-11 rounded-lg border border-[#d0d7de] bg-white px-3 text-sm text-[#1f1f1f] outline-none transition placeholder:text-[#6b7280] focus:border-[#0b57d0] focus:ring-2 focus:ring-[#d3e3fd] ${className}`}
      {...props}
    />
  );
}
