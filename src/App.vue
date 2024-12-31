<script setup lang="ts">
  import DnDProvider from './components/DnDProvider.vue';
  import Draggable from './components/Draggable.vue';
  import Droppable from './components/Droppable.vue';
  import { IDnDProvider } from './@types';
  import { ref } from 'vue';

  interface IUser {
    id: number;
    name: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
  }

  const newUser = ref<IUser[]>([
    {
      id: 6,
      name: 'New',
      lastName: 'User',
      age: 20,
      email: 'new.user@example.com',
      phone: '+79999999999',
    },
  ]);

  const items = ref<IUser[]>([
    {
      id: 1,
      name: 'John',
      lastName: 'Doe',
      age: 20,
      email: 'john.doe@example.com',
      phone: '+79999999999',
    },
    {
      id: 2,
      name: 'Jane',
      lastName: 'Doe',
      age: 20,
      email: 'jane.doe@example.com',
      phone: '+79999999999',
    },
    {
      id: 3,
      name: 'John',
      lastName: 'Smith',
      age: 20,
      email: 'john.smith@example.com',
      phone: '+79999999999',
    },
    {
      id: 4,
      name: 'John',
      lastName: 'Malkovich',
      age: 20,
      email: 'john.malkovich@example.com',
      phone: '+79999999999',
    },
    {
      id: 5,
      name: 'John',
      lastName: 'Agile',
      age: 20,
      email: 'john.agile@example.com',
      phone: '+79999999999',
    },
  ]);
</script>

<template>
  <DnDProvider>
    <TransitionGroup
      name="list"
      tag="div"
    >
      <Draggable
        v-for="item in newUser"
        :key="item.id"
      >
        <div>
          <span>{{ item }}</span>
        </div>
      </Draggable>
    </TransitionGroup>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <TransitionGroup
        tag="tbody"
        name="list"
      >
        <tr
          v-for="item in items"
          :key="item.id"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
        </tr>
        <tr>
          <td colspan="5">
            <Droppable />
          </td>
        </tr>
      </TransitionGroup>
    </table>

    <Draggable
      v-for="item in items"
      :key="item.id"
    >
      <div>
        <span>{{ item }}</span>
      </div>
    </Draggable>
  </DnDProvider>
</template>

<style>
  .table tr,
  .table div {
    height: 50px;
  }

  .list-move, /* apply transition to moving elements */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute;
  }
</style>
