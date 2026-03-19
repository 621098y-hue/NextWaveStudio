/**
 * Area Converter Logic
 * 1 Pyeong (평) = 3.305785 Square Meters (㎡)
 * 1 Square Meter (㎡) = 0.3025 Pyeong (평)
 */

const PYEONG_TO_M2 = 3.305785;
const M2_TO_PYEONG = 0.3025;

document.addEventListener('DOMContentLoaded', () => {
    const pyeongInput = document.getElementById('pyeong-input');
    const m2Input = document.getElementById('m2-input');
    const quickBtns = document.querySelectorAll('.quick-btn');

    /**
     * Update Square Meter based on Pyeong input
     */
    const updateFromPyeong = () => {
        const pyeong = parseFloat(pyeongInput.value);
        if (!isNaN(pyeong)) {
            const m2 = pyeong * PYEONG_TO_M2;
            m2Input.value = formatValue(m2);
        } else {
            m2Input.value = '';
        }
    };

    /**
     * Update Pyeong based on Square Meter input
     */
    const updateFromM2 = () => {
        const m2 = parseFloat(m2Input.value);
        if (!isNaN(m2)) {
            const pyeong = m2 * M2_TO_PYEONG;
            pyeongInput.value = formatValue(pyeong);
        } else {
            pyeongInput.value = '';
        }
    };

    /**
     * Format value to 2 decimal places if needed, removing trailing zeros
     */
    const formatValue = (num) => {
        return parseFloat(num.toFixed(2)).toString();
    };

    // Event Listeners for real-time conversion
    pyeongInput.addEventListener('input', updateFromPyeong);
    m2Input.addEventListener('input', updateFromM2);

    // Quick Select Buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            const value = btn.getAttribute('data-value');

            if (type === 'pyeong') {
                pyeongInput.value = value;
                updateFromPyeong();
                pyeongInput.focus();
            } else if (type === 'm2') {
                m2Input.value = value;
                updateFromM2();
                m2Input.focus();
            }
            
            // Subtle pulse animation on click
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 100);
        });
    });

    // Optional: Add a subtle entry animation for the card
    const card = document.querySelector('.converter-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
});
