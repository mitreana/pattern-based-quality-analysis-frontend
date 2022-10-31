<template>
    <el-button :default-active="currentRouteName"
             class="el-menu-demo"
             mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#33CCFF"
             index="/menu" 
             @click="navigateTo('/menu')">Menu</el-menu-item>
    </el-button>
</template>

<script>
</script>

<style>
    #router {
        text-align: center;
        margin-right: 40px;
    }
</style>
