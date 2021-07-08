import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import {useEffect, useState} from "react";
import Column from "./Column";
import ModalWindow from "./ModalWindow";

function App() {
    const [cards, setCards] = useState([]);
    const [columns, setColumns] = useState([]);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [cardToDeleteId, setCardToDeleteId] = useState('');
    const [newCard, setNewCard] = useState(false);

    const status = [
        {id: 1, name: 'to do'},
        {id: 2, name: 'progress'},
        {id: 3, name: 'review'},
        {id: 4, name: 'done'},
    ]

    const getCards = () => {
        axios.get('http://localhost:3000/card')
            .then((response) => setCards(response.data))
            .catch((error) => console.log(error))
    }

    const getColumn = () => {
        axios.get('https://nazarov-kanban-server.herokuapp.com/column')
            .then((response) => setColumns(response.data))
            .catch((error) => console.log(error))
    }

    const changePriority = (cardId, newPriority) => {
        axios.patch('http://localhost:3000/card/' + cardId, {priority: newPriority})
            .then(() => getCards())
            .catch((error) => console.log(error))
    }

    const changeStatus = (cardId, currentStatus, operation) => {
        let oldStatusId = status.find(({name}) => name === currentStatus).id;
        let newStatus = status.find(({id}) => id === eval(oldStatusId + operation + 1)).name;

        axios.patch('http://localhost:3000/card/' + cardId, {status: newStatus})
            .then(() => getCards())
            .catch((error) => console.log(error))
    }

    const saveDeleteCardId = (cardId) => {
        setCardToDeleteId(cardId);
    }

    const deleteCard = (cardId) => {
        axios.delete('http://localhost:3000/card/' + cardId)
            .then(() => getCards())
            .catch((error) => console.log(error))
    }

    const saveNewCard = (name, description, priority, status) => {
        axios.post('http://localhost:3000/card', {
            name: name,
            description: description,
            priority: priority,
            status: status
        })
            .then(() => getCards(), setNewCard(false))
            .catch((error) => console.log(error));

    }

    const editCard = (cardId, newDescription) => {
        axios.patch('http://localhost:3000/card/' + cardId, {description: newDescription})
            .then(() => getCards())
            .catch((error) => console.log(error))
    }

    useEffect(() => {
            getCards();
            getColumn()
        }, []
    )

    return (
        <div className="App">
            <nav className="navbar navbar-dark bg-dark form-inline">
                <button type="button" className="btn btn-outline-info" onClick={() => {
                    setNewCard(true);
                    toggle()
                }}>Add new card
                </button>
            </nav>

            <div className="row align-items-start tasks">
                {columns.map(el => <Column key={el._id} column={el} cards={cards} changePriority={changePriority}
                                           saveDeleteCardId={saveDeleteCardId} toggle={toggle}
                                           changeStatus={changeStatus}
                                           editCard={editCard}/>)}
            </div>
            <ModalWindow modal={modal} toggle={toggle}
                         deleteCard={deleteCard} cardToDeleteId={cardToDeleteId} setCardToDeleteId={setCardToDeleteId}
                         newCard={newCard} setNewCard={setNewCard} saveNewCard={saveNewCard}/>
        </div>
    );
}

export default App;
