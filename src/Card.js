import {useState} from "react";

export default function Card(props) {
    const [editDescription, setEditDescription] = useState('');

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.card.name}</h5>
                    <p className="card-text">{props.card.description}</p>
                    {editDescription && <p>
                        <textarea className={'form-control'} rows="3" value={editDescription}
                                  onChange={e => setEditDescription(e.target.value)}></textarea>
                        <button type="button" className="btn btn-outline-success save-edits-button" onClick={() =>
                        {props.editCard(props.card._id, editDescription); setEditDescription('')}}>Save edits</button>
                    </p>}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Status: {props.card.status}
                        <button type="button" className="btn btn-primary btn-sm"
                                onClick={() => props.changeStatus(props.card._id, props.card.status, '-')}
                                disabled={props.card.status === 'to do' ? true : false}>←
                        </button>
                        <button type="button" className="btn btn-primary btn-sm"
                                onClick={() => props.changeStatus(props.card._id, props.card.status, '+')}
                                disabled={props.card.status === 'done' ? true : false}>→
                        </button>
                    </li>
                    <li className="list-group-item">Priority: {props.card.priority}
                        <button type="button" className="btn btn-secondary btn-sm"
                                onClick={() => props.changePriority(props.card._id, props.card.priority + 1)}>↑
                        </button>
                        <button type="button" className="btn btn-secondary btn-sm"
                                onClick={() => props.changePriority(props.card._id, props.card.priority - 1)}
                                disabled={props.card.priority === 1 ? true : false}>↓
                        </button>
                    </li>
                </ul>
                <div className="card-body">
                    <button type="button" className="btn btn-outline-danger" onClick={() => {
                        props.toggle();
                        props.saveDeleteCardId(props.card._id)
                    }}>Delete
                    </button>

                    <button type="button" className="btn btn-outline-dark"
                            onClick={() => setEditDescription(props.card.description)}
                            disabled={editDescription ? true : false}>Edit
                    </button>
                </div>
            </div>

        </>
    )
}