const { useState, useEffect } = React
import { eventBus } from '../services/event-bus.service.js'

export function PopupMsg() {
    const [msg, setMsg] = useState({})

    useEffect(() => {
        eventBus.on('user-msg', (msg) => {
            setMsg(msg)
            setTimeout(() => setMsg({}), 2000)
        })
    }, [])

    if (!msg.txt) return <span></span>

    return <section className={`user-msg ${msg.type}`}>{msg.txt}</section>
}
