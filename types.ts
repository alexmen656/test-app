export interface App {
    id: number;
    name?: string;
    app_name?: string; // Backend field name
    creator?: {
        id: string;
        name: string;
        avatarUrl: string;
        slackLink?: string;
    };
    user_info?: {
        username: string;
        profile_image: string;
        user_id: string;
    };
    price?: string | number;
    test_price?: string | number;
    coins?: number;
    coverImageUrl?: string;
    cover_image_url?: string; // Backend field name
    iconUrl?: string;
    icon_url?: string; // Backend field name
    description?: string;
    iosLink?: string;
    ios_link?: string; // Backend field name
    testingInstruction?: string;
    testing_instruction?: string; // Backend field name
    androidLink?: string;
    android_link?: string; // Backend field name
    googleGroupLink?: string;
    google_group_link?: string; // Backend field name
    screenshots?: string[];
    screenshot_urls?: string[]; // Backend field name
    videoUrl?: string;
    youtube_link?: string; // Backend field name
    reviews?: {
        id: number;
        reviewerName: string;
        score: number;
        comment: string;
    }[];
    joinedTesters?: {
        id: string;
        name: string;
        avatarUrl: string;
    }[];
    joinedUserIds?: string[]; // Array of user IDs who joined the test
    testingFocus?: string;
    focusAreas?: string[];
    subtitle?: string;
    createdAt?: string;
    created_at?: string; // Backend field name
    testPeriod?: string;
    feedbackInstructions?: string;
}

/**
 * Represents the data structure for the new app creation form.
 * It includes both string inputs and file objects for uploads.
 */
export interface NewAppData {
    name: string;
    description: string;
    videoUrl?: string | null;
    iosLink?: string | null;
    androidLink?: string | null;
    googleGroupLink?: string | null;
    testingInstruction: string;
    price: number;
    icon?: File | null;
    iconUrl?: string | null;
    coverImage?: File | null;
    screenshots: File[];
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}
