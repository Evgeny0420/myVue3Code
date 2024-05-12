export interface Modals {
  resetName: () => void;
  active: () => string;
  show: (name: string) => Promise<void>;
  accept: () => void;
  cancel: () => void;
};