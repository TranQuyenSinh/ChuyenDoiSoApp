import { useState } from 'react'

const useToggle = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = (value?: boolean) => {
        if (value) {
            setIsOpen(value)
        } else {
            setIsOpen(!isOpen)
        }
    }
    return { isOpen, toggle }
}

export default useToggle
