export interface App {
    id: number;
    name: string;
    creator: {
        id: string;
        name: string;
        avatarUrl: string;
        slackLink: string;
    };
    price: string;
    coins?: number;
    coverImageUrl: string;
    iconUrl: string;
    description: string;
    iosLink: string;
    testingInstruction: string;
    androidLink: string;
    googleGroupLink: string;
    screenshots: string[];
    videoUrl?: string;
    reviews: {
        id: number;
        reviewerName: string;
        score: number;
        comment: string;
    }[];
    joinedTesters: {
        id: number;
        name: string;
        avatarUrl: string;
    }[];
    testingFocus: string;
    focusAreas: string[];
    subtitle: string;
    createdAt: string;
    testPeriod?: string;
    feedbackInstructions: string,
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
  