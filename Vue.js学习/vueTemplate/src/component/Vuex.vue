<template>
    <div>
        <h1>{{count}}</h1>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <br/><br/>
        <button @click="increment10">+10</button>
        <button @click="decrement10">-10</button>
        <br/><br/>
        <button @click="asyncIncrement">异步+</button>
        <button @click="asyncDecrement">异步-</button>
        <br/><br/>
        <button @click="test">测试</button>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex';

    export default {
        computed: mapState(['count']),
        methods: {
            increment10 () {
                this.$store.commit('increment', {
                    amount: 10
                });
            },
            decrement10 () {
                this.$store.commit({
                    type: 'decrement',
                    amount: 10
                });
            },
            test () {
                this.$store.state.count = 1000;
            },
            ...mapMutations(['increment', 'decrement']),
            ...mapActions(['asyncIncrement', 'asyncDecrement'])
        }
    }

</script>

<style>
</style>