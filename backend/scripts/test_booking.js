const API_URL = 'http://localhost:3000/api/bookings';

async function testBooking() {
    console.log('Testing booking performance...');

    // Randomize email to avoid duplication check if any
    const randomId = Math.floor(Math.random() * 10000);
    const bookingData = {
        checkIn: "2026-02-01",
        checkOut: "2026-02-03",
        roomType: "ac",
        guests: 2,
        firstName: "Test",
        lastName: "User",
        email: `testuser${randomId}@example.com`,
        phone: "1234567890",
        specialRequests: "Testing timeout fix"
    };

    const start = Date.now();
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        const end = Date.now();
        const duration = end - start;
        const data = await response.json();

        if (response.status === 201) {
            console.log(`✅ Booking successful!`);
            console.log(`⏱️ Duration: ${duration}ms`);

            if (duration < 2000) {
                console.log('✅ Performance verification PASSED (Response < 2s)');
            } else {
                console.error('❌ Performance verification FAILED (Response > 2s)');
            }
        } else {
            console.error(`❌ Booking failed with status ${response.status}:`, data);
        }

    } catch (error) {
        console.error('❌ Request failed:', error);
    }
}

testBooking();
