<template>
    <v-app-bar dark fixed app>
        <v-app-bar-nav-icon @click.stop="$emit('onDrawerToggle')"></v-app-bar-nav-icon>
        <v-text-field v-model="search"
                      solo
                      label="Type to search"
                      prepend-inner-icon="mdi-magnify"
                      class="mt-6"
                      clearable
                      rounded
                      dark
                      @click:clear="clear">
        </v-text-field>
        <v-spacer></v-spacer>
    </v-app-bar>
</template>

<script>
    import { eventBus } from '../main';
    export default {
        name: 'Search',
        props: {
            drawer: Boolean,
        },
        data: () => ({
            search: ''
        }),
        methods: {
            clear() {
                this.$nextTick().then(() => this.search = '');
            }
        },
        watch: {
            search(search) {
                eventBus.$emit('onSearch', search);
            }
        }
    }
</script>