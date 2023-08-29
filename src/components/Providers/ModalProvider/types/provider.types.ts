export type ModalElement = (props: React.ComponentProps<any>) => JSX.Element;

export interface DomModals {
  [modalId: string]: {
    Comp: ModalElement;

    isOpen: boolean;

    props?: React.ComponentProps<any>;
  };
}

export type VisibleModals = {
  [modalId: string]: { Comp: ModalElement; isOpen: boolean; props?: React.ComponentProps<any> };
};

export type ModalShow = (modalId: string, props?: React.ComponentProps<any>) => void;

export type ModalHide = (modalId: string) => void | NodeJS.Timeout;

export type ModalRegister = (
  modalId: string,
  modalElement: ModalElement,
  openByDefault?: boolean
) => void;
