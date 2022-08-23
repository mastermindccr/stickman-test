import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom/client'
import PlayerChoice from './script/playerChoice.js'
import stickman1 from './image/stickman-1.png';
import stickman2 from './image/stickman-2.png';
import stickman3 from './image/stickman-3.png';
import lose1 from './image/lose-1.png';
import lose2 from './image/lose-2.png';
import lose3 from './image/lose-3.png';
import win from './image/win.png';
import './css/index.css'

function Board(){
    const stickman = [stickman1, stickman2, stickman3, stickman2];
    const lose = [lose1, lose2, lose3, lose2];

    const attack = {
        '0': {name: '集氣', cost: 1},
        '1': {name: '小砲', cost: -1},
        '2': {name: '大砲', cost: -2},
        '3': {name: '雙槍', cost: -3},
        '4': {name: '觀音', cost: -4},
        '5': {name: '如來神掌', cost: -5}
    }

    const defense = {
        '1': {name: '小砲防', cost: 0},
        '2': {name: '大砲防', cost: 0},
        '3': {name: '雙槍防', cost: 0},
        '4': {name: '觀音防', cost: 0},
        '5': {name: '如來神掌防', cost: 0}
    }
    
    const [playerPoint, setPlayerPoint] = useState(0);
    const [playerSkill, setPlayerSkill] = useState(null);
    const [cpuPoint, setCpuPoint] = useState(0);
    const [cpuSkill, setCpuSkill] = useState(null);
    const [turn, setTurn] = useState(0);
    const [winner, setWinner] = useState(null);
    const [img, setImg] = useState(0);

    useEffect(()=>{
        setTimeout(()=>{
            setImg((img+1)%stickman.length);
        }, 100)
    })

    function handleAction(action, playerSkillNumber){
        if(winner) return;
        let playerAction = action==='attack'?attack:defense;
        if(playerAction[playerSkillNumber].cost+playerPoint<0) return;
        setPlayerSkill(playerAction[playerSkillNumber].name);
        setPlayerPoint(playerAction[playerSkillNumber].cost+playerPoint);
        let CpuAttack = cpuPoint>=5?5:cpuPoint;
        let CpuDefense = playerPoint>=5?5:playerPoint;
        let numOfCpuAction = CpuAttack+CpuDefense+1;
        let cpuAction = Math.floor(Math.random()*numOfCpuAction)-CpuDefense;
        if(cpuAction>=0){ // attack or gain
            setCpuSkill(attack[cpuAction].name);
            setCpuPoint(cpuPoint+attack[cpuAction].cost);
        }
        else{ // defense
            setCpuSkill(defense[-cpuAction].name);
        }
        setTurn(turn+1)
        if(playerAction[playerSkillNumber].cost>=0 && cpuAction<=0) return;
        else if(Math.abs(playerSkillNumber)===Math.abs(cpuAction)) return;
        else if(action==='attack'){
            if(cpuAction>=0) playerSkillNumber>=cpuAction?setWinner('player'):setWinner('CPU');
            else setWinner('player');
        }
        else{
            setWinner('CPU');
        }
    }

    return <div className='board'>
        <p>{winner?winner+' win!':'Turn '+turn}</p>
        <hr/>
        <div>
            <p>CPU {cpuSkill?'uses '+cpuSkill:'is ready!'}</p>
            {winner===null?<img src={stickman[img]} alt="stickman"/>:
            (winner==='CPU'?<img src={lose[img]} alt="lose"/>:<img src={win} alt="win"/>)}
        </div>
        <div>
            <p>Player {playerSkill?'uses '+playerSkill:'is thinking!'}</p>
            {winner===null?<img src={stickman[img]} alt="stickman"/>:
            (winner==='player'?<img src={lose[img]} alt="lose"/>:<img src={win} alt="win"/>)}
        </div>
        <hr/>
        <p>You have {playerPoint} point{playerPoint>=2?'s':''} now!</p>
        <PlayerChoice point={playerPoint} click={(action, point)=>{handleAction(action, point)}} attack={attack} defense={defense}/>
        {winner?<button onClick={()=>{
            setPlayerPoint(0);
            setPlayerSkill(null);
            setCpuPoint(0);
            setCpuSkill(null);
            setTurn(0);
            setWinner(null);
        }}>try again!</button>:""}
    </div>
}

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(<Board/>)