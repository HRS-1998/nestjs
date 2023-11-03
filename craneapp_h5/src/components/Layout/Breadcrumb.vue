<template>
        <a-breadcrumb >
            <a-breadcrumb-item></a-breadcrumb-item>
          </a-breadcrumb>
</template>
<script setup lang="ts">

import { usebreadcrumbTitle } from '@/store/modules/breadcrumbtabs';
const store=usebreadcrumbTitle()
</script>

<style scoped>

</style>