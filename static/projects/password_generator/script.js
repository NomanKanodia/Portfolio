document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const copyBtn = document.getElementById('copyBtn');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeLetters = document.getElementById('includeLetters');
    const includeMixedCase = document.getElementById('includeMixedCase');
    const includePunctuation = document.getElementById('includePunctuation');
    const charRange = document.getElementById('charRange');
    const charCount = document.getElementById('charCount');
    const generateBtn = document.getElementById('generateBtn');

    const numbers = '0123456789';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const mixedCase = letters + letters.toUpperCase();
    const punctuation = '!@#$%^&*()_+[]{}|;:,.<>?';

    function generatePassword() {
        let charset = '';
        if (includeNumbers.checked) charset += numbers;
        if (includeLetters.checked) charset += letters;
        if (includeMixedCase.checked) charset += mixedCase;
        if (includePunctuation.checked) charset += punctuation;

        const passwordLength = parseInt(charRange.value);
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        passwordInput.value = password;
    }

    charRange.addEventListener('input', () => {
        charCount.textContent = charRange.value;
    });

    copyBtn.addEventListener('click', () => {
        passwordInput.select();
        document.execCommand('copy');
        alert('Password copied to clipboard');
    });

    generateBtn.addEventListener('click', generatePassword);

    // Initial password generation
    generatePassword();
});
