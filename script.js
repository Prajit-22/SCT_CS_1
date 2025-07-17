document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const shiftValue = document.getElementById('shift-value');
    const shiftSlider = document.getElementById('shift-slider');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const closeBtn = document.querySelector('.close-btn');
    const copyBtn = document.getElementById('copy-btn');
    const saveBtn = document.getElementById('save-btn');
    const loadBtn = document.getElementById('load-btn');
    const twitterShareBtn = document.getElementById('twitter-share-btn');
    const whatsappShareBtn = document.getElementById('whatsapp-share-btn');

    // Sync slider and number input
    shiftSlider.addEventListener('input', () => {
        shiftValue.value = shiftSlider.value;
    });

    shiftValue.addEventListener('input', () => {
        let value = parseInt(shiftValue.value);
        if (isNaN(value)) {
            value = 3;
        } else if (value > 25) {
            value = 25;
        } else if (value < 1) {
            value = 1;
        }
        shiftValue.value = value;
        shiftSlider.value = value;
    });

    // Caesar Cipher Logic
    function caesarCipher(text, shift, decrypt = false) {
        if (decrypt) {
            shift = (26 - shift) % 26;
        }

        return text.replace(/[a-zA-Z]/g, (char) => {
            const charCode = char.charCodeAt(0);
            const isUpperCase = char === char.toUpperCase();
            const base = isUpperCase ? 65 : 97;
            
            const newCharCode = ((charCode - base + shift) % 26) + base;
            return String.fromCharCode(newCharCode);
        });
    }

    // Event Listeners
    encryptBtn.addEventListener('click', () => {
        const text = inputText.value;
        const shift = parseInt(shiftValue.value);
        if (text && !isNaN(shift)) {
            outputText.value = caesarCipher(text, shift);
            playAnimation(encryptBtn);
        } else {
            alert("Please enter text and a valid shift value.");
        }
    });

    decryptBtn.addEventListener('click', () => {
        const text = inputText.value;
        const shift = parseInt(shiftValue.value);
        if (text && !isNaN(shift)) {
            outputText.value = caesarCipher(text, shift, true);
            playAnimation(decryptBtn);
        } else {
            alert("Please enter text and a valid shift value.");
        }
    });

    // Help Modal
    helpBtn.addEventListener('click', () => {
        helpModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        helpModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == helpModal) {
            helpModal.style.display = 'none';
        }
    });

    // Save and Load functionality
    saveBtn.addEventListener('click', () => {
        const data = {
            text: inputText.value,
            shift: shiftValue.value
        };
        localStorage.setItem('caesarCipherData', JSON.stringify(data));
        alert('Data saved!');
        playAnimation(saveBtn);
    });

    loadBtn.addEventListener('click', () => {
        const savedData = localStorage.getItem('caesarCipherData');
        if (savedData) {
            const data = JSON.parse(savedData);
            inputText.value = data.text;
            shiftValue.value = data.shift;
            shiftSlider.value = data.shift;
        } else {
            alert('No saved data found.');
        }
        playAnimation(loadBtn);
    });

    // Share functionality
    encryptBtn.addEventListener('click', updateShareLinks);
    decryptBtn.addEventListener('click', updateShareLinks);

    function updateShareLinks() {
        const text = outputText.value;
        if (text) {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            twitterShareBtn.href = twitterUrl;

            const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
            whatsappShareBtn.href = whatsappUrl;
        }
    }

     // Copy to clipboard
    copyBtn.addEventListener('click', () => {
        outputText.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy to Clipboard';
        }, 1500);
    });

    // Fun button animation
    function playAnimation(button) {
        button.classList.add('active');
        requestAnimationFrame(() => {
            setTimeout(() => {
                button.classList.remove('active');
            }, 300);
        });
    }

    // Defer font loading
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@300;400&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
}); 