<template>
    <div class="page-error">
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'error',
    computed: {
        message() {
            return this.$route.params.error || 'The path you are trying to access does not exit';
        }
    },
    created() {
        let query = this.$route.query;
        if (Object.keys(query).length !== 0) {
            this.$router.replace({
                name: 'error',
                params: query
            });
        }
    }
};
</script>
