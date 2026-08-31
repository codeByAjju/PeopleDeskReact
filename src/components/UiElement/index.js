import loadable from "@loadable/component";

export * from './Skelton'
export const SweetAlert = loadable(() => import("./SweetAlert/index"));
export const Toaster = loadable(() => import("./Toaster/index"));
export { DataTable } from './DataTable/index.jsx';
export { Input } from './Input/index.jsx';
export { Table } from './DataTable/Table/index.jsx';
export { Badge } from './Badge/index.jsx';
export { SelectPicker } from './SelectPicker/index.jsx';
export { StatusSelector } from './StatusSelector/index.jsx';
export { Modal } from './Modal/index.jsx';