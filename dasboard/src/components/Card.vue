<template>
    <v-hover v-slot="{ hover }">
        <v-card :width="width"
                dark
                color="grey darken-1"
                :class="{ 'on-hover': hover }"
                :elevation="hover ? 16 : 2"
                :loading="isLoadingInProgress">
            <template slot="progress">
            <v-progress-linear color="green darken-4"
                               height="10"
                               indeterminate>
            </v-progress-linear>
            </template>
            <v-card-text>
                <p class="display-1">{{post.title}}</p>
                <div>{{post.body}}</div>
            </v-card-text>
            <v-card-actions>
                <v-btn icon @click="openComments">
                    <v-icon>{{ `mdi-chevron-${ isCommentsShowed ? 'up' : 'down' }` }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="isCommentsShowed">
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-list three-line color="grey darken-1">
                            <v-subheader>Comments</v-subheader>
                            <v-divider></v-divider>
                            <v-skeleton-loader v-if="isLoadingInProgress"
                                               type="article, actions"
                                               color="green darken-4">
                            </v-skeleton-loader>
                            <v-list-item v-for="comment in comments" :key="comment.title">
                                <v-list-item-avatar>
                                    <v-icon>{{"mdi-account-tie"}}</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{comment.email}}</v-list-item-title>
                                    <v-list-item-subtitle>{{comment.body}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <v-textarea v-model="text"
                                    class="mx-2"
                                    label="Write your comment here"
                                    rows="1"
                                    prepend-icon="mdi-comment">
                        </v-textarea>
                        <v-btn class="ma-2"
                               :loading="isCommentAdding"
                               :disabled="isCommentAdding || !text"
                               dark
                               block
                               color="green darken-4"
                               @click="addComment">
                            Add comment
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                </span>
                            </template>
                        </v-btn>
                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-card>
    </v-hover>
</template>

<script>
    import dataService from '../services/data-service';
    import { TEST_USER_EMAil, TIMEOUT_DELAY } from '../constants';
    export default {
        name: 'Card',
        props: {
            post: Object
        },
        computed: {
            isNoOnceOpened() {
                return !this.isCommentsShowed && !this.comments.length
            },
            width() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return '100%'
                    case 'sm': return '100%'
                    case 'md': return '450px'
                    case 'lg': return '300px'
                    case 'xl': return '300px'
                    default: return '100%'
                }
            }
        },
        data: () => ({
            comments: [],
            isCommentsShowed: false,
            isLoadingInProgress: false,
            isCommentAdding: false,
            text: ''
        }),
        methods: {
            async openComments() {
                if (this.isNoOnceOpened) {
                    this.isLoadingInProgress = true;
                    const { data } = await dataService.getComments(this.post.id);
                    this.comments = data;
                    this.isLoadingInProgress = false;
                }
                this.isCommentsShowed = !this.isCommentsShowed;
            },
            addComment() {
                this.isCommentAdding = true;
                setTimeout(() => { // emulation of waiting BE request
                    this.comments.push({
                        email: TEST_USER_EMAil,
                        body: this.text
                    });
                    this.isCommentAdding = false;
                    this.text = '';
                }, TIMEOUT_DELAY);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>