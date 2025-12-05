<template>
  <component :is="icons[nameIndex] || icons.default" />
</template>

<script lang="ts" setup>
const icons = {
  "menu.experiences": defineComponent({
    template: `
      <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 7h18" />
              <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
              <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
              <path d="M8 13h8" />
            </svg>
    `,
  }),

  "menu.technologies": defineComponent({
    template: `
      <svg viewBox="0 0 24 24" ...>
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    `,
  }),

  "menu.openSource": defineComponent({
    template: `
      <svg viewBox="0 0 24 24" ...>
        <path d="M16 18a4 4 0 0 0-8 0"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    `,
  }),

  "menu.contact": defineComponent({
    template: `
      <svg viewBox="0 0 24 24" ...>
        <path d="M4 4h16v16H4z"/>
        <path d="M22 6l-10 7L2 6"/>
      </svg>
    `,
  }),

  default: defineComponent({
    template: `
      <svg viewBox="0 0 24 24" ...>
        <path d="M4 4h16v16H4z"/>
        <path d="M8 8h8v8H8z"/>
      </svg>
    `,
  }),
};

const props = defineProps<{
  name: string;
}>();

const nameIndex = computed<keyof typeof icons>(() => {
  return props.name as unknown as keyof typeof icons;
});
</script>
