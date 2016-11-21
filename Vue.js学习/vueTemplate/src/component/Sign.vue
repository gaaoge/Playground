<template>
    <div id="sign">
        <h3>I am a 签名. </h3>
        <p>written by {{ author }}</p>
        <p class="red" :class="{green: false}">Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reversedMessage }}"</p>
        <h1 v-if="true">Yes</h1>
        <ul>
            <li v-for="item in items">{{ item.message }}</li>
        </ul>
        <ul>
            <li v-for="n in 3">{{ n }}</li>
        </ul>
        <button v-on:click="addItem">添加</button>
        <button v-on:click="removeItem">删除</button>
        <button v-on:click="replaceItem">替换</button>
        <br /><br />
        <input type="checkbox" id="jack" value="jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br /><br />
        <span>Checked names: {{ checkedNames }}</span>
        <br /><br />
        <input v-model.lazy="message" placeholder="edit me">
        <p>Message is: {{ message }}</p>
    </div>
</template>

<script type="text/javascript">
    import Vue from 'vue'

    export default {
        data () {
            return {
                author: "GG",
                message: 'Hello',
                items: [
                    {message: 'Foo'},
                    {message: 'Bar'}
                ],
                checkedNames: []
            }
        },
        computed: {
            reversedMessage () {
                return this.message.split('').reverse().join('')
            }
        },
        methods: {
            addItem: function () {
                this.items.push({message: 'Test'});
            },
            removeItem: function () {
                this.items.pop();
            },
            replaceItem: function () {
                this.items[0].message = 'Replaced';
                // Vue.set(this.items, 0, {message: 'Replaced'});
            }
        }
    }
</script>

<style>
    .red {
        color: red;
    }

    .green {
        color: green;
    }

    .blue {
        color: blue;
    }

    ul, li {
        list-style: circle;
    }

    button {
        border: 1px solid #2e2e2e;
        border-radius: 5px;
        outline: none;
    }
    input {
        border: 1px solid #888888;
        border-radius: 3px;
    }
</style>
