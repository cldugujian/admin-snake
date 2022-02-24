<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        mounted() {
            // 屏幕适配
            window._rootSize();
        },
    }
</script>