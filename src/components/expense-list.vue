<template>
  <div id="parent-container">
    <div id="list-container" class="px-4 py-8 my-5 bg-orange-300 rounded-3xl">
      <table class="max-w-5xl text-center table-fixed">
        <thead class="text-lg font-bold">
          <th class="px-4 py-3">Product Date</th>
          <th class="px-4 py-3">Product Name</th>
          <th class="px-4 py-3">Product Price</th>
          <th class="px-5 py-3">Actions</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in expenses" :key="index">
            <td>{{ item.picked }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>

            <td class="">
              <button
                class="px-5 mx-3 my-1 text-xs bg-transparent border-2 border-green-600"
                @click="editMode = item"
              >
                Edit
              </button>
              <button
                class="text-xs bg-transparent border-2 border-red-500"
                @click="deleteExpense(item)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colspan="1"></td>
            <td class="text-lg font-bold">Total:</td>
            <td class="text-lg font-bold bg-white rounded-full">{{ total }}</td>
          </tr>
        </tfoot>
      </table>
      <div v-if="editMode" class="text-center">
        <h2 class="py-3 text-lg font-bold">Edit Expense</h2>
        <form @submit.prevent="updateExpense">
          <input
            type="text"
            v-model="editMode.name"
            placeholder="Product Name"
            class="py-1 ml-24 text-center rounded-full max-w-64"
          />
          <input
            type="number"
            v-model="editMode.price"
            placeholder="Product Price"
            class="px-2 py-1 mx-2 text-center rounded-full max-w-32"
          />
          <button
            type="submit"
            class="px-5 mx-3 my-1 text-xs text-white bg-green-600"
          >
            Save
          </button>
          <button @click="cancelEdit" class="text-xs text-white bg-red-500">
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useExpenseStore } from "../store/index";

const expenseStore = useExpenseStore();
const expenses = computed(() => expenseStore.expense);

const editMode = ref(null);
const editModeIndex = ref(-1);

const deleteExpense = (expense) => {
  expenseStore.deleteExpense(expense);
};

const updateExpense = () => {
  if (editMode.value !== null) {
    expenseStore.editExpense(editMode.value, editModeIndex.value);
    editMode.value = null;
    editModeIndex.value = -1;
  }
};

const cancelEdit = () => {
  editMode.value = null;
  editModeIndex.value = -1;
};

const total = computed(() => {
  return expenses.value.reduce((acc, curr) => acc + curr.price, 0);
});

const startEditMode = (expense, index) => {
  editMode.value = { ...expense };
  editModeIndex.value = index;
};
</script>
