<template>
  <div id="main-parent" class="max-w-full">
    <h1 class="py-12 text-3xl font-bold text-center">
      [ Monthly Expense Tracker ]
    </h1>
    <form @submit.prevent="add">
      <div class="flex gap-5">
        <div class="flex gap-4 px-5 py-5 bg-orange-400 rounded-full">
          <Datepicker
            v-model="picked"
            inputFormat="yyyy-MM-dd"
            class="py-2 text-center rounded-full outline-none max-w-32"
          />
          <field
            type="text"
            v-model="name"
            placeholder="Product Name"
            class="px-2 py-2 rounded-full outline-none max-w-64"
            @keydown.enter.prevent="add"
          />

          <field
            type="number"
            v-model="price"
            placeholder="Product Price"
            class="py-2 text-center rounded-full outline-none max-w-32"
            @keydown.enter.prevent="add"
          />
        </div>
        <div class="gap-4 px-8 py-5 bg-orange-400 rounded-full">
          <button
            class="py-2 text-base rounded-full outline-none"
            type="submit"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import Datepicker from "vue3-datepicker";
import { ref } from "vue";
import { useExpenseStore } from "../store/index";
import { Form, Field } from "vee-validate";
// import { useForm } from "vee-validate";
// import { object, string } from "yup";
// import { toTypedSchema } from "@vee-validate/yup";

const picked = ref(new Date());
const name = ref("");
const price = ref("");

const expenseStore = useExpenseStore();

const add = () => {
  expenseStore.addExpense({
    picked: formatDate(picked.value),
    name: name.value,
    price: parseFloat(price.value),
  });

  name.value = "";
  price.value = "";
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// const { values, handleSubmit } = useForm({
//   validationSchema: toTypedSchema(
//     object({
//       price: string().required(),
//       name: string().required(),
//     })
//   ),
// });
</script>
