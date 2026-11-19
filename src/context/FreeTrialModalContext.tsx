import React, { createContext, useContext, useState } from 'react';
import BuyNowModal, { BuyNowPlanContext } from '@/components/pricing/BuyNowModal';

interface FreeTrialModalContextType {
  isOpen: boolean;
  openFreeTrial: (planContext?: BuyNowPlanContext | null) => void;
  closeFreeTrial: () => void;
  planContext: BuyNowPlanContext | null;
}

const FreeTrialModalContext = createContext<FreeTrialModalContextType | undefined>(undefined);

export function FreeTrialModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [planContext, setPlanContext] = useState<BuyNowPlanContext | null>(null);

  const openFreeTrial = (context?: BuyNowPlanContext | null) => {
    setPlanContext(context || null);
    setIsOpen(true);
  };

  const closeFreeTrial = () => {
    setIsOpen(false);
  };

  return (
    <FreeTrialModalContext.Provider value={{ isOpen, openFreeTrial, closeFreeTrial, planContext }}>
      {children}
      <BuyNowModal
        isOpen={isOpen}
        onClose={closeFreeTrial}
        planContext={planContext}
      />
    </FreeTrialModalContext.Provider>
  );
}

export function useFreeTrialModal() {
  const context = useContext(FreeTrialModalContext);
  if (!context) {
    throw new Error('useFreeTrialModal must be used within a FreeTrialModalProvider');
  }
  return context;
}
