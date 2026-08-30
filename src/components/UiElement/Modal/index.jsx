import { Modal as BsModal } from "react-bootstrap";

export function Modal({ headingText = "", handleClose, extraClass = "", children, footer = "", ...props }) {
    return (
        <>
            <BsModal className={`zoom ${extraClass}`} centered backdrop="static" onHide={handleClose} {...props}>
                <BsModal.Header closeButton>
                    <BsModal.Title>{headingText}</BsModal.Title>
                </BsModal.Header>
                <BsModal.Body>
                    {children}
                </BsModal.Body>
                {
                    footer &&
                    <BsModal.Footer>
                        {footer}
                    </BsModal.Footer>
                }
            </BsModal>
        </>
    );
}