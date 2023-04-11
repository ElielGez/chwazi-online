const copyToClipboardDepricated = (text: string) => {
	const textArea = document.createElement('textarea');
	textArea.style.position = 'fixed';
	textArea.style.top = '0';
	textArea.style.left = '0';
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	document.execCommand('copy');
	document.body.removeChild(textArea);
};

export const copyToClipboard = async (text: string): Promise<void> => {
	copyToClipboardDepricated(text);
};
