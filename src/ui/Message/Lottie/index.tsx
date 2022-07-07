import { createRef, useEffect } from "react"
import lottie from 'lottie-web'

interface Props {
	data: string
	width: number
	height: number
}

export const Lottie = ({ data, width, height }: Props) => {
	const ref = createRef<HTMLDivElement>()

	useEffect(() => {
		lottie.loadAnimation({
			container: ref.current,
			animationData: JSON.parse(data),
			renderer: 'canvas'
		})
	}, [])

	return <div style={{ width: width+'px', height: height+'px' }} ref={ref} />	
}
