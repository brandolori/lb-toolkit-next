import { Container } from "@mantine/core"
import { useEffect } from "react"
import ClipboardSync from "./ClipboardSync"

const ClipboardStandalone = () => {
    useEffect(() => {
        window.electronAPI.readyToShow()
    }, [])
    return <Container className="header" py="xl">
        <ClipboardSync />
    </Container>
}

export default ClipboardStandalone