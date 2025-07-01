export interface App {
    id: number;
    name: string;
    creator: {
        name: string;
        avatarUrl: string;
    };
    price: string;
    coins?: number;
    coverImageUrl: string;
    iconUrl: string;
    description: string;
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
  }

/**
 * Represents the data structure for the new app creation form.
 * It includes both string inputs and file objects for uploads.
 */
export interface NewAppData {
    name: string;
    description: string;
    youtubeLink: string;
    iosLink: string;
    androidLink: string;
    googleGroupLink: string;
    testingInstruction: string;
    price: number;
    icon?: File | null;
    coverImage?: File | null;
    screenshots: File[];
}
  