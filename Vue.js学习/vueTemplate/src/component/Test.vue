<template>
    <div class="test">
        <span>Test GG {{a}}</span>
        <test v-if="Math.random() < 0.8"></test>
    </div>
</template>

<script>

    var data = {
        a: 5, b: 2
    };

    export default {
        name: 'test',
        data () {
            return {
                a: 3,
                ...data
            };
        }
    }
</script>

<style>

</style>