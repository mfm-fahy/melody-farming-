import { MongoClient, Db, ObjectId } from 'mongodb';

export interface CartItem {
  id: string;
  customerId: string;
  farmerId: string;
  productType: string;
  breed: string;
  quantity: number;
  pricePerUnit: number;
  weight?: string;
  minimumGuaranteedWeight?: number;
  createdAt: Date;
}

class CartStorage {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  private async connect() {
    if (!this.client) {
      this.client = new MongoClient(process.env.MONGODB_URI!);
      await this.client.connect();
      this.db = this.client.db();
    }
    return this.db!;
  }

  async getItems(customerId: string): Promise<CartItem[]> {
    try {
      const db = await this.connect();
      const items = await db.collection('cart').find({ customerId }).toArray();
      return items.map(item => ({ ...item, id: item._id.toString() }));
    } catch {
      return [];
    }
  }

  async addItem(customerId: string, item: Omit<CartItem, 'id' | 'customerId' | 'createdAt'>): Promise<CartItem> {
    const db = await this.connect();
    
    const existing = await db.collection('cart').findOne({
      customerId,
      farmerId: item.farmerId,
      productType: item.productType,
      breed: item.breed
    });

    if (existing) {
      const updated = await db.collection('cart').findOneAndUpdate(
        { _id: existing._id },
        { $inc: { quantity: item.quantity } },
        { returnDocument: 'after' }
      );
      if (updated.value) {
        return { ...updated.value, id: updated.value._id.toString() };
      } else {
        // Fallback: get the updated document
        const updatedDoc = await db.collection('cart').findOne({ _id: existing._id });
        return { ...updatedDoc, id: updatedDoc._id.toString() };
      }
    } else {
      const newItem = {
        ...item,
        customerId,
        createdAt: new Date(),
      };
      const result = await db.collection('cart').insertOne(newItem);
      return { ...newItem, id: result.insertedId.toString() };
    }
  }

  async removeItem(customerId: string, itemId: string): Promise<void> {
    const db = await this.connect();
    await db.collection('cart').deleteOne({ customerId, _id: new ObjectId(itemId) });
  }

  async updateQuantity(customerId: string, itemId: string, quantity: number): Promise<void> {
    const db = await this.connect();
    await db.collection('cart').updateOne(
      { customerId, _id: new ObjectId(itemId) },
      { $set: { quantity } }
    );
  }

  async clear(customerId: string): Promise<void> {
    const db = await this.connect();
    await db.collection('cart').deleteMany({ customerId });
  }
}

export const cartStorage = new CartStorage();