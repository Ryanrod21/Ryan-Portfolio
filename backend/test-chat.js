async function testChat() {
	const response = await fetch("http://localhost:3001/api/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			messages: [
				{
					role: "user",
					content:
						"Can you tell me what projects Ryan has built? Name of the projects would be helpful.",
				},
			],
		}),
	});

	const data = await response.json();
	console.log("Response:", data);
}

testChat();
