module.exports = {
    validate(isni) {
        const isniString = isni?.toString() || '';
        const stripped = isniString.replace(/\s+/g, '').replace(/-/g, '');
        if (stripped.length !== 16) {
            return false;
        }
        const baseDigits = stripped.substring(0, 15);
        const checksum = stripped.substring(15, 16);
        const calculatedChecksum = calculateChecksum(baseDigits);
        if (checksum !== calculatedChecksum) {
            return false;
        }
        return true;
    },
    generate() {
        const baseDigits = Math.floor(Math.random() * 1000000000000000).toString().padStart(15, '0');
        const checksum = calculateChecksum(baseDigits);
        return baseDigits.toString() + checksum.toString();
    }
}

const calculateChecksum = (isniBaseDigits) => {
    let total = 0;
    for (let i = 0; i < 15; i++) {
        total = (total + parseInt(isniBaseDigits.charAt(i), 10)) * 2;
    }
    const remainder = total % 11;
    const result = (12 - remainder) % 11;
    return result === 10 ? 'X' : result.toString();
}