import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: undefined as MongoClient | undefined,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect () {
    if (this.client) {
      await this.client.close()
    }
  },

  getCollection (name: string): Collection {
    if (!this.client) {
      throw new Error('MongoClient is not connected')
    }
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWihoutId } = collection
    return Object.assign({}, collectionWihoutId, { id: _id.toString() })
  }
}
