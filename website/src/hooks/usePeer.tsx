const { useEffect, useState } = require("react")
import Peer from "peerjs"
const usePeer = () =>{
     const [peer, setPeer] = useState(null)
    const [myId, setMyId] = useState('')

    useEffect(()=>{
            const myPeer = new Peer()
            setPeer(myPeer)
            myPeer.on('open', (id)=>{
                console.log('your peer id is ',id)
                setMyId(id)
            })
    },[])

    return {
        peer,
        myId
    }
}
export default usePeer