import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/models/account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)

    if (hashedPassword) {
      const createdAccount: AccountModel = {
        id: 'generated_id',
        name: account.name,
        email: account.email,
        password: hashedPassword
      }

      return createdAccount
    } else {
      throw new Error('Failed to encrypt password')
    }
  }
}
