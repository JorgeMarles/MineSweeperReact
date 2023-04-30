import Timer from "./Timer";

export default function Info(props: any) {
    const MINA = 'bg-red-500';
    const MARCADO = 'bg-green-500';
    const SIN_ROMPER = 'bg-blue-500';
    return <>
    
        <div className="ml-8 w-full rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Información</div>
                <p className="text-gray-700 text-base">
                    Minas: <b>{props.minas}</b><br/>
                    Tiempo: <Timer time={props.time} setTime={props.setTime} />
                </p>
            </div>
            <div className={`border-2 border-black w-50 h-24 text-center align-middle ${MARCADO}`} >Celda Marcada</div>
            <br></br>
            <div className={`border-2 border-black w-50 h-24 text-center align-middle ${SIN_ROMPER}`} >Celda Sin Romper</div>
            <br></br>
            <div className={`border-2 border-black w-50 h-24 text-center align-middle ${MINA}`} >Mina</div>
        </div>
    </>;
}