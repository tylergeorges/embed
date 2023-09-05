import { useContext } from 'react';
import { ModalContextState } from '@components/Providers/ModalProvider';

export function useIsModalOpen(modalId: string) {
  const modalState = useContext(ModalContextState);

  return modalState.modals.find(m => m.id === modalId)?.isOpen ?? false;
}
