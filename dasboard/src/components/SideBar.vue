<template>
<div>
    <Search :drawer="drawer" @onDrawerToggle="drawer = !drawer"/>
    <v-navigation-drawer left
                         v-model="drawer"
                         app
                         color="green darken-4">
        <template v-slot:prepend>
            <v-list-item two-line class="d-flex justify-center">
                <img src="../assets/logo.png">
            </v-list-item>
        </template>
        <v-divider></v-divider>
        <Users/>
    </v-navigation-drawer>
</div>
</template>

<script>
    import Users from './Users';
    import Search from './Search';
    export default {
        components: {
            Users,
            Search
        },
        name: 'SideBar',
        data: () => ({
            drawer: null
        })
    }
</script>
