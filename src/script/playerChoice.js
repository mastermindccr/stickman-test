export default function PlayerChoice(props){
    const attacks = [];
    const defenses = [];
    for(let i in props.attack){
        let className = props.attack[i].cost+props.point>=0?'usable':'unUsable';
        attacks.push(<li onClick={()=>{props.click('attack', i)}}><div className={`attack ${className}`}>{props.attack[i].name}</div></li>)
    }
    for(let i in props.defense){
        defenses.push(<li onClick={()=>{props.click('defense', i)}}><div className="defense usable">{props.defense[i].name}</div></li>)
    }
    return<div style={{minHeight: '20%'}}>
        <div><ul>{attacks}</ul></div>
        <div><ul>{defenses}</ul></div>
    </div>
}