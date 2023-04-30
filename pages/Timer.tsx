import { useEffect, useState } from "react";

export default function Timer(props: any) {
    const inicial: Date = props.time;
    const actual: Date = new Date();
    const diff: number = actual.getTime() - inicial.getTime() - (7 * 60 * 60 * 1000);

    const [time, setTime] = useState(getStringTime(new Date(new Date().getTime() - inicial.getTime())))

    useEffect(() => {
        const id = tick()
        return () => clearTimeout(id)
    }, [])


    const tick = () => {
        return setInterval(() => {
            setTime(() => getStringTime(new Date(new Date().getTime() - inicial.getTime())))

        }, 1000)
    }

    function getStringTime(d: Date): string{
        function pad(d: number):string {
            return (d < 10) ? '0' + d.toString() : d.toString();
        }

        const hours = d.getUTCHours();
        const minutes = d.getUTCMinutes();
        const seconds = d.getUTCSeconds();
        if(hours === 0){
            return `${pad(minutes)}:${pad(seconds)}`;
        }else{
            return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
    }
    props.setTime(time);
    return (
        <>{time}</>
    )
}