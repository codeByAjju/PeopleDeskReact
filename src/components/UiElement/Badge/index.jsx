import { Badge as BsBadge } from "react-bootstrap";
import './index.css'
export function Badge({ label = "", extraClass = "", ...props }) {
  return <BsBadge bg="transparent" className={extraClass} {...props}>{label}</BsBadge>;
}