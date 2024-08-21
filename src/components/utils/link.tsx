import { Link } from "react-router-dom";

interface LinkProps {
  to: string;
  children: React.ReactNode;
}
export default function ActiveLink({ to, children }: LinkProps) {
  return (
    <Link to={to}>
      <div className="absolute top-2 left-2 text-black italic font-bold text-sm  border-slate-200 border bg-purple-200 p-2 rounded-md flex items-center justify-start gap-3 cursor-pointer hover:bg-slate-100">
        {children}
      </div>
    </Link>
  );
}
