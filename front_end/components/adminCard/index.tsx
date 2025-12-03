import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import "./style.css";

interface AdminCardProps {
  title: string;
  icon: ReactNode;
  onClick: () => void;
}

export function AdminCard({ title, icon, onClick }: AdminCardProps) {
  return (
    <div className="feature-card-admin" onClick={onClick}>
      
      <div className="card-icon">
        {icon}
      </div>
      
      <h3>{title}</h3>
      
      <button className="card-btn">
        Gerenciar
        <ChevronRight size={20} />
      </button>
      
    </div>
  );
}