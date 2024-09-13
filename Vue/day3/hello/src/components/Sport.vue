<template>
    <div>
        <router-link to="/sport/football/2">男足</router-link>
        <router-link to="/sport/nba?name=james">NBA</router-link>
        <br>
        男足
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped></style>