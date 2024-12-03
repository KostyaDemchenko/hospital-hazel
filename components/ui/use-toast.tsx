import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState<{
    title: string;
    description: string;
    variant: string;
  } | null>(null);

  const showToast = ({
    title,
    description,
    variant,
  }: {
    title: string;
    description: string;
    variant: string;
  }) => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000); // Уведомление исчезает через 3 секунды
  };

  const ToastComponent = () => {
    if (!toast) return null;
    return (
      <div className={`toast ${toast.variant}`}>
        <h4>{toast.title}</h4>
        <p>{toast.description}</p>
      </div>
    );
  };

  return { showToast, ToastComponent };
}
