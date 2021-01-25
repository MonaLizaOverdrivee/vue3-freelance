<template>
  <span :class="['badge', status.classColor]" v-text="status.text"></span>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["type"],
  setup(props) {
    const status = computed(() => {
      const badgeType = {};
      switch (props.type) {
        case "done":
          badgeType.classColor = "primary";
          badgeType.text = "Завершен";
          break;
        case "cancelled":
          badgeType.classColor = "danger";
          badgeType.text = "Отменен";
          break;
        case "active":
          badgeType.classColor = "primary";
          badgeType.text = "Активен";
          break;
        case "pending":
          badgeType.classColor = "warning";
          badgeType.text = "Выполняется";
          break;
        default:
          break;
      }
      return badgeType;
    });
    return {
      status
    };
  }
};
</script>
