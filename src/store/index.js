import { defineStore } from "pinia";

export const useExpenseStore = defineStore({
  id: "expense-store",
  state: () => ({
    expense: [],
  }),
  actions: {
    addExpense(expense) {
      this.expense.push(expense);
    },
    deleteExpense(expenseToDelete) {
      this.expense = this.expense.filter((item) => item !== expenseToDelete);
    },

    editExpense(updatedExpense, index) {
      console.log("Index:", index);
      console.log("Expense:", updatedExpense);
      if (index >= 0 && index < this.expense.length) {
        this.expense[index] = updatedExpense;
      } else {
        console.warn("Invalid index:", index);
        // Optionally, you could return early or handle the error differently
        return;
      }
    },
  },
  persist: true,
});
