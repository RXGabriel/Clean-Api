/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRespository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    const accountId = result.insertedId

    if (!accountId) {
      throw new Error('Failed to insert account')
    }

    return MongoHelper.map({ ...accountData, id: accountId.toString() })
  }
}
