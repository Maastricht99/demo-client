export interface IMyProduct {
    id: number;
    name: string;
    description: string;
    currentPrice?: number;
    pictureUrl: string;
    status: "PENDING" | "AUCTIONED"; 
}

export interface IBid {
    id: string;
    productId?: string;
    userId: string;
    userFirstName: string;
    userLastName: string; 
    amount: number;
    createdAt: string;
}

export interface IAuctionedProduct {
    id: string;
    name: string;
    description: string;
    currentPrice: number;
    pictureUrl: string;
    lastBid: IBid | null;
}

export interface IProductDetails {
    name: string;
    description: string;
    pictureUrl: string;
}
