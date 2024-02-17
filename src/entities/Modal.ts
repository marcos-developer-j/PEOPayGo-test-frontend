export interface ModalProps {
  setModal: (e: boolean) => void;
  img?: any;
  title: string;
  subTitle?: string;
  imgWidth?: number;
  imgHeight?: number;
  onClose?: () => void;
}
export interface ModalEliminarProps {
  setModalEliminar: (e: boolean) => void;
  title: string;
  onClose?: () => void;
  eliminar: () => void;
}
