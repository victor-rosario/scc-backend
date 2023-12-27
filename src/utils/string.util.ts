import { LevelCodeType, levelCodes } from "@constants"

export const generateDummyKey = (text: string) => {
	const textLengthHalf = text.length / 2
	const dummyKeyLength =
		textLengthHalf + Math.floor(Math.random() * (textLengthHalf - 1) + 1)
	const dummyKey = '*'.repeat(dummyKeyLength)

	return dummyKey
}

export const isValidIPAddress = (address: string): boolean => {
	const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
	const ipv6Regex = /^(([0-9a-fA-F]{1,4}):){7}([0-9a-fA-F]{1,4})$/

	return ipv4Regex.test(address) || ipv6Regex.test(address)
}

export const isValidUuid = (uuid: string, version = 4): boolean => {
	const pattern =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i
	const parsedUuid = uuid.toLocaleLowerCase()

	if (!pattern.test(parsedUuid)) return false

	switch (version) {
		case 1:
		case 2:
			return true

		case 3:
		case 4:
		case 5:
			return ['8', '9', 'a', 'b'].indexOf(parsedUuid.charAt(19)) !== -1

		default:
			console.error('isValidUuid is invalid')
			return false
	}
}

export const isValidEmail = (email: string) => {
	const emailValidator = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
	return emailValidator.test(email);
}

export const isValidIDCard = (idCard: string) => {
	const idCardRegex = /^[0-9]{11}$/;
	return idCardRegex.test(idCard);
}

export const versionUuid = (uuid: string): number => {
	return Number(uuid.charAt(14) || 0)
}

export const generateCode = (length = 3, type: LevelCodeType = 'strong'): string => {
	const select = levelCodes[type];
	if (!select) return '';

	let result = '';
	for (let index = 0; index < length; index++) {
		result += select.charAt(Math.floor(Math.random() * select.length));
	}

	return result;
};


export const generateCaseNumber = (
	caseNumber: number,
	judgeInitials: string,
	caseType = "CND",
	divisionCode = generateCode(3, 'upper'),
	caseYear = new Date().getFullYear(),
) => {
	const formattedYear = caseYear.toString().slice(-2);
	const formattedNumber = caseNumber.toString().padStart(4, '0');
	const judgePart = judgeInitials ? `-${judgeInitials}` : '';

	const caseNum = `${divisionCode}-${formattedYear}-${caseType}-${formattedNumber}${judgePart}`;

	return caseNum;
}

export const initialsFromFullName = (fullName: string): string => {
	const words = fullName.split(" ");
	let initials = "";

	for (const word of words) {
		initials += word.charAt(0).toUpperCase();
	}

	return initials;
}