import Card from "./Card";

export default function Column(props) {

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    Array.prototype.sortBy = function (value) {
        return this.slice(0).sort(function (a, b) {
            return (a[value] < b[value]) ? 1 : (a[value] > b[value]) ? -1 : 0;
        });
    }
    const cards = props.cards.sortBy('priority');


    return (
        <div className="col">
            <h2 className={'column-title'}>{capitalize(props.column.title)}</h2>
            {cards.filter(el => el.status === props.column.title).map(el => <Card key={el._id} card={el}
                                                                                  changePriority={props.changePriority}
                                                                                  saveDeleteCardId={props.saveDeleteCardId}
                                                                                  toggle={props.toggle}
                                                                                  changeStatus={props.changeStatus}
                                                                                  editCard={props.editCard}/>)}
        </div>
    )
}