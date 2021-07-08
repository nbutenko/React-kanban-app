import {Modal, Button, Input, Label, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from "react";

export default function ModalWindow(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('to do');

    const closeModal = () => {
        setName('');
        setDescription('');
        setPriority('');
        setStatus('to do');
        props.setNewCard(false);
        props.setCardToDeleteId('');
        props.toggle();
    }

    return (
        <Modal isOpen={props.modal} toggle={() => closeModal()}>
            <ModalHeader
                toggle={() => closeModal()}>{props.newCard ? 'Create new card' : 'Are you sure?'}</ModalHeader>

            {props.cardToDeleteId &&
            <ModalBody>
                Please note, that this card will be permanently deleted and cannot be restored.
            </ModalBody>
            }

            {props.newCard &&
            <ModalBody>
                <Label for="name">Name: </Label>
                <Input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>

                <Label for="description">Description: </Label>
                <Input type="textarea" id="description" rows={5} value={description} onChange={e => setDescription(e.target.value)}/>

                <Label for="priority">Priority: </Label>
                <Input type="number" min={1} id="priority" value={priority} onChange={e => setPriority(e.target.value)}/>

                <Label for="status">Status: </Label>
                <Input type="select" id="status" onChange={e => setStatus(e.target.value)}>
                    <option value="to do">To do</option>
                    <option value="progress">In progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                </Input>
            </ModalBody>
            }

            <ModalFooter>
                {props.cardToDeleteId &&
                <Button color="danger" onClick={() => {
                    props.deleteCard(props.cardToDeleteId);
                    closeModal();
                }}>Delete
                </Button>}

                {props.newCard &&
                <Button color="success" onClick={() => {props.saveNewCard(name, description, priority, status); closeModal()}}>Save</Button>
                }

                <Button color="secondary" onClick={() => closeModal()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}