import { useEffect, useState } from "react";


export default function Celda(props: any) {
    
    function handleClick(e: any){
        let result = props.handleClick(props.i, props.j, e);
    }

    return (
        <>
            <div onContextMenu={(e) => e.preventDefault()} onMouseDown={e => props.handleClick(props.i, props.j, e)} className={`table-cell border-2 border-black w-12 h-24 text-center align-middle ${props.c}`} key={props.key}>{props.numero}</div>
        </>
    );
}