const db = require('./database');

async function insertDataToDatabase(data) {
    try {
        // Initialize database connection
        await db.initialize();

        const mockData = {
            id: 'mock-id-' + Math.random().toString(36).substr(2, 9),
            user_id: 'mock-user-id-' + Math.random().toString(36).substr(2, 9),
            app_name: data?.app_name || 'Mock App Name',
            description: data?.description || 'This is a mock description for the app.',
            joinedUserIds: ['user-1', 'user-2', 'user-3', '0'],
            testing_link: data?.testing_link || 'https://mock-testing-link.com',
            ios_link: data?.ios_link || 'https://mock-ios-link.com',
            android_link: data?.android_link || 'https://mock-android-link.com',
            testing_instruction: data?.testing_instruction || 'Mock testing instructions for testers.',
            test_price: data?.test_price || 0,
            instructions: data?.instructions || 'Mock instructions for testers.',
            youtube_link: data?.youtube_link || 'https://mock-youtube-link.com',
            google_group_link: data?.google_group_link || 'https://mock-google-group-link.com',
            icon_url: data?.icon_url || 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
            cover_image_url: data?.cover_image_url || 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=400&fit=crop',
            screenshot_urls: data?.screenshot_urls || [
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=600&fit=crop',
            'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=600&fit=crop'
            ],
            status: 'active',
            max_testers: data?.max_testers || 10,
            current_testers: 3,
            created_at: new Date(),
            updated_at: new Date(),
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };

        //delete the data

        const result = await db.insert('test_posts', mockData);
        console.log('Data inserted successfully:', result);
        return result;
    } catch (error) {
        console.error('Error inserting data into database:', error);
        throw error;
    }
}

insertDataToDatabase()
    .then(() => {
        console.log('✅ Mock data insertion completed');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Failed to insert mock data:', error);
        process.exit(1);
    });