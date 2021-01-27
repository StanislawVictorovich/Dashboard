<template>
    <v-list dense dark>
        <v-list-item-group v-model="selectedUser">
            <v-list-item v-for="(user, index) in users"
                         :key="user.title">
                <v-list-item-icon>
                    <v-icon>{{`mdi-account${ index ? '' : '-group'}`}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ user.name }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
    import dataService from '../services/data-service';
    import { ALL_USERS } from '../constants';
    export default {
        name: 'Users',
        data: () => ({
            users: [],
            selectedUser: 0
        }),
        methods: {
            getUserId(index) {
                return this.users[index].id;
            }
        },
        async beforeMount() {
            const { data } = await dataService.getUsers();
            this.users = [{ name: 'All subscriptions', id: ALL_USERS }, ...data];
        },
        watch: {
            selectedUser(id) {
                this.$router.push({ name: 'Users', params: { id: this.getUserId(id) } });
            }
        }
    }
</script>
