<template>
    <v-main>
        <v-container fluid grid-list-xl>
            <h2 class="red--text text--lighten-5">TODAY</h2>
            <v-layout wrap justify-space-around>
                <v-flex v-for="post in filteredPostsList" :key="post.id">
                    <Card :post="post"/>
                </v-flex>
            </v-layout>
            <v-alert v-if="!filteredPostsList.length"
                     outlined
                     type="success">
                     No items found
            </v-alert>
        </v-container>
    </v-main>
</template>

<script>
    import dataService from '../services/data-service';
    import Card from '../components/Card';
    import { eventBus } from '../main';
    export default {
        name: 'Board',
        components: {
            Card
        },
        data: () => ({
            posts: [],
            search: ''
        }),
        computed: {
            filteredPostsList() {
                return this.posts.filter(post => post.title.includes(this.search)
                    || post.title.includes(this.search));
            }
        },
        async beforeMount() {
            const { data } = await dataService.getPosts(this.$route.params.id);
            this.posts = data;
        },
        mounted() {
            eventBus.$on('onSearch', search => this.search = search);
        },
        watch: {
            async $route (to){
                const { data } = await dataService.getPosts(to.params.id);
                this.posts = data;
            }
        } 
    }
</script>

<style lang="scss">
    .v-main {

        &__wrap {
            background-color: #353535;
        }
    }
</style>