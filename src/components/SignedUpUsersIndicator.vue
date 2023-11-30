<script setup lang="ts">
import type { SignedupUsers } from '@/types/SignedupUsers';
import { computed } from 'vue';

const props = defineProps<{
    signedUpUsers: SignedupUsers
}>()

const numberMembers = computed(() => props.signedUpUsers.members.length)
const numberHelpers = computed(() => props.signedUpUsers.helpers.length)

const sufficientMembers = numberMembers.value >= 1;
const sufficientUsers = numberMembers.value + numberHelpers.value >= 4;

let tagText = '';
if (!sufficientMembers) {
    tagText = 'Not enough members'
} else if (!sufficientUsers) {
    tagText = 'Not enough users'
}
</script>

<template>
    <div class="">
        <span>
            {{ numberMembers }} 🔑
        </span>
        <span>
            {{ numberHelpers }} 💁
        </span>
        <span class="tag is-rounded is-light"
            :class="{ 'is-hidden': sufficientUsers, 'is-danger': !sufficientMembers, 'is-warning': !sufficientUsers }">
            {{ tagText }}
        </span>
    </div>
</template>