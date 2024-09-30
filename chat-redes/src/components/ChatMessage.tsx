/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ChatMessage(props: {message: string}) {
	const text = props.message;

	return (<>
		<div >
			<p>{text}</p>
		</div>
	</>)
}