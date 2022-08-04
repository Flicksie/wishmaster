import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Button( props ){
    return (
        <button className={ `btn ${props.color }` } {...props} >
            <FontAwesomeIcon icon={props.icon} />
            <span className="px-3" >
                {props.children}
            </span>            
        </button>
    )
}