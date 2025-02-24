import { defineStore } from 'pinia';

interface Account {
  id: number;
  label: string;
  type: 'LDAP' | 'Локальная';
  login: string;
  password: string | null;
}

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: JSON.parse(localStorage.getItem('accounts') || '[]') as Account[],
  }),
  actions: {
    saveToLocalStorage() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
    },
    
    addAccount() {
      this.accounts.push({
        id: Date.now(),
        label: '',
        type: 'Локальная',
        login: '',
        password: '',
      });
      this.saveToLocalStorage();
    },

    removeAccount(id: number) {
      this.accounts = this.accounts.filter((account) => account.id !== id);
      this.saveToLocalStorage();
    },

    updateAccount(updatedAccount: Account) {
      const index = this.accounts.findIndex((a) => a.id === updatedAccount.id);
      if (index !== -1) {
        this.accounts[index] = updatedAccount;
        this.saveToLocalStorage();
      }
    },
  },
});
