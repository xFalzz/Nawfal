<template>
  <div class="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white shadow-xl">
    <div class="flex items-center justify-between border-b border-neutral-800 pb-2">
      <span class="font-bold uppercase tracking-wider text-neutral-200">terminal-code-window</span>
      <span class="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400 font-semibold">VERIFIED</span>
    </div>
    <p class="text-neutral-400 text-[11px] leading-relaxed">
      Nawfal UI Kit Enterprise Component (TerminalCodeWindow) with strict monochromatic styling and responsive layout.
    </p>
    <div class="flex justify-end gap-2 pt-2 border-t border-neutral-900">
      <button @click="handleClick" class="rounded bg-white text-black px-3 py-1 text-[10px] font-bold hover:bg-neutral-200 transition-colors">
        Interactive Action
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isActive = ref(true);
function handleClick() {
  isActive.value = !isActive.value;
}
</script>
