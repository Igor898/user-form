<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="d-flex flex-column align-center">
          <v-card-title>Управление учетными записями</v-card-title>
          <v-card-text>
            <v-btn @click="addAccount" color="primary"
              ><v-icon icon="mdi-plus"></v-icon> Добавить учетную запись</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-for="account in accounts" :key="account.id">
      <v-col>
        <v-card>
          <v-card-text class="d-flex">
            <v-text-field
              class="mr-2"
              v-model="account.label"
              label="Метка"
              :rules="[validateLabel]"
              @blur="updateAccount(account)"
            ></v-text-field>

            <v-select
              class="mr-2"
              v-model="account.type"
              :items="['Локальная', 'LDAP']"
              label="Тип записи"
              @update:modelValue="updateAccount(account)"
            ></v-select>

            <v-text-field
              class="mr-2"
              v-model="account.login"
              label="Логин"
              :rules="[validateLogin]"
              @blur="updateAccount(account)"
            ></v-text-field>

            <v-text-field
              class="mr-2"
              v-if="account.type === 'Локальная'"
              v-model="account.password"
              label="Пароль"
              type="password"
              :rules="[validatePassword]"
              @blur="updateAccount(account)"
            ></v-text-field>

            <v-btn @click="removeAccount(account.id)" color="error"
              ><v-icon icon="mdi-delete-forever"></v-icon></v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAccountStore } from "../store/store";
import { storeToRefs } from "pinia";

const accountStore = useAccountStore();
const { accounts } = storeToRefs(accountStore);
const { addAccount, removeAccount, updateAccount } = accountStore;

const validateLabel = (value: string) => {
  if (value.length > 50) return "Максимум 50 символов";
  return true;
};

const validateLogin = (value: string) => {
  if (!value) return "Логин обязателен";
  if (value.length > 100) return "Максимум 100 символов";
  return true;
};

const validatePassword = (value: string) => {
  if (!value) return "Пароль обязателен";
  if (value.length > 100) return "Максимум 100 символов";
  return true;
};
</script>