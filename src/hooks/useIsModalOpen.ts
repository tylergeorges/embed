import { useContext } from 'react';
import ModalProvider from '@components/Providers/ModalProvider';

export function useIsModalOpen(modalId: string) {
  const modalState = useContext(ModalProvider.context);

  return modalState.modals.find(m => m.id === modalId) ?? false;
}
