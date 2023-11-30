<script setup lang="ts">
import type { SignedupUsers } from '@/types/SignedupUsers';
import { computed } from 'vue';
import { useUsersStore } from '@/stores/UserStore';

const userStore = useUsersStore();

const props = defineProps<{
    signedUpUsers: SignedupUsers
}>()

const numberMembers = computed(() => props.signedUpUsers.members.length)
const numberHelpers = computed(() => props.signedUpUsers.helpers.length)

const sufficientMembers = computed(() => numberMembers.value >= 1)
const sufficientUsers = computed(() => numberMembers.value + numberHelpers.value >= 4)

const tagText = computed(() => {
    if (!sufficientMembers.value) {
        return 'No member present'
    } else if (!sufficientUsers.value) {
        return 'Not enough users present'
    } else {
        return ''
    }
})

const userNames = computed(() => userStore.users
    .filter(user => [...props.signedUpUsers.members, ...props.signedUpUsers.helpers].includes(user.id))
    .map(user => user.user_name)
    .join(', ')
)
</script>

<template>
    <div class="m-2">
        <span class="has-tooltipl-multiline has-tooltip-arrow" :data-tooltip="userNames.length > 0 ? userNames : null">
            {{ numberMembers }} 🔑 {{ numberHelpers }} 💁
        </span>
        <span class="tag is-rounded is-light"
            :class="{ 'is-hidden': sufficientUsers, 'is-danger': !sufficientMembers, 'is-warning': !sufficientUsers }">
            {{ tagText }}
        </span>
    </div>
</template>