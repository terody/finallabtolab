export interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: Date;
  category: string;
  createdAt: Date;
  createdBy: {
    name: string;
    email: string;
    company: string;
  };
  bids: Array<{
    amount: string;
    timeframe: string;
    description: string;
    createdAt: Date;
    bidder: {
      name: string;
      email: string;
      company: string;
      phone: string;
    };
  }>;
}