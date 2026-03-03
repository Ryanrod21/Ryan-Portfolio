import { useState } from "react";
import {
	ChatProvider,
	Chat,
	ChatInput,
	ChatMessage,
} from "@openai/chatkit-react";
import "@openai/chatkit-react/style.css";

export default function Chatbox() {
	const [messages, setMessages] = useState([
		{
			role: "assistant",
			content:
				"Hi! I'm Ryan's assistant. Ask me anything about Ryan's skills, projects, or experience.",
		},
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handelSendMessage = async (content) => {
		if (!content.trim()) return;

		const userMessage = { role: "user", content };
		const updatedMessages = [...messages, userMessage];
		setMessages(updatedMessages);
		setIsLoading(true);

		try {
			const response = await fetch("http://localhost:3001/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: updatedMessages }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			const assistantMessage = { role: "assistant", content: data.response };
			setMessages([...updatedMessages, assistantMessage]);
		} catch (error) {
			console.error("Error sending message:", error);

			setMessages([
				...updatedMessages,
				{
					role: "assistant",
					content:
						"Sorry, there was an error processing your request. Please try again later.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};
}
